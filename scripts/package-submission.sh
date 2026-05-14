#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

python3 scripts/build-dist.py >/dev/null

OUT="dist/zhihu-chuiniubi-submission.zip"
rm -f "$OUT"

zip -q -r "$OUT" \
  index.html styles.css script.js favicon.svg data \
  api vercel.json \
  dist/index.html \
  README.md SUBMISSION.md FINAL_CHECKLIST.md ROADMAP.md API_NOTES.md API_INTEGRATION.md PROGRESS.md PUBLISH.md PITCH.md JUDGING.md \
  scripts/build-dist.py scripts/publish-github.sh scripts/publish-with-token.sh scripts/publish-from-clipboard.sh \
  scripts/smoke-test.sh scripts/browser-ux-check.js

echo "$OUT"
