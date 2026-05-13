const fallbackRounds = [
  {
    question: "为什么 AI 写得越像人，越容易让人不信任？",
    hook: "这题适合开场：它正好解释为什么要训练自己的废话雷达。",
    answers: [
      {
        kind: "human",
        lure: "信任机制",
        text: "AI 文本的问题不是不像人，而是太急着像一个“标准答案的人”。真实的人会犹豫、会暴露偏见、会留下没想透的地方。AI 一旦把所有边角都磨平，读者反而会觉得它没有来处。",
        reveal: "它解释的是信任来源：真实表达往往有边界和来处，而不是只有流畅。",
      },
      {
        kind: "ai",
        lure: "技术伦理",
        text: "这反映了人工智能时代信任范式的迁移。当生成式模型不断逼近人类表达，用户会在真实性感知与算法透明度之间产生认知张力。",
        reveal: "概念完整，但没有落到读者为什么会“不信任”的具体体验。",
      },
      {
        kind: "bluff",
        lure: "宏大词",
        text: "AI 越像人，人类越恐惧，是因为我们在机器身上看见了自身主体性的黄昏。这不是技术问题，而是文明镜像的坍塌。",
        reveal: "词很大，但把具体信任问题直接抬成文明危机，解释失焦。",
      },
    ],
  },
];

const htmlTagPattern = /<[^>]+>/g;

function json(response, status = 200) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
}

function cleanText(value, fallback = "") {
  return String(value ?? fallback)
    .replace(htmlTagPattern, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function getPath(source, path) {
  return String(path)
    .split(".")
    .reduce((value, key) => (value == null ? undefined : value[key]), source);
}

function textValue(value, fallback = "") {
  if (typeof value === "string" || typeof value === "number") return cleanText(value, fallback);
  if (Array.isArray(value)) {
    for (const item of value) {
      const text = textValue(item);
      if (text) return text;
    }
  }
  if (value && typeof value === "object") {
    for (const key of ["text", "plain_text", "plainText", "content", "excerpt", "summary", "title", "name", "value", "html"]) {
      const text = textValue(value[key]);
      if (text) return text;
    }
  }
  return fallback;
}

function firstText(source, keys, fallback = "") {
  for (const key of keys) {
    const value = getPath(source, key);
    const text = textValue(value);
    if (text) return text;
  }
  return fallback;
}

function parseNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = textValue(value).replace(/,/g, "");
  const match = text.match(/(\d+(?:\.\d+)?)\s*([万亿kK]?)/);
  if (!match) return 0;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return 0;
  if (match[2] === "亿") return base * 100000000;
  if (match[2] === "万") return base * 10000;
  if (match[2].toLowerCase() === "k") return base * 1000;
  return base;
}

function numberFrom(source, keys) {
  for (const key of keys) {
    const value = parseNumber(getPath(source, key));
    if (value) return value;
  }
  return 0;
}

function compactNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return "";
  if (number >= 10000) return `${(number / 10000).toFixed(number >= 100000 ? 0 : 1)} 万`;
  return String(Math.round(number));
}

function pickList(payload) {
  if (Array.isArray(payload)) return payload;
  const listFrom = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.items)) return value.items;
    if (Array.isArray(value?.list)) return value.list;
    if (Array.isArray(value?.records)) return value.records;
    return null;
  };
  const candidates = [
    payload?.questions,
    payload?.data?.questions,
    payload?.data?.items,
    payload?.data?.list,
    payload?.data?.records,
    payload?.data?.hot_list,
    payload?.data?.result?.items,
    payload?.data?.result?.list,
    payload?.data,
    payload?.items,
    payload?.hot,
    payload?.hot_list,
    payload?.list,
    payload?.records,
    payload?.result?.questions,
    payload?.result?.items,
    payload?.result?.list,
    payload?.result,
  ];
  return candidates.map(listFrom).find(Boolean) || [];
}

function pickAnswers(item) {
  const candidates = [
    item.answers,
    item.top_answers,
    item.topAnswers,
    item.answer_list,
    item.answerList,
    item?.question?.answers,
    item?.target?.answers,
    item?.target?.question?.answers,
    item?.answers?.data,
    item?.answers?.items,
  ];
  const list = candidates.find(Array.isArray) || [];
  return [...list].sort(
    (a, b) =>
      numberFrom(b, ["voteup_count", "upvote_count", "like_count", "likes", "vote_count"]) -
      numberFrom(a, ["voteup_count", "upvote_count", "like_count", "likes", "vote_count"])
  );
}

function questionId(item) {
  return (
    item.question_id ||
    item.questionId ||
    item.id ||
    item?.question?.id ||
    item?.question?.question_id ||
    item?.target?.question_id ||
    item?.target?.id ||
    item?.target?.question?.id ||
    item?.target?.question?.question_id
  );
}

function questionTitle(item) {
  return firstText(
    item,
    [
      "title",
      "question",
      "name",
      "title_area.text",
      "titleArea.text",
      "target.title",
      "target.question.title",
      "target.title_area.text",
      "target.question.title_area.text",
      "question.title",
    ],
    firstText(item?.question || item?.target || item?.target?.question, ["title", "question", "name", "title_area.text"])
  );
}

function hotStats(item) {
  const source = item?.target?.question || item?.question || item?.target || item;
  const heat = numberFrom(item, ["heat", "hot_score", "hotScore", "score", "rank_score", "trend", "metrics_area.text"]);
  const followers = numberFrom(source, ["follower_count", "followers", "follow_count", "metrics.followers"]);
  const answers = numberFrom(source, ["answer_count", "answers_count", "answerCount", "metrics.answers"]);
  const comments = numberFrom(source, ["comment_count", "comments_count", "commentCount", "metrics.comments"]);
  return [
    heat && `热度 ${compactNumber(heat)}`,
    answers && `回答 ${compactNumber(answers)}`,
    followers && `关注 ${compactNumber(followers)}`,
    comments && `评论 ${compactNumber(comments)}`,
  ].filter(Boolean);
}

function answerText(answer) {
  if (typeof answer === "string") return cleanText(answer);
  return firstText(answer, [
    "content",
    "content.text",
    "excerpt",
    "excerpt.text",
    "text",
    "summary",
    "answer",
    "body",
    "target.content",
    "target.content.text",
    "target.excerpt",
  ]);
}

function normalizeProvidedAnswer(answer, fallbackKind, title) {
  const text = answerText(answer);
  if (!text) return null;
  const rawKind = answer.kind || answer.type || fallbackKind;
  const kind = ["human", "ai", "bluff"].includes(rawKind) ? rawKind : fallbackKind;
  const votes = numberFrom(answer, ["voteup_count", "upvote_count", "like_count", "likes", "vote_count", "target.voteup_count"]);
  return {
    kind,
    lure: answer.lure || answer.label || (kind === "human" ? "高赞痕迹" : "可疑话术"),
    text: text.slice(0, 220),
    reveal:
      answer.reveal ||
      (kind === "human"
        ? `这段来自高赞素材的表达痕迹${votes ? `，赞同数约 ${votes}` : ""}：它有具体判断，不只是在堆概念。`
        : `这段围绕「${title}」制造了顺滑感，但需要继续追问证据和场景。`),
  };
}

function syntheticAiAnswer(title) {
  return {
    kind: "ai",
    lure: "三层结构",
    text: `「${title}」要分三层看：表层是个体选择，中层是结构变化，底层是时代情绪。当三者发生耦合，就会形成一种集体性的认知偏移。`,
    reveal: "这段结构很稳，但过于万能，换一个问题也几乎能套上。",
  };
}

function syntheticBluffAnswer(title) {
  return {
    kind: "bluff",
    lure: "宏大词",
    text: `真正理解「${title}」的人，会发现这已经不是一个普通问题，而是文明转向的信号。所有具体争论，都只是冰山露出水面的 3%。`,
    reveal: "它直接跳到文明转向，没有证据，属于气势型纯吹。",
  };
}

function buildRound(item) {
  const title = questionTitle(item) || "一个值得讨论的问题";
  const stats = hotStats(item);
  const rawAnswers = pickAnswers(item);
  const normalizedAnswers = rawAnswers
    .map((answer, index) => normalizeProvidedAnswer(answer, index === 0 ? "human" : "ai", title))
    .filter(Boolean);

  const hasTypedAnswers = normalizedAnswers.some((answer) =>
    ["human", "ai", "bluff"].includes(answer.kind)
  );

  const humanAnswer =
    normalizedAnswers.find((answer) => answer.kind === "human") ||
    normalizedAnswers[0] || {
      kind: "human",
      lure: "高赞痕迹",
      text: `讨论「${title}」时，最重要的是先把问题落回具体处境：谁承担成本，谁获得好处，谁拥有选择权。`,
      reveal: "它把问题落到了具体利益和处境里，比单纯升华更像真实高赞回答。",
    };

  const answers = hasTypedAnswers
    ? [
        humanAnswer,
        normalizedAnswers.find((answer) => answer.kind === "ai") || syntheticAiAnswer(title),
        normalizedAnswers.find((answer) => answer.kind === "bluff") || syntheticBluffAnswer(title),
      ]
    : [humanAnswer, syntheticAiAnswer(title), syntheticBluffAnswer(title)];

  return {
    question: title,
    hook:
      [
        firstText(item, ["hook", "excerpt", "description"], ""),
        stats.length ? `案卷统计：${stats.join(" · ")}。` : "",
        "这一题混入了热榜问题和高赞表达痕迹，别被漂亮结构带跑。",
      ]
        .filter(Boolean)
        .join(" "),
    answers,
  };
}

async function fetchJson(url, token) {
  const authHeader = process.env.ZHIHU_API_AUTH_HEADER || "Authorization";
  const authPrefix = process.env.ZHIHU_API_AUTH_PREFIX ?? "Bearer";
  const headers = { Accept: "application/json" };
  if (token) {
    headers[authHeader] = authPrefix ? `${authPrefix} ${token}` : token;
  }
  const upstream = await fetch(url, { headers });
  if (!upstream.ok) throw new Error(`Upstream ${upstream.status}`);
  return upstream.json();
}

async function enrichWithAnswers(apiBase, token, item) {
  const answersPath = process.env.ZHIHU_ANSWERS_PATH;
  const id = questionId(item);
  if (!answersPath || !id || pickAnswers(item).length) return item;
  const url = `${apiBase}${answersPath.replace("{question_id}", encodeURIComponent(id))}`;
  try {
    const payload = await fetchJson(url, token);
    return { ...item, answers: pickList(payload) };
  } catch {
    return item;
  }
}

async function normalizeZhihuPayload(payload, apiBase, token) {
  const items = pickList(payload).slice(0, 5);
  if (!items.length) return fallbackRounds;
  const enriched = await Promise.all(items.map((item) => enrichWithAnswers(apiBase, token, item)));
  return enriched.map(buildRound);
}

module.exports = async function handler(request, response) {
  json(response);

  const apiBase = process.env.ZHIHU_API_BASE?.replace(/\/$/, "");
  const apiToken = process.env.ZHIHU_API_TOKEN || "";
  const hotPath = process.env.ZHIHU_HOT_PATH || "/hot";

  if (!apiBase) {
    response.end(JSON.stringify({ source: "fallback", rounds: fallbackRounds }));
    return;
  }

  try {
    const payload = await fetchJson(`${apiBase}${hotPath}`, apiToken);
    const rounds = await normalizeZhihuPayload(payload, apiBase, apiToken);
    response.end(JSON.stringify({ source: "zhihu-api", rounds }));
  } catch (error) {
    response.end(
      JSON.stringify({
        source: "fallback",
        warning: error.message,
        rounds: fallbackRounds,
      })
    );
  }
};
