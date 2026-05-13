const { chromium } = require("playwright");

const BASE_URL = process.env.APP_URL || "http://127.0.0.1:4173";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function expectVisible(page, text, label = text) {
  await page.getByText(text, { exact: false }).waitFor({ state: "visible", timeout: 5000 });
  return label;
}

async function chooseOneStampPerCard(page) {
  const cards = page.locator(".answer-card");
  const cardCount = await cards.count();
  assert(cardCount === 3, `expected 3 answer cards, got ${cardCount}`);
  for (let index = 0; index < cardCount; index += 1) {
    await cards.nth(index).locator(".stamp-button").nth(index % 3).click();
  }
}

async function checkNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth - root.clientWidth;
  });
  assert(overflow <= 2, `${label} has horizontal overflow: ${overflow}px`);
}

async function run() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      logs.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));

  await page.goto(BASE_URL);
  await expectVisible(page, "你能分清高赞、AI、纯吹吗？", "home headline");
  await checkNoHorizontalOverflow(page, "desktop home");

  await page.getByRole("button", { name: "开始鉴定" }).click();
  await expectVisible(page, "本局热议问题", "game question");
  assert(await page.getByRole("button", { name: "揭晓鉴定" }).isDisabled(), "reveal should start disabled");
  await chooseOneStampPerCard(page);
  assert(!(await page.getByRole("button", { name: "揭晓鉴定" }).isDisabled()), "reveal should enable after 3 stamps");
  await page.getByRole("button", { name: "揭晓鉴定" }).click();
  const revealCount = await page.locator(".reveal").count();
  assert(revealCount === 3, `expected 3 reveal explanations, got ${revealCount}`);
  await expectVisible(page, "本局识破", "round feedback");
  await page.getByRole("button", { name: "下一局" }).click();
  await expectVisible(page, "第 2 局", "next round");

  await page.goto(BASE_URL);
  await page.getByRole("button", { name: "打开今日案卷" }).click();
  await expectVisible(page, "本局热议问题", "hot mode");
  const hotStatus = await page.locator("#apiStatus").innerText();
  assert(hotStatus.includes("热榜") || hotStatus.includes("接口"), `unexpected hot status: ${hotStatus}`);

  await page.goto(BASE_URL);
  await page.getByRole("button", { name: "现场盲测" }).click();
  await expectVisible(page, "这三段里，哪段最像真洞察", "pitch mode");

  await page.goto(`${BASE_URL}/?result=1`);
  await expectVisible(page, "鉴定完成", "result hero");
  await expectVisible(page, "创作者灵感转化", "creator insight");
  await expectVisible(page, "把结果甩给朋友", "share panel");
  const canvasBox = await page.locator("#shareCanvas").boundingBox();
  assert(canvasBox && canvasBox.width > 250 && canvasBox.height > 300, "share canvas should be visible");
  await page.getByRole("button", { name: "复制挑战文案" }).click();
  await expectVisible(page, "已复制", "copy feedback");

  await page.goto(BASE_URL);
  const topic = "年轻人为什么讨厌装懂式建议？";
  await page.getByLabel("丢一个话题，现场伪造三段“很懂”的回答").fill(topic);
  await page.getByRole("button", { name: "生成挑战局" }).click();
  const customQuestion = await page.locator("#questionText").innerText();
  assert(customQuestion === topic, `custom challenge question mismatch: ${customQuestion}`);
  await expectVisible(page, "已生成挑战局", "custom challenge feedback");
  const href = await page.locator("#challengeLink").getAttribute("href");
  assert(href && href.includes(encodeURIComponent(topic)), "challenge link should carry topic");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL);
  await checkNoHorizontalOverflow(page, "mobile home");
  await page.getByRole("button", { name: "开始鉴定" }).click();
  await checkNoHorizontalOverflow(page, "mobile game");
  await chooseOneStampPerCard(page);
  await page.getByRole("button", { name: "揭晓鉴定" }).click();
  await expectVisible(page, "本局识破", "mobile reveal feedback");

  await browser.close();
  const seriousLogs = logs.filter((line) => !line.includes("favicon"));
  assert(seriousLogs.length === 0, `browser console issues:\n${seriousLogs.join("\n")}`);
  console.log("browser ux ok");
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
