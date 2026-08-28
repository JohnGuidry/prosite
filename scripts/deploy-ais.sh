#!/usr/bin/env bash
# Deploy site to Pi-hole, injecting the CARTO API key from .carto-key (gitignored).
# The committed source uses a __CARTO_KEY__ placeholder; this script replaces it
# in the built dist/ files before rsyncing, so the key never enters git history.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
KEY_FILE="$REPO_DIR/.carto-key"
PLACEHOLDER="__CARTO_KEY__"

if [[ ! -f "$KEY_FILE" ]]; then
  echo "ERROR: $KEY_FILE not found. Create it with your CARTO basemaps API key." >&2
  exit 1
fi

CARTO_KEY="$(tr -d '[:space:]' < "$KEY_FILE")"

if [[ -z "$CARTO_KEY" ]]; then
  echo "ERROR: $KEY_FILE is empty." >&2
  exit 1
fi

echo "==> Building site..."
cd "$REPO_DIR"
npm run build

echo "==> Injecting CARTO key into dist/ais/*.html..."
for f in dist/ais/index.html dist/ais/heatmap.html; do
  if [[ -f "$f" ]]; then
    sed -i "s/${PLACEHOLDER}/${CARTO_KEY}/g" "$f"
    echo "  patched $f"
  fi
done

echo "==> Deploying to Pi-hole..."
rsync -avz --delete dist/ pi@pi-hole.local:/var/www/prosite/dist/

echo "==> Done."