# 知乎 Hackathon API 接入笔记

## 当前状态

用户提供了官方飞书文档链接，但目前无法通过公开网页抓取到正文。普通搜索也没有找到可公开索引的 API 文档内容。

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

`script.js` 里的 `BASE_ROUNDS` 是当前离线题库。后续可以替换为：

```js
async function loadRounds() {
  try {
    const response = await fetch("/api/zhihu/challenges");
    return await response.json();
  } catch {
    return BASE_ROUNDS;
  }
}
```

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

