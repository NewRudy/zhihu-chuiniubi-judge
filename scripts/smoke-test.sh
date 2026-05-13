#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

node --check script.js
node --check api/challenges.js
python3 - <<'PY'
import json
json.load(open("data/hot-rounds.json"))
PY

node - <<'NODE'
const handler = require("./api/challenges.js");
const chunks = [];
const res = {
  setHeader() {},
  end(body) {
    chunks.push(body);
  },
};
Promise.resolve(handler({}, res)).then(() => {
  const payload = JSON.parse(chunks.join(""));
  if (!payload.rounds || payload.rounds.length < 1) {
    throw new Error("No fallback rounds returned");
  }
});
NODE

python3 scripts/build-dist.py >/dev/null
python3 - <<'PY'
from html.parser import HTMLParser
HTMLParser().feed(open("dist/index.html").read())
PY

PORT="${PORT:-5180}"
python3 -m http.server "$PORT" >/tmp/zhihu-chuiniubi-smoke-http.log 2>&1 &
PID=$!
trap 'kill "$PID" >/dev/null 2>&1 || true' EXIT
sleep 1

curl -fsS "http://127.0.0.1:$PORT/" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/?route=stock" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/?ask=%E6%88%91%E6%83%B3%E8%BE%9E%E8%81%8C%E5%BC%80%E5%92%96%E5%95%A1%E5%BA%97" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/data/hot-rounds.json" >/dev/null

if node -e "require('playwright')" >/dev/null 2>&1; then
  APP_URL="http://127.0.0.1:$PORT" node scripts/browser-ux-check.js
elif [ -d "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright" ]; then
  APP_URL="http://127.0.0.1:$PORT" \
    NODE_PATH="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules" \
    "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" \
    scripts/browser-ux-check.js
fi

bash scripts/package-submission.sh >/dev/null
test -s dist/zhihu-chuiniubi-submission.zip

echo "smoke ok"
