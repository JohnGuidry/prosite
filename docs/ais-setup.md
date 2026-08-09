# /ais/ — Live AIS Ship Tracker

The `/ais/` path on john-guidry.com serves a real-time vessel tracker. An RTL-SDR dongle captures AIS radio signals, decodes them into NMEA sentences, and a lightweight Python API serves vessel positions to a Leaflet.js map in the browser.

## Architecture

```
RTL-SDR dongle (162 MHz)
  → rtl_ais (binary, decodes AIS → NMEA sentences)
    → ais_udp_listener.py (UDP 10110 → ais_capture.log)
      → ais_api.py (HTTP :8080, serves /api/vessels as JSON)
        → public/ais/index.html (Leaflet map, polls /ais/api/vessels every 5s)
          ← Nginx proxies /ais/ → static file, /ais/api/ → :8080
```

## Components

### 1. rtl_ais (SDR → NMEA decoder)

Built from [dgiardini/rtl-ais](https://github.com/dgiardini/rtl-ais). Tunes the AIS frequencies (161.975 / 162.025 MHz) and outputs NMEA `!AIVDM` sentences over UDP to port 10110.

```bash
rtl_ais -n -p <ppm> -h 127.0.0.1 -P 10110
```

PPM calibration is per-dongle — measure with `rtl_test -p` (not `kal -s GSM`, since US 2G is decommissioned).

### 2. ais_udp_listener.py (UDP → log)

Listens on UDP port 10110, writes each NMEA sentence with a timestamp to `~/ais_capture.log`:

```
2026-08-09T00:15:42 !AIVDM,1,1,,A,15N4cJ@P00JrSJHDrJP1rLJ004S3,0*3F
```

### 3. ais_api.py (log → JSON API)

Lightweight HTTP server on port 8080. Tails `ais_capture.log`, decodes AIS messages (types 1/2/3 = position, 5 = static data, 24 = name/type), and serves them as JSON at `/api/vessels`:

```json
{
  "timestamp": "2026-08-09T00:15:42Z",
  "count": 12,
  "vessels": [
    {
      "mmsi": 367012345,
      "name": "VESSEL NAME",
      "lat": 48.12345,
      "lon": -122.67890,
      "speed": 12.3,
      "course": 45.0,
      "heading": 47,
      "nav_status": "Under way",
      "ship_type": "Cargo",
      "dest": "SEATTLE"
    }
  ]
}
```

### 4. public/ais/index.html (frontend)

Standalone vanilla HTML/JS page using [Leaflet.js](https://leafletjs.com/) with a dark CARTO basemap. Features:
- Live vessel markers with heading arrows, colored by MMSI
- Position trail lines that fade over 5 minutes
- Vessel sidebar panel with click-to-pan
- Mobile-responsive panel collapse
- Stale vessel filtering (30 min timeout)
- Polls `/ais/api/vessels` every 5 seconds

This file lives in `public/ais/index.html` and is copied verbatim to `dist/ais/index.html` by Vite's build.

## Nginx Configuration

Add these location blocks to `/etc/nginx/sites-available/prosite` (before the `location /` catch-all):

```nginx
# AIS API (Python server on :8080)
location /ais/api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# AIS static map page
location /ais/ {
    alias /var/www/prosite/dist/ais/;
    try_files $uri $uri/ /ais/index.html;
}

# Redirect bare /ais to /ais/
location = /ais {
    return 301 $scheme://$host/ais/;
}
```

After editing:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Deployment

The AIS map page deploys with the main site via `npm run deploy` (rsync copies `dist/` including `dist/ais/`). The API and SDR pipeline run on a separate host from the Pi.

### Services on the SDR host

The rtl-ais capture pipeline runs as systemd services. See the upstream repo and `DEPLOY_PI.md` in the rtl-ais source for build, calibration, and service configuration details.

## CORS

`ais_api.py` sets `Access-Control-Allow-Origin: *` on `/api/vessels` responses, so the map page can be served from any origin.