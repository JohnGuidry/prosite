# /term/ — Web Terminal (ttyd)

The `/term/` path on john-guidry.com serves a **ttyd** web terminal — a browser-based shell session proxied through nginx. Unlike the rest of the site, this is a **live service**, not static files. There is no source code to commit; the page is rendered by the ttyd binary at runtime.

## Architecture

```
Browser → Cloudflare Tunnel → Nginx:80 → /term/   → ttyd HTTP  (127.0.0.1:7682)
                                  /term/ws → ttyd WS    (127.0.0.1:7683)
```

## ttyd Setup (on the Pi)

Install ttyd:

```bash
sudo apt install ttyd
```

Run ttyd as a systemd service. Create `/etc/systemd/system/ttyd.service`:

```ini
[Unit]
Description=ttyd web terminal
After=network.target

[Service]
ExecStart=/usr/bin/ttyd --port 7682 --writable bash
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

> **Security:** ttyd grants shell access to anyone who can reach it. Cloudflare Access (or an auth prompt) should protect `/term/` before enabling it on a public-facing tunnel. Consider running ttyd with a restricted user and read-only mode (`--read-only`) unless interactive input is required.

Enable:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ttyd
```

## Nginx Configuration

The following location blocks are in `/etc/nginx/sites-available/prosite`:

```nginx
# ttyd WebSocket endpoint
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

# ttyd HTTP page
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
# Check ttyd is running
sudo systemctl status ttyd

# Test locally on the Pi
curl -s http://127.0.0.1:7682/ | head -5

# Test through nginx
curl -s http://localhost/term/ | head -5
```