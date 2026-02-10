#!/usr/bin/env bash
set -euo pipefail

required_files=(
  ".gitignore"
  "README.md"
  "backend/.env.example"
  "backend/eslint.config.js"
  "backend/package.json"
  "backend/src/db/pool.js"
  "backend/src/db/schema.js"
  "backend/src/routes/leadRoutes.js"
  "backend/src/server.js"
  "docker-compose.yml"
  "frontend/index.html"
  "frontend/package.json"
  "frontend/src/App.jsx"
  "frontend/src/main.jsx"
  "frontend/src/styles.css"
  "frontend/vite.config.js"
  "infra/init.sql"
)

missing=0
for file in "${required_files[@]}"; do
  if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    echo "MISSING (not tracked): $file"
    missing=1
  fi
done

if [[ "$missing" -eq 1 ]]; then
  echo "One or more required files are not tracked by git."
  exit 1
fi

echo "All required project files are tracked in git."
