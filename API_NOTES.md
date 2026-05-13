# 知乎 Hackathon API 接入笔记

## 当前状态

用户提供了官方飞书文档链接；知乎 API 文档入口公开抓取会跳登录页，普通搜索也没有找到可公开索引的 API 文档内容。当前仍需要在登录态浏览器或官方群内确认最终 base URL、鉴权方式和字段说明。

前端和代理层已经按“真实热榜 + 高赞回答”优先设计：只要拿到 `ZHIHU_API_BASE`
和可用路径，就能通过环境变量切换到真实数据，不需要改页面交互。

2026-05-13 更新：代理已增强为宽字段适配器，支持嵌套标题、嵌套回答正文和中文数量单位。即使官方返回结构接近知乎现有 Web 数据形态，例如 `title_area.text`、`content.text`、`metrics_area.text`，也能归一化成挑战局。

## 待从官方文档确认

- API base URL
- 鉴权 Header 或 token 参数
- token 是否可公开出现在前端
- 可用接口列表
- 响应字段结构
- 额度、频率、缓存要求
- 是否允许公开展示真实知乎内容
- 是否有测试环境和正式环境

## 建议架构

如果 API key/token 不能公开：

- 前端部署在 GitHub Pages 或 Vercel
- API 请求通过 Vercel/Netlify/Cloudflare Worker 代理
- token 放在平台环境变量中
- 前端只调用 `/api/zhihu/hot`、`/api/zhihu/question` 这类安全代理接口

如果官方 API 无需密钥或只提供短期公开 token：

- 可以先用静态前端直接调用
- 增加本地 fallback 数据，保证路演断网或 API 失败时仍然能演示

## 当前 Demo 可接入点

`script.js` 里的 `BASE_ROUNDS` 是当前离线题库。今日案卷会优先请求：

```js
fetch("/api/challenges")
```

`api/challenges.js` 负责把官方返回的热榜、问题、高赞回答字段归一化成三段式挑战局。烟测里已有本地模拟接口，覆盖：

- 热榜列表在 `data.result.items`
- 问题标题在 `target.question.title_area.text`
- 高赞回答通过 `ZHIHU_ANSWERS_PATH` 二次拉取
- 统计值为 `9.8 万`、`1.2 万` 这类中文单位

## 对产品有价值的知乎 API 能力

优先级从高到低：

1. 热榜问题列表
2. 问题下高赞回答摘要
3. 问题分类/标签
4. 回答点赞、评论、收藏等统计
5. 搜索或相似问题

这些数据可以支撑：

- 每日热榜鉴定局
- 高赞表达结构拆解
- AI 仿深刻答案生成
- 纯吹牛逼答案生成
- 创作者选题建议
