#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GH="$ROOT/tools/gh_2.92.0_macOS_arm64/bin/gh"
REPO_NAME="zhihu-chuiniubi-judge"

if [[ ! -x "$GH" ]]; then
  echo "GitHub CLI not found at $GH"
  exit 1
fi

cd "$ROOT"

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not logged in. Run:"
  echo "  $GH auth login"
  exit 2
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  "$GH" repo create "NewRudy/$REPO_NAME" --public --source . --remote origin --push
else
  git push -u origin main
fi

"$GH" api "repos/NewRudy/$REPO_NAME/pages" \
  --method POST \
  -f source.branch=main \
  -f source.path=/ \
  >/dev/null || true

echo "Repository: https://github.com/NewRudy/$REPO_NAME"
echo "Pages URL:  https://newrudy.github.io/$REPO_NAME/"
