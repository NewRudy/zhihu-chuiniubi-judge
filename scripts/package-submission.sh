#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

python3 scripts/build-dist.py >/dev/null

OUT="dist/zhihu-chuiniubi-judge-submission.zip"
rm -f "$OUT"

zip -q -r "$OUT" \
  index.html styles.css script.js favicon.svg data \
  dist/index.html \
  README.md SUBMISSION.md ROADMAP.md API_NOTES.md PROGRESS.md PUBLISH.md PITCH.md JUDGING.md \
  scripts/build-dist.py scripts/publish-github.sh

echo "$OUT"
