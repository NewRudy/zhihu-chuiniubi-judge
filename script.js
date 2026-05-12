const LABELS = [
  { key: "human", name: "社区高赞风格", short: "高赞" },
  { key: "ai", name: "AI 仿深刻", short: "AI" },
  { key: "bluff", name: "纯吹牛逼", short: "纯吹" },
];

const BASE_ROUNDS = [
  {
    question: "为什么很多人越努力，反而越焦虑？",
    hook: "这题最容易把人骗进“结构性分析”的坑里。",
    answers: [
      {
        kind: "human",
        lure: "结构分析",
        text: "努力本身不会制造焦虑，失控感才会。一个人如果能清楚地知道努力和反馈之间的关系，即使辛苦，也会觉得自己在推进。真正让人崩溃的是：你每天都很用力，但不知道这个用力会不会被系统承认。",
        reveal: "这段有清晰因果：把“努力”拆成“努力-反馈-失控感”，没有急着升华。",
      },
      {
        kind: "ai",
        lure: "三层结构",
        text: "这个问题要分三层看：表层是时间管理，中层是资源错配，底层是时代不确定性。当个体努力无法穿透系统噪声，焦虑就成为现代性对人的一种精神征税。",
        reveal: "词很满，框架很顺，但每层都没有证据落点，是典型“仿深刻”。",
      },
      {
        kind: "bluff",
        lure: "宏大词",
        text: "努力的人焦虑，是因为他们已经觉醒了宇宙的熵增规律。人在对抗热寂，工作在对抗虚无，所以越努力越接近真相，越接近真相越痛苦。",
        reveal: "把物理词硬接人生，听起来大，实际没有解释任何事。",
      },
    ],
  },
  {
    question: "年轻人为什么越来越不爱发朋友圈了？",
    hook: "别急着讲代际，先看它是不是在偷换概念。",
    answers: [
      {
        kind: "ai",
        lure: "代际叙事",
        text: "朋友圈的衰落，本质上是熟人社会的公共舞台被算法时代的私域表达替代。年轻人不是不表达，而是把表达迁移到了更低风险、更可控的场域。",
        reveal: "判断方向像真的，但全是概念堆叠，没有说明“低风险场域”到底是什么。",
      },
      {
        kind: "human",
        lure: "生活观察",
        text: "因为朋友圈不是一个发布工具，而是一个关系现场。你发一张照片，看到的是生活；同事看到的是你没加班；亲戚看到的是你乱花钱；前任看到的是你过得怎么样。它太挤了。",
        reveal: "这段抓住了朋友圈的真实压力：同一条内容被不同关系同时解读。",
      },
      {
        kind: "bluff",
        lure: "反常识",
        text: "真正不发朋友圈的人，往往是精神资产最丰厚的人。因为他们已经不需要外部点赞给自己的存在背书，这是一种高维自洽。",
        reveal: "把普通行为包装成优越感，典型“反常识式自嗨”。",
      },
    ],
  },
  {
    question: "为什么很多人明明很累，却还是停不下来刷短视频？",
    hook: "这局看谁能分清解释和责备。",
    answers: [
      {
        kind: "bluff",
        lure: "道德批判",
        text: "刷短视频是现代人的精神降级。当一个人开始沉迷 15 秒刺激，就说明他的长期主义肌肉已经萎缩，人生正在被廉价快乐接管。",
        reveal: "它只是把用户骂了一遍，没有解释疲惫状态下为什么会选择短刺激。",
      },
      {
        kind: "human",
        lure: "行为机制",
        text: "累的时候人并不想快乐，人想要的是不用负责。短视频的诱惑在于，它不要求你做选择，不要求你社交，也不要求你证明自己有用。你只要躺着，它会替你把下一秒填满。",
        reveal: "抓住了“低责任感”和“自动续杯”的行为机制，解释比评价更强。",
      },
      {
        kind: "ai",
        lure: "神经科学",
        text: "从神经科学看，短视频通过即时反馈重塑多巴胺回路，使用户在疲劳状态下形成被动奖赏依赖。这不是懒惰，而是注意力资本主义的结果。",
        reveal: "方向没错，但没有具体证据和场景，属于 AI 常见的术语正确。",
      },
    ],
  },
  {
    question: "为什么现在很多人不愿意参加同学聚会？",
    hook: "这题一不小心就会写成中年鸡汤。",
    answers: [
      {
        kind: "human",
        lure: "关系边界",
        text: "不是大家突然冷漠了，而是同学关系很特殊：它保留了过去的亲密，却不包含现在的责任。很多聚会尴尬，是因为大家还在用 18 岁的称呼，互相打听 35 岁的人生。",
        reveal: "这段把尴尬的来源说清楚了：旧关系模板匹配不了新生活差异。",
      },
      {
        kind: "bluff",
        lure: "人生哲理",
        text: "不参加同学聚会的人，已经完成了从关系消费到自我内观的跃迁。真正成熟的人不需要回到过去确认自己赢没赢。",
        reveal: "把“不去聚会”拔高成成熟，爽但虚。",
      },
      {
        kind: "ai",
        lure: "社会比较",
        text: "同学聚会的退潮反映了社会比较机制的重构。个体在高流动社会中更倾向于规避身份暴露，以维护心理账户的稳定性。",
        reveal: "几个概念像论文摘要，但缺少能让人代入的具体关系场景。",
      },
    ],
  },
  {
    question: "AI 会不会让普通人更难找到工作？",
    hook: "最会骗人的回答，往往听起来最“平衡”。",
    answers: [
      {
        kind: "ai",
        lure: "平衡话术",
        text: "AI 不会替代人，而会替代不会使用 AI 的人。未来竞争的关键不再是单点技能，而是人机协同能力、跨域整合能力和持续学习能力的综合体现。",
        reveal: "正确但太安全，像发布会金句。它回避了普通人如何被具体岗位挤压。",
      },
      {
        kind: "bluff",
        lure: "未来学",
        text: "普通人找不到工作不是因为 AI，而是因为人类文明进入了后劳动时代。工作将变成少数人的表演，多数人的存在本身就是价值。",
        reveal: "宏大到失重，既没有路径，也没有现实约束。",
      },
      {
        kind: "human",
        lure: "岗位拆解",
        text: "问题不是 AI 会不会抢工作，而是它先抢哪一段工作。很多岗位不是整个消失，而是把初级环节压薄：整理资料、写初稿、做表格、出方案。新人最缺的正是这些练手机会。",
        reveal: "把“失业”拆到岗位环节，指出新人训练路径被压缩，这是可讨论的洞察。",
      },
    ],
  },
];

let rounds = [...BASE_ROUNDS];
let current = 0;
let guesses = {};
let revealed = false;
let correct = 0;
let totalAnswered = 0;
let lures = {};
let challengeUrl = location.href.split("?")[0];

const $ = (selector) => document.querySelector(selector);
const answerGrid = $("#answerGrid");
const introPanel = $("#introPanel");
const gamePanel = $("#gamePanel");
const resultPanel = $("#resultPanel");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

async function loadHotRounds() {
  $("#apiStatus").textContent = "正在读取热榜挑战题库...";
  try {
    const response = await fetch("./api/challenges", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const hotRounds = payload.rounds || [];
    $("#apiStatus").textContent =
      payload.source === "zhihu-api"
        ? "已连接知乎 API，正在使用实时热榜挑战题库。"
        : "已加载热榜实验题库。官方 API 文档到位后，这里会切换成实时知乎热榜。";
    return [...hotRounds, ...BASE_ROUNDS].slice(0, 5);
  } catch {
    try {
      const response = await fetch("./data/hot-rounds.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const hotRounds = await response.json();
      $("#apiStatus").textContent =
        "热榜代理暂不可用，已自动降级到本地题库，路演不会断。";
      return [...hotRounds, ...BASE_ROUNDS].slice(0, 5);
    } catch {
      $("#apiStatus").textContent =
        "热榜接口暂不可用，已自动降级到基础题库，路演不会断。";
      return BASE_ROUNDS;
    }
  }
}

async function startGame(mode = "shuffle") {
  challengeUrl = location.href.split("?")[0];
  if (mode === "hot") {
    rounds = await loadHotRounds();
  } else {
    rounds = mode === "demo" ? [...BASE_ROUNDS] : shuffle(BASE_ROUNDS);
    $("#apiStatus").textContent = "当前使用本地挑战题库，官方 API 文档到位后切换到实时热榜。";
  }
  current = 0;
  guesses = {};
  revealed = false;
  correct = 0;
  totalAnswered = 0;
  lures = {};
  introPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  renderRound();
}

function resetScore() {
  current = 0;
  correct = 0;
  totalAnswered = 0;
  lures = {};
  guesses = {};
  revealed = false;
}

function renderRound() {
  const round = rounds[current];
  guesses = {};
  revealed = false;
  $("#roundLabel").textContent = `第 ${current + 1} 局`;
  $("#progressBar").style.width = `${(current / rounds.length) * 100}%`;
  $("#questionText").textContent = round.question;
  $("#questionHook").textContent = round.hook;
  $("#roundHint").textContent = "给三段回答分别盖章，全部完成后揭晓。";
  $("#revealBtn").disabled = true;
  $("#revealBtn").textContent = "揭晓鉴定";
  $("#scorePill").textContent = `${correct} / ${totalAnswered}`;

  answerGrid.innerHTML = "";
  shuffle(round.answers).forEach((answer, index) => {
    const card = document.createElement("article");
    card.className = "answer-card";
    card.dataset.kind = answer.kind;
    card.dataset.lure = answer.lure;
    card.innerHTML = `
      <div class="answer-body">
        <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
        <p>${answer.text}</p>
      </div>
      <div class="stamp-row">
        ${LABELS.map(
          (label) =>
            `<button class="stamp-button" data-label="${label.key}" type="button">${label.name}</button>`
        ).join("")}
      </div>
    `;
    card.querySelectorAll(".stamp-button").forEach((button) => {
      button.addEventListener("click", () => selectLabel(card, button.dataset.label));
    });
    answerGrid.appendChild(card);
  });
}

function selectLabel(card, label) {
  if (revealed) return;
  const cards = [...answerGrid.querySelectorAll(".answer-card")];
  const index = cards.indexOf(card);
  guesses[index] = label;
  card.querySelectorAll(".stamp-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.label === label);
  });
  $("#revealBtn").disabled = Object.keys(guesses).length !== 3;
}

function revealRound() {
  if (revealed) {
    if (current < rounds.length - 1) {
      current += 1;
      renderRound();
    } else {
      renderResult();
    }
    return;
  }

  revealed = true;
  let roundCorrect = 0;
  const cards = [...answerGrid.querySelectorAll(".answer-card")];
  cards.forEach((card, index) => {
    const actual = card.dataset.kind;
    const guessed = guesses[index];
    const answer = rounds[current].answers.find(
      (item) => item.kind === actual && item.text === card.querySelector(".answer-body p").textContent
    );
    totalAnswered += 1;
    if (actual === guessed) {
      correct += 1;
      roundCorrect += 1;
      card.classList.add("correct");
    } else {
      card.classList.add("wrong");
      const lure = card.dataset.lure;
      lures[lure] = (lures[lure] || 0) + 1;
    }

    const reveal = document.createElement("div");
    reveal.className = "reveal";
    reveal.innerHTML = `
      <strong>真身：${LABELS.find((label) => label.key === actual).name}</strong>
      <p>${answer.reveal}</p>
    `;
    card.appendChild(reveal);
    card.querySelectorAll(".stamp-button").forEach((button) => {
      button.disabled = true;
    });
  });

  $("#roundHint").textContent = `本局识破 ${roundCorrect}/3。${
    roundCorrect === 3 ? "有点东西，继续。" : "刚才那一下很像真的，对吧？"
  }`;
  $("#revealBtn").textContent = current < rounds.length - 1 ? "下一局" : "查看人格卡";
  $("#scorePill").textContent = `${correct} / ${totalAnswered}`;
}

function getPersona(index) {
  if (index >= 86) {
    return {
      title: "冷面鉴定官",
      copy: "你对“底层逻辑”“长期主义”“系统性变量”都有抗体。别人刚开始升华，你已经在找证据在哪。",
    };
  }
  if (index >= 66) {
    return {
      title: "半信半疑型聪明人",
      copy: "你能识别大部分废话，但偶尔会被漂亮结构带走。尤其是三段论一出现，你的大脑会自动给它加滤镜。",
    };
  }
  if (index >= 46) {
    return {
      title: "高赞受害者",
      copy: "只要一段话开头说“这个问题要分三层看”，你就已经准备点赞。别慌，这也是中文互联网老毛病。",
    };
  }
  return {
    title: "底层逻辑易感人群",
    copy: "你不是好骗，你只是太尊重排版整齐的废话。建议看到宏大词先深呼吸三秒。",
  };
}

function renderResult() {
  gamePanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  $("#progressBar").style.width = "100%";
  const index = Math.round((correct / (rounds.length * 3)) * 100);
  const persona = getPersona(index);
  const weakness = Object.entries(lures).sort((a, b) => b[1] - a[1])[0]?.[0] || "漂亮结构";
  const text = `我在「知乎吹牛逼鉴定局」拿到 ${index} 分，身份是「${persona.title}」。我最容易被「${weakness}」骗，你来试试能不能分清高赞、AI 和纯吹：`;

  $("#resultTitle").textContent = persona.title;
  $("#resultCopy").textContent = persona.copy;
  $("#finalScore").textContent = index;
  $("#finalCorrect").textContent = `${correct}/${rounds.length * 3}`;
  $("#finalWeakness").textContent = weakness;
  $("#shareText").textContent = text;
  $("#scorePill").textContent = `${correct} / ${rounds.length * 3}`;
  renderCreatorInsight(index, persona.title, weakness);
  drawShareCard(index, persona.title, weakness, correct);
}

function renderCreatorInsight(index, title, weakness) {
  const insightMap = {
    三层结构: {
      angle: "你的创作机会不是继续堆框架，而是把每一层都落到一个可验证的生活场景。",
      opening: "这个问题不能只说“分三层看”。真正关键的是：哪一层正在具体改变普通人的选择？",
      hook: "你最受不了哪种“看起来很有结构、其实没说人话”的回答？",
    },
    宏大词: {
      angle: "把大词往下拽，拽到一个具体的人、一个具体损失、一个具体选择，内容就会站住。",
      opening: "我不太想把这个问题直接上升到时代。先看一个更小的细节：它到底让谁多付了成本？",
      hook: "你见过哪些一句话很燃、仔细想等于没说的表达？",
    },
    平衡话术: {
      angle: "评委和读者都听腻了安全正确，真正有传播力的是指出被平衡话术遮住的代价。",
      opening: "“不会替代人，只会替代不会用工具的人”这句话太顺了，顺到它掩盖了一个更现实的问题。",
      hook: "你觉得最像正确废话的一句 AI 时代金句是什么？",
    },
    技术伦理: {
      angle: "不要只讲伦理，要讲用户在什么瞬间开始不信任、为什么不信任、怎么重新建立信任。",
      opening: "AI 让人不安的地方，往往不是它犯错，而是它把错误说得太完整。",
      hook: "你什么时候会突然意识到：这段话八成是 AI 写的？",
    },
  };
  const fallback = {
    angle: `你的「${title}」结果可以反向变成选题：拆掉「${weakness}」这种话术，教读者识别真洞察和假深刻。`,
    opening: `判断一段回答有没有价值，不是看它用了多少高级词，而是看它有没有解释一个真实处境。`,
    hook: "你最容易被哪种一本正经的表达骗到？",
  };
  const insight = insightMap[weakness] || fallback;
  $("#creatorTitle").textContent = index >= 66 ? "你可以写一篇反吹牛逼指南" : "你可以写一篇自救型选题";
  $("#creatorAngle").textContent = insight.angle;
  $("#creatorOpening").textContent = insight.opening;
  $("#creatorHook").textContent = insight.hook;
}

function drawShareCard(index, title, weakness, correctCount) {
  const canvas = $("#shareCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f6f0e3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#191815";
  ctx.fillRect(70, 70, 1060, 1460);
  ctx.fillStyle = "#c8ff3d";
  ctx.fillRect(110, 110, 980, 210);
  ctx.fillStyle = "#191815";
  ctx.font = "900 58px sans-serif";
  ctx.fillText("知乎吹牛逼鉴定局", 150, 205);
  ctx.font = "800 34px sans-serif";
  ctx.fillText("你能分清高赞、AI、纯吹吗？", 150, 265);

  ctx.fillStyle = "#fffaf0";
  ctx.font = "900 86px sans-serif";
  wrapText(ctx, title, 130, 470, 940, 94);

  ctx.fillStyle = "#55d9ff";
  ctx.fillRect(130, 710, 420, 260);
  ctx.fillStyle = "#ff674d";
  ctx.fillRect(650, 710, 420, 260);
  ctx.fillStyle = "#191815";
  ctx.font = "900 132px sans-serif";
  ctx.fillText(String(index), 175, 875);
  ctx.font = "900 34px sans-serif";
  ctx.fillText("抗吹牛逼指数", 178, 930);
  ctx.font = "900 60px sans-serif";
  ctx.fillText(`${correctCount}/15`, 700, 850);
  ctx.font = "900 34px sans-serif";
  ctx.fillText("识破回答", 704, 930);

  ctx.fillStyle = "#fffaf0";
  ctx.font = "800 44px sans-serif";
  ctx.fillText("最容易中招", 130, 1120);
  ctx.fillStyle = "#ffcc48";
  ctx.font = "900 76px sans-serif";
  wrapText(ctx, weakness, 130, 1215, 920, 82);
  ctx.fillStyle = "#fffaf0";
  ctx.font = "700 28px sans-serif";
  wrapText(ctx, "截图发给朋友：看他是不是也会被一本正经的废话骗。", 130, 1410, 920, 42);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  let top = y;
  [...text].forEach((char) => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, top);
      line = char;
      top += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, top);
}

function createChallenge(topic) {
  const clean = topic.trim().replace(/\s+/g, " ");
  if (!clean) return;
  const customRound = {
    question: clean,
    hook: "这是你刚生成的朋友挑战局，看看谁最容易被“很懂”骗。",
    answers: [
      {
        kind: "human",
        lure: "具体场景",
        text: `讨论「${clean}」时，最重要的是先把问题落回具体场景。很多争论不是观点不同，而是大家默认的处境不同：谁承担成本，谁得到好处，谁拥有选择权。`,
        reveal: "有场景、有变量、有可讨论的分歧点，像一段可继续展开的回答。",
      },
      {
        kind: "ai",
        lure: "三层结构",
        text: `「${clean}」要分三层看：表层是个体选择，中层是社会结构，底层是时代情绪。当三者发生耦合，就会形成一种集体性的认知偏移。`,
        reveal: "框架完整但过于万能，换任何题也能套。",
      },
      {
        kind: "bluff",
        lure: "宏大词",
        text: `真正理解「${clean}」的人，会发现这已经不是一个问题，而是文明转向的信号。所有具体争论，都只是冰山露出水面的 3%。`,
        reveal: "直接跳到文明转向，没有证据，属于气势型纯吹。",
      },
    ],
  };
  rounds = [customRound, ...BASE_ROUNDS.slice(0, 4)];
  resetScore();
  challengeUrl = `${location.href.split("?")[0]}?topic=${encodeURIComponent(clean)}`;
  introPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  renderRound();
  $("#creatorOutput").textContent = "已生成挑战局，第一题就是你的话题。链接里带题目，可丢给朋友。";
  $("#challengeLink").href = challengeUrl;
  $("#challengeLink").classList.remove("hidden");
  $("#challengeLink").textContent = "打开这条挑战链接";
}

function pitchMode() {
  rounds = [
    {
      question: "评委现场盲测：这三段里，哪段最像真洞察？",
      hook: "路演专用局：先让评委参与，再解释产品价值。",
      answers: [
        {
          kind: "human",
          lure: "产品洞察",
          text: "这个产品好玩的地方不是让 AI 写得更像人，而是让用户亲手发现：一段话看起来很聪明，和它真的有洞察，中间隔着证据、场景和可反驳性。",
          reveal: "它直接说明产品判断标准：证据、场景、可反驳性。"
        },
        {
          kind: "ai",
          lure: "赛道话术",
          text: "本项目通过游戏化机制重构知识社区内容消费链路，以互动鉴别驱动用户心智升级，并形成从娱乐传播到创作者生产力的闭环。",
          reveal: "路演味很浓，但每个词都偏抽象，是 AI 式项目包装。"
        },
        {
          kind: "bluff",
          lure: "宏大叙事",
          text: "我们不是在做一个网页，而是在重新定义 AI 时代人类对真理的最后防线。每一次点击，都是文明对幻觉的反击。",
          reveal: "很好笑，也很热血，但除了气势没有解释产品。"
        }
      ]
    },
    ...BASE_ROUNDS.slice(0, 4)
  ];
  resetScore();
  introPanel.classList.add("hidden");
  resultPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  $("#apiStatus").textContent = "评委演示模式已开启：第一局用于路演互动破冰。";
  renderRound();
}

$("#startBtn").addEventListener("click", () => startGame("shuffle"));
$("#hotBtn").addEventListener("click", () => startGame("hot"));
$("#demoBtn").addEventListener("click", () => startGame("demo"));
$("#pitchBtn").addEventListener("click", pitchMode);
$("#revealBtn").addEventListener("click", revealRound);
$("#restartBtn").addEventListener("click", () => startGame("shuffle"));
$("#copyBtn").addEventListener("click", async () => {
  const share = `${$("#shareText").textContent} ${challengeUrl}`;
  try {
    await navigator.clipboard.writeText(share);
    $("#copyBtn").textContent = "已复制";
    setTimeout(() => {
      $("#copyBtn").textContent = "复制挑战文案";
    }, 1400);
  } catch {
    $("#shareText").textContent = share;
  }
});
$("#creatorForm").addEventListener("submit", (event) => {
  event.preventDefault();
  createChallenge($("#topicInput").value);
});

const sharedTopic = new URLSearchParams(location.search).get("topic");
if (sharedTopic) {
  $("#topicInput").value = sharedTopic;
  createChallenge(sharedTopic);
}
