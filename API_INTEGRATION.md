# 知乎 API 接入方案

当前 Demo 已经把核心体验做成静态可跑版本。知乎数据接入分两层：

1. **静态 fallback**：前端结果页根据线路给出知乎相似问题搜索链接，保证路演不中断。
2. **正式 API 模式**：接入官方热榜、问题、高赞回答和 OAuth 后，把搜索链接替换成真实问题/回答链接和摘要。

## 用户登录

首页已预留「用知乎登录」入口。当前是授权演示状态；拿到官方 OAuth 配置后，建议接入：

- `client_id`
- `redirect_uri`
- `scope`
- `code -> token` 的后端交换
- 用户基础资料与兴趣标签

OAuth token 不应放在前端静态 JS 中，建议由 Serverless 代理保存和转发。

## 高赞回答接入

理想返回给前端的结构：

```json
{
  "questionTitle": "要不要裸辞？",
  "matchedQuestion": "裸辞后的人后来怎么样了？",
  "questionUrl": "https://www.zhihu.com/question/xxx",
  "answerUrl": "https://www.zhihu.com/question/xxx/answer/yyy",
  "voteupCount": 12345,
  "answerExcerpt": "高赞回答摘要",
  "source": "zhihu-api"
}
```

前端需要的不是长回答全文，而是：

- 真实问题标题
- 高赞回答链接
- 高赞摘要或 excerpt
- 赞同数/热度等可信提示

AI 层只负责把它压缩成 1-2 句「高赞回声」，不要在页面上暴露复杂技术说明。

## 代理层

仓库保留了 `api/challenges.js`，它已经支持从环境变量读取知乎 API base URL、token、热榜路径和回答路径。旧的三段式挑战局格式后续可以改造成结果页需要的 `matchedQuestion/answerUrl/answerExcerpt` 格式。

环境变量示例：

```bash
ZHIHU_API_BASE=https://example.zhihu-api.local
ZHIHU_API_TOKEN=replace-me
ZHIHU_HOT_PATH=/hot
ZHIHU_ANSWERS_PATH=/questions/{question_id}/answers
```

如果官方鉴权不是 Bearer Token，可继续使用：

```bash
ZHIHU_API_AUTH_HEADER=X-API-Key
ZHIHU_API_AUTH_PREFIX=
```

## 今晚降级策略

- GitHub Pages 先部署静态版，确保可展示。
- 每条线路先给知乎搜索链接，链接关键词已贴近问题。
- 结果页文案先使用本地精写高赞回声。
- 拿到官方 API/OAuth 后，把链接和摘要替换为真实高赞回答。

这样路演时可以稳定演示体验，同时清楚说明知乎 API 会如何提升数据真实性和个性化。
