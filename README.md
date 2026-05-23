# John Guidry | Professional Portfolio

A modern, high-impact professional portfolio and "living resume" designed to showcase the transition from Senior Database Engineering to AI Agent Development.

Live at **[john-guidry.com](https://john-guidry.com)**

## Features

- **Hero section** with name, role, tagline, and supporting blurb — clear hierarchy for fast scanning
- **Interactive Timeline** — vertical journey through professional milestones at KinderSystems, SECU, and PCG with entrance animations
- **Project Showcase** — grid of projects sorted by most recent activity, with colored language indicator dots and equal-height cards
- **Sticky navigation bar** — glassmorphism fixed top bar with section links and socials
- **Scroll-triggered entrance animations** — sections and items fade in as you scroll (respects `prefers-reduced-motion`)
- **OG meta tags** — rich link previews on social media, messaging apps, and chat
- **Security hardening** — rate-limited API (/api/auth: 5 req/min per IP), security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), scanner path blocking

## Tech Stack

- **Frontend:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Vanilla CSS (CSS variables, Flexbox/Grid, CSS Grid)
- **Infrastructure:** Self-hosted on a Raspberry Pi (Pi-hole)
- **Web Server:** Nginx (reverse proxy)
- **Tunnel:** Cloudflare Tunnel (cloudflared) — outbound-only, no open router ports
- **DNS + Ad Blocking:** Pi-hole FTL

## Architecture

```
Internet → Cloudflare Edge → QUIC Tunnel → cloudflared → Nginx:80 → FTL:8081 (/admin, /api)
                                                               → Static SPA files (everything else)
```

- Cloudflare terminates TLS and proxies through an encrypted tunnel — no router ports open
- Nginx serves the static SPA build and reverse-proxies `/admin/` and `/api/` to Pi-hole FTL
- Pi-hole FTL provides DNS-level ad blocking across the LAN

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The site is deployed via rsync to the Pi:

```bash
# Build + deploy
npm run deploy

# Skip build, just sync existing dist/
npm run redeploy
```

Requires SSH key access to `pi@pi-hole.local` (192.168.1.48).

## Infrastructure Maintenance

- **Temperature monitoring** — CPU temp displayed in Pi-hole admin sidebar (auto-restored after FTL updates via systemd drop-in)
- **Pi-hole updates** — `sudo pihole -up` updates FTL; temperature patch is reapplied automatically on service restart
- **Security headers and rate limiting** — configured in `/etc/nginx/sites-available/prosite` on the Pi
- **Scanner blocking** — WordPress probe paths return 404

Updated: 2026-05-22

## License

MIT © John Guidry
