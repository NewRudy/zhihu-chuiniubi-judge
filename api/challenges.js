const fallbackRounds = [
  {
    question: "为什么 AI 写得越像人，越容易让人不信任？",
    hook: "这题适合路演：它正好解释我们为什么要做鉴定游戏。",
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

function json(response, status = 200) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
}

function normalizeZhihuPayload(payload) {
  if (!payload || !Array.isArray(payload.questions)) return fallbackRounds;
  return payload.questions.slice(0, 5).map((item) => ({
    question: item.title || item.question || "一个值得讨论的问题",
    hook: item.excerpt || item.hook || "来自知乎 API 的实时问题，已转成鉴定局挑战。",
    answers: item.answers || fallbackRounds[0].answers,
  }));
}

module.exports = async function handler(request, response) {
  json(response);

  const apiBase = process.env.ZHIHU_API_BASE;
  const apiToken = process.env.ZHIHU_API_TOKEN;

  if (!apiBase || !apiToken) {
    response.end(JSON.stringify({ source: "fallback", rounds: fallbackRounds }));
    return;
  }

  try {
    const upstream = await fetch(`${apiBase.replace(/\/$/, "")}/hot`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
      },
    });
    if (!upstream.ok) throw new Error(`Upstream ${upstream.status}`);
    const payload = await upstream.json();
    response.end(JSON.stringify({ source: "zhihu-api", rounds: normalizeZhihuPayload(payload) }));
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
