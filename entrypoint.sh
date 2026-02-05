#!/usr/bin/env sh
set -eu

# Ensure pb_data is writable (Dokploy volumes may be owned by root)
mkdir -p /pb/pb_data
chown -R pb:pb /pb/pb_data || true

# Drop privileges
exec su-exec pb "$@"
