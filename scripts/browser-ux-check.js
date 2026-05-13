const { chromium } = require("playwright");

const BASE_URL = process.env.APP_URL || "http://127.0.0.1:4173";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function expectVisible(page, text, label = text) {
  await page.getByText(text, { exact: false }).first().waitFor({ state: "visible", timeout: 5000 });
  return label;
}

async function checkNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(overflow <= 2, `${label} has horizontal overflow: ${overflow}px`);
}

async function answerCurrentRoute(page) {
  for (let step = 0; step < 3; step += 1) {
    await page.locator(".option-button").nth(step % 2).click();
  }
}

async function answerCurrentRouteWithOffset(page, offset) {
  for (let step = 0; step < 3; step += 1) {
    const options = page.locator(".option-button");
    const count = await options.count();
    assert(count >= 4, `expected at least 4 options, got ${count}`);
    await options.nth((step + offset) % count).click();
  }
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ["clipboard-read", "clipboard-write"],
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const logs = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) logs.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));

  await page.goto(BASE_URL);
  await expectVisible(page, "今天，你想把哪个问题丢给知乎？", "home headline");
  await expectVisible(page, "我炒股能不能赚钱？", "stock bubble");
  await checkNoHorizontalOverflow(page, "desktop home");

  await page.getByRole("button", { name: "用知乎登录" }).click();
  await expectVisible(page, "知乎回声已接上", "login demo");
  await page.getByRole("button", { name: "随便替我问一个" }).click();
  await expectVisible(page, "匿名问题", "random route");
  await page.getByRole("button", { name: "返回星图" }).click();
  await expectVisible(page, "今天，你想把哪个问题丢给知乎？", "home after random");

  await page.getByRole("button", { name: "要不要裸辞？" }).click({ force: true });
  await expectVisible(page, "匿名问题", "route case");
  await expectVisible(page, "你想到辞职时", "quit first question");
  await answerCurrentRoute(page);
  await expectVisible(page, "你的回声", "result");
  await expectVisible(page, "第 1 个选择", "choice trace");
  await expectVisible(page, "知乎相似问题", "zhihu witness");
  await expectVisible(page, "离职前应该做哪些准备？", "related question");
  const zhihuHref = await page.locator("#zhihuLink").getAttribute("href");
  assert(zhihuHref && zhihuHref.includes("zhihu.com/search"), `unexpected zhihu link: ${zhihuHref}`);
  const relatedCount = await page.locator("#relatedQuestions a").count();
  assert(relatedCount >= 3, `expected related questions, got ${relatedCount}`);
  const canvasBox = await page.locator("#shareCanvas").boundingBox();
  assert(canvasBox && canvasBox.width > 250 && canvasBox.height > 300, "share canvas should be visible");
  await page.getByRole("button", { name: "复制这句话" }).click();
  await expectVisible(page, "已复制", "copy feedback");
  const originalLine = await page.locator("#finalLine").innerText();
  await page.getByRole("button", { name: "再给我一句" }).click();
  const refreshedLine = await page.locator("#finalLine").innerText();
  assert(refreshedLine !== originalLine, "more line should refresh final line");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "保存小卡片" }).click();
  const download = await downloadPromise;
  assert(download.suggestedFilename().endsWith(".png"), "share card should download as png");

  await page.getByRole("button", { name: "换个问题" }).click();
  await expectVisible(page, "我炒股能不能赚钱？", "home after result");
  await page.getByRole("button", { name: "我炒股能不能赚钱？" }).click({ force: true });
  await expectVisible(page, "这里只谈心态", "stock route");
  await answerCurrentRoute(page);
  await expectVisible(page, "钱会放大判断", "stock result line");

  await page.goto(BASE_URL);
  await page.getByPlaceholder("比如：我要不要辞职去开一家小店？").fill("我想辞职开咖啡店");
  await page.getByRole("button", { name: "丢进去" }).click();
  await expectVisible(page, "我想辞职开咖啡店", "custom question");
  await answerCurrentRoute(page);
  await expectVisible(page, "保存小卡片", "share action");

  await page.goto(`${BASE_URL}/?route=stock`);
  await expectVisible(page, "你最想从股市里拿到什么？", "route param");

  const routes = [
    "quit",
    "reunion",
    "breakup",
    "career",
    "startup",
    "stock",
    "effort",
    "ordinary",
    "city",
    "please",
  ];
  for (const [index, route] of routes.entries()) {
    await page.goto(`${BASE_URL}/?route=${route}`);
    await page.locator(".option-button").first().waitFor({ state: "visible", timeout: 5000 });
    await answerCurrentRouteWithOffset(page, index);
    await expectVisible(page, "知乎相似问题", `${route} zhihu witness`);
    const line = await page.locator("#finalLine").innerText();
    assert(line.length >= 12, `${route} final line too short: ${line}`);
    const href = await page.locator("#zhihuLink").getAttribute("href");
    assert(href && href.includes("zhihu.com/search"), `${route} missing zhihu search link`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL);
  await expectVisible(page, "今天，你想把哪个问题丢给知乎？", "mobile home");
  await checkNoHorizontalOverflow(page, "mobile home");
  await page.getByRole("button", { name: "该不该复合？" }).click({ force: true });
  await checkNoHorizontalOverflow(page, "mobile play");
  await answerCurrentRoute(page);
  await checkNoHorizontalOverflow(page, "mobile result");

  await browser.close();
  const seriousLogs = logs.filter((line) => !line.includes("favicon"));
  assert(seriousLogs.length === 0, `browser console issues:\n${seriousLogs.join("\n")}`);
  console.log("browser ux ok");
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
