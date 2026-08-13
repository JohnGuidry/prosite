# /term/ — Web Terminal (pyterm)

The `/term/` path on john-guidry.com serves a **pyterm** web terminal — a self-contained Python server that inlines xterm.js + a WebSocket PTY bridge. Unlike the rest of the site, this is a **live service**, not static files. The source lives at `/usr/local/bin/pyterm.py` on the Pi (not in this repo).

## Architecture

```
Browser → Cloudflare Tunnel (HTTPS, Access-protected) → Nginx:80
  /term/   → pyterm HTTP  (127.0.0.1:7682)  — serves inlined xterm.js HTML
  /term/ws → pyterm WS    (127.0.0.1:7683)  — PTY<->WebSocket bridge
```

pyterm runs as `shelluser` via systemd. Each WebSocket connection forks a PTY running `shelluser`'s login shell (`bash -l`). The HTTP server inlines xterm.js, xterm.css, and the Fit addon directly into the HTML response (no external asset requests).

## pyterm Setup (on the Pi)

The server binary and its assets live in `/usr/local/bin/`:

```
/usr/local/bin/pyterm.py      # main server
/usr/local/bin/xterm.js       # xterm.js library (inlined at runtime)
/usr/local/bin/xterm.css      # xterm.js styles (inlined at runtime)
/usr/local/bin/addon-fit.js   # xterm Fit addon (inlined at runtime)
```

systemd service at `/etc/systemd/system/pyterm.service`:

```ini
[Unit]
Description=pyterm web terminal (localhost only)
After=network.target

[Service]
User=shelluser
ExecStart=/usr/bin/python3 /usr/local/bin/pyterm.py
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
```

> **Security:** pyterm grants shell access to `shelluser` on the Pi. Cloudflare Access protects `/term/` on the public-facing tunnel. The HTTP and WS servers bind to `127.0.0.1` only — they are not reachable externally except through nginx.

Enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now pyterm
```

## Clipboard Handling

pyterm's inlined JavaScript handles copy/paste with two key fixes for xterm.js quirks:

### Paste — Ctrl+Shift+V

xterm.js registers its `handlePasteEvent` on **both** `this.textarea` and `this.element` (the `.xterm` div). When a paste event fires on the textarea, it bubbles to `.xterm`, and the handler runs **twice** — pasting text twice (the "testtest" bug).

**Fix:** A bubble-phase `paste` listener on xterm's hidden textarea calls `stopPropagation()` after xterm's own textarea handler fires, preventing the event from reaching the duplicate handler on `.xterm`.

### Copy — Right-click or Ctrl+Insert

xterm.js's selection APIs (`hasSelection()`, `getSelection()`, `_selectionService`) return empty when mouse tracking is active (e.g. `hermes --tui`, `vim`, `tmux` enable mouse mode, which causes xterm to disable its `SelectionService`). Copy uses `window.getSelection()` instead, which captures the browser-level text selection that xterm's `onLinuxMouseSelection` puts into the hidden textarea.

- **Plain shell:** Drag-select text, right-click → browser's native Copy menu.
- **Inside hermes --tui / mouse-tracking apps:** Hold **Shift** while drag-selecting (forces xterm to bypass mouse tracking), then **Ctrl+Insert** to copy. The selection highlight may not render visually — this is an xterm.js canvas rendering limitation when mouse tracking is active, but the text IS selected and copies correctly.
- **Ctrl+C:** Always sends SIGINT to the shell. Never used for copy (too easy to accidentally kill a process when a selection exists).
- **Ctrl+Shift+C:** Not intercepted — opens browser devtools in most browsers.

Right-click does **not** call `preventDefault()` — the browser's native context menu must appear for its Copy menu item to work.

## Nginx Configuration

The following location blocks are in `/etc/nginx/sites-available/prosite`:

```nginx
# pyterm WebSocket endpoint
location /term/ws {
    proxy_pass http://127.0.0.1:7683;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    proxy_read_timeout 1d;
    proxy_buffering off;
    proxy_request_buffering off;
    proxy_cache off;
    add_header X-Accel-Buffering no;
}

# pyterm HTTP page
location /term/ {
    proxy_pass http://127.0.0.1:7682/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Redirect bare /term to /term/
location /term {
    return 301 $scheme://$host$request_uri/;
}
```

The WebSocket upgrade requires the `map` directive in the `http` block (typically in `/etc/nginx/nginx.conf`):

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

## Verification

```bash
# Check pyterm is running
sudo systemctl status pyterm

# Test locally on the Pi
curl -s http://127.0.0.1:7682/ | head -5

# Test through nginx
curl -s http://localhost/term/ | head -5
```

## Updating pyterm

```bash
# Back up the current version
sudo cp /usr/local/bin/pyterm.py /usr/local/bin/pyterm.py.bak

# Deploy updated version
sudo cp /path/to/pyterm.py /usr/local/bin/pyterm.py
sudo systemctl restart pyterm

# Verify
systemctl is-active pyterm
curl -s http://127.0.0.1:7682/ | grep -c "Terminal"
```

> **Note:** Restarting pyterm kills all active terminal sessions. Warn anyone using `/term/` before restarting.

## Security Hardening

- **WebSocket origin checking:** The `serve()` call passes `origins=ALLOWED_ORIGINS` (john-guidry.com + localhost) to prevent Cross-Site WebSocket Hijacking (CSWSH). A malicious site can't open a WS connection to send shell commands.
- **Connection limit:** Max 5 concurrent WebSocket connections (`MAX_CONNECTIONS`). Each connection forks a PTY + bash — the limit prevents PTY/memory exhaustion.
- **Security headers:** HTTP responses include `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a `Content-Security-Policy` restricting script/style to inline and connections to same-origin WS.
- **Resize validation:** Terminal resize messages bound cols to 1–500 and rows to 1–200, preventing malformed PTY ioctl calls.
- **`/ws` path removed from nginx:** The WebSocket is only accessible at `/term/ws`, not the redundant `/ws` path.
- **shelluser isolation:** `shelluser` has no sudo, no crontab, single group. Service runs as `shelluser`. Both HTTP (7682) and WS (7683) bind to `127.0.0.1` only — not reachable externally except through nginx + Cloudflare Access.
