#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker CLI not found. Install Docker Desktop (Windows/macOS) or Docker Engine (Linux)."
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  cat <<'MSG'
Docker daemon is not reachable.

If you see an error like:
  open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified

On Windows, usually Docker Desktop is not running or Linux containers are not enabled.
Steps:
  1) Start Docker Desktop and wait until it shows "Engine running".
  2) In Docker Desktop settings, use Linux containers (not Windows containers).
  3) Re-run: docker info
  4) Then run: docker compose up -d
MSG
  exit 1
fi

echo "Docker daemon is reachable."
