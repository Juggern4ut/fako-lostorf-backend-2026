#!/usr/bin/env bash
set -euo pipefail

TARGET="linux_amd64"

if [[ -f "./pocketbase" ]]; then
  echo "pocketbase already exists at ./pocketbase"
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required" >&2
  exit 1
fi
if ! command -v unzip >/dev/null 2>&1; then
  echo "unzip is required" >&2
  exit 1
fi

echo "Fetching latest PocketBase release metadata..."
API_JSON=$(curl -fsSL https://api.github.com/repos/pocketbase/pocketbase/releases/latest)

TAG=$(echo "$API_JSON" | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)
if [[ -z "$TAG" ]]; then
  echo "Could not determine latest tag" >&2
  exit 1
fi

ASSET="pocketbase_${TAG#v}_${TARGET}.zip"
URL="https://github.com/pocketbase/pocketbase/releases/download/${TAG}/${ASSET}"

echo "Downloading ${URL}"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

curl -fL "$URL" -o "$TMP_DIR/pb.zip"
unzip -q "$TMP_DIR/pb.zip" -d "$TMP_DIR"

if [[ ! -f "$TMP_DIR/pocketbase" ]]; then
  echo "PocketBase binary not found in zip" >&2
  exit 1
fi

mv "$TMP_DIR/pocketbase" ./pocketbase
chmod +x ./pocketbase

echo "Done. Run: ./pocketbase serve --http 127.0.0.1:8090"