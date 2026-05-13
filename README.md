# 知乎吹牛逼鉴定局

一个面向 2026 知乎「AI 脑洞实验室」黑客松灵感引擎赛道的可演示网页应用。

核心玩法：给用户一个知乎式问题和三段回答，让用户判断哪段是「社区高赞风格」、哪段是「AI 仿深刻」、哪段是「纯吹牛逼」。结束后生成「抗吹牛逼指数」和可分享人格卡。

## 产品亮点

- **参与感强**：用户不是看 AI 生成，而是在做判断游戏。
- **社交传播**：结果天然适合截图，朋友之间可以互相挑战。
- **知乎适配**：围绕“高质量讨论”和“看起来很懂的废话”展开，贴合社区语境。
- **创作者价值**：每局揭晓回答为什么像高赞，可反向拆成选题和表达结构。

## 本地运行

```bash
python3 -m http.server 5173
```

然后打开 `http://localhost:5173`。

## 部署

这是一个纯静态站点，可以直接部署到 GitHub Pages、Vercel 或 Netlify。

## 路演与提交材料

- `SUBMISSION.md`：黑客松提交说明
- `PITCH.md`：15 秒、90 秒和 3 分钟路演讲稿
- `JUDGING.md`：评审要点说明
- `PUBLISH.md`：GitHub Pages 发布说明
- `API_INTEGRATION.md`：知乎 API 代理接入方案
- `dist/index.html`：单文件部署包

生成提交包：

```bash
bash scripts/package-submission.sh
```

本地自检：

```bash
bash scripts/smoke-test.sh
```

当环境中可用 Playwright 时，`smoke-test.sh` 会顺带运行
`scripts/browser-ux-check.js`，真实点击开局、盖章、揭晓、下一局、热榜、
路演、结果卡、复制反馈、临场造题链接和移动端布局。

路演快捷参数：

- `?mode=pitch`：直接进入评委演示局
- `?mode=hot`：直接进入热榜实验室
- `?mode=result`：直接展示结果卡
- `?result=1`：直接展示结果卡和创作者灵感转化
- `?topic=你的话题`：生成朋友挑战局
