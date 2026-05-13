#!/usr/bin/env bash
set -euo pipefail

if ! command -v pbpaste >/dev/null 2>&1; then
  echo "pbpaste is not available on this system. Use GH_TOKEN=... bash scripts/publish-with-token.sh instead."
  exit 2
fi

TOKEN="$(pbpaste | tr -d '[:space:]')"

if [[ -z "$TOKEN" ]]; then
  echo "Clipboard is empty. Copy a temporary GitHub token with repo + workflow scopes first."
  exit 2
fi

if [[ ! "$TOKEN" =~ ^(ghp_|github_pat_) ]]; then
  echo "Clipboard does not look like a GitHub token. Refusing to use it."
  exit 2
fi

GH_TOKEN="$TOKEN" bash "$(dirname "$0")/publish-with-token.sh"
