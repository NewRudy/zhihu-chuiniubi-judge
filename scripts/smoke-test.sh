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

node - <<'NODE'
const http = require("http");
const handler = require("./api/challenges.js");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.url === "/hot") {
    res.end(JSON.stringify({
      data: {
        result: {
          items: [
            {
              metrics_area: { text: "热度 9.8 万" },
              target: {
                question: {
                  id: 123,
                  title_area: { text: "年轻人为什么开始反感万能建议？" },
                  answer_count: "1.2 万",
                  follower_count: "3 万",
                },
              },
            },
          ],
        },
      },
    }));
    return;
  }
  if (req.url === "/questions/123/answers") {
    res.end(JSON.stringify({
      data: {
        items: [
          {
            content: { text: "<p>真正的问题不是建议太多，而是很多建议默认了同一种人生模板。</p>" },
            voteup_count: "1.5 万",
          },
        ],
      },
    }));
    return;
  }
  res.statusCode = 404;
  res.end("{}");
});

server.listen(0, "127.0.0.1", async () => {
  const { port } = server.address();
  process.env.ZHIHU_API_BASE = `http://127.0.0.1:${port}`;
  process.env.ZHIHU_HOT_PATH = "/hot";
  process.env.ZHIHU_ANSWERS_PATH = "/questions/{question_id}/answers";
  const chunks = [];
  const res = {
    setHeader() {},
    end(body) {
      chunks.push(body);
    },
  };
  await handler({}, res);
  server.close();
  const payload = JSON.parse(chunks.join(""));
  const round = payload.rounds && payload.rounds[0];
  if (payload.source !== "zhihu-api") throw new Error("mock API did not use zhihu-api source");
  if (!round || round.question !== "年轻人为什么开始反感万能建议？") {
    throw new Error(`mock API question was not normalized: ${round && round.question}`);
  }
  if (!round.hook.includes("热度 9.8 万") || !round.hook.includes("回答 1.2 万")) {
    throw new Error(`mock API stats were not normalized: ${round.hook}`);
  }
  if (!round.answers[0].text.includes("人生模板")) {
    throw new Error("mock API answer content was not normalized");
  }
});
NODE

python3 scripts/build-dist.py >/dev/null
python3 - <<'PY'
from html.parser import HTMLParser
HTMLParser().feed(open("dist/index.html").read())
PY

PORT="${PORT:-5180}"
python3 -m http.server "$PORT" >/tmp/zhihu-judge-smoke-http.log 2>&1 &
PID=$!
trap 'kill "$PID" >/dev/null 2>&1 || true' EXIT
sleep 1

curl -fsS "http://127.0.0.1:$PORT/" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/?mode=pitch" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/?result=1" >/dev/null
curl -fsS "http://127.0.0.1:$PORT/dist/?topic=AI%E5%86%99%E4%BD%9C" >/dev/null
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
test -s dist/zhihu-chuiniubi-judge-submission.zip

echo "smoke ok"
