# API 接入方案

当前 Demo 已预留 Serverless API 代理：`api/challenges.js`。

## 为什么需要代理

如果知乎官方 API 需要 token，不能把 token 放进前端静态 JS。代理层负责：

- 从环境变量读取 token
- 请求知乎官方 API
- 标准化成前端游戏题库
- API 失败时回退到本地题库，保证路演不中断

## 环境变量

```bash
ZHIHU_API_BASE=https://example.zhihu-api.local
ZHIHU_API_TOKEN=replace-me
ZHIHU_HOT_PATH=/hot
ZHIHU_ANSWERS_PATH=/questions/{question_id}/answers
```

`ZHIHU_API_TOKEN` 可以为空；如果官方接口需要鉴权，代理默认使用
`Authorization: Bearer <token>`。如果文档要求其他 Header，可以改：

```bash
ZHIHU_API_AUTH_HEADER=X-API-Key
ZHIHU_API_AUTH_PREFIX=
```

## 前端接口

前端优先请求：

```text
/api/challenges
```

返回结构：

```json
{
  "source": "zhihu-api",
  "rounds": [
    {
      "question": "问题标题",
      "hook": "这一局的提示",
      "answers": [
        {
          "kind": "human",
          "lure": "话术标签",
          "text": "回答正文",
          "reveal": "揭晓解释"
        }
      ]
    }
  ]
}
```

## 已支持的官方数据形态

`api/challenges.js` 现在不是只认一个死格式，会自动从这些字段里找热榜/问题列表：

- `questions`
- `data.questions`
- `data.items`
- `data`
- `items`
- `hot`
- `hot_list`
- `list`
- `records`
- `result.questions`
- `result.items`

每个问题会尝试读取 `answers`、`top_answers`、`answer_list` 等高赞回答字段；
如果官方热榜接口只返回问题、不返回回答，可配置 `ZHIHU_ANSWERS_PATH`，代理会用
`question_id` 再拉一次回答列表，并按 `voteup_count`、`upvote_count`、`like_count`
等字段优先选高赞内容。

## 部署选择

- **GitHub Pages**：只能运行静态版，使用 `data/hot-rounds.json` fallback。
- **Vercel**：可以运行 `api/challenges.js`，适合隐藏知乎 API token。
- **Netlify/Cloudflare Workers**：同理，需要把代理函数改成对应平台格式。
