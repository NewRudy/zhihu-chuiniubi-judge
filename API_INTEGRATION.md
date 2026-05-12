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
```

## 预期接口

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

## 部署选择

- **GitHub Pages**：只能运行静态版，使用 `data/hot-rounds.json` fallback。
- **Vercel**：可以运行 `api/challenges.js`，适合隐藏知乎 API token。
- **Netlify/Cloudflare Workers**：同理，需要把代理函数改成对应平台格式。

