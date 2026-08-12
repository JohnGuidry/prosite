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

pyterm's inlined JavaScript handles copy/paste without relying solely on the async Clipboard API (which can fail silently under Cloudflare Access):

- **Copy (Ctrl+C / right-click):** Tries `navigator.clipboard.writeText()`, falls back to `document.execCommand('copy')` with a temporary textarea. A `copy` event listener also catches native browser copy so any selection lands in the OS clipboard.
- **Paste (Ctrl+V / right-click):** Reads from `navigator.clipboard.readText()` and calls `term.paste()` exactly once. A `_pasting` guard intercepts the native `paste` event on xterm's hidden textarea to prevent double-paste (which previously caused text to appear twice).
- **Right-click:** Copies the current selection (if any), otherwise pastes from clipboard.

All clipboard handlers are registered outside the `ws.onopen` callback so they work before the WebSocket connects.

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
