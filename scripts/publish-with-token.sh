#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_OWNER="${REPO_OWNER:-NewRudy}"
REPO_NAME="${REPO_NAME:-zhihu-chuiniubi-judge}"
REPO_FULL="$REPO_OWNER/$REPO_NAME"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "GH_TOKEN is required. Create a temporary GitHub token with repo + workflow scopes."
  exit 2
fi

cd "$ROOT"

api() {
  curl -fsS \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GH_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$@"
}

if ! api "https://api.github.com/repos/$REPO_FULL" >/dev/null 2>&1; then
  api -X POST "https://api.github.com/user/repos" \
    -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"description\":\"知乎吹牛逼鉴定局 Hackathon demo\",\"has_issues\":true,\"has_projects\":false,\"has_wiki\":false}" \
    >/dev/null
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "https://github.com/$REPO_FULL.git"
else
  git remote add origin "https://github.com/$REPO_FULL.git"
fi

git -c "http.https://github.com/.extraheader=Authorization: Bearer $GH_TOKEN" \
  push -u origin main

api -X POST "https://api.github.com/repos/$REPO_FULL/pages" \
  -d '{"source":{"branch":"main","path":"/"}}' \
  >/dev/null 2>&1 || true

echo "Repository: https://github.com/$REPO_FULL"
echo "Pages URL:  https://$REPO_OWNER.github.io/$REPO_NAME/"
