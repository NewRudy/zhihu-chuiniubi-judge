# 最终提交核对清单

## 链接

- 在线应用：https://newrudy.github.io/zhihu-chuiniubi-judge/
- GitHub 仓库：https://github.com/NewRudy/zhihu-chuiniubi-judge
- 参赛想法链接：https://www.zhihu.com/pin/2037917127592630058

## 项目信息

- 项目名称：知乎吹牛逼
- 队伍名称：知乎吹牛逼
- 赛道：灵感引擎
- 一句话：从一个真实想问的问题出发，找到一条和你站在同一边的知乎高赞回声。

## 推荐演示路径

1. 打开首页，展示漂浮问题星图。
2. 点击「随便替我问一个」，展示低门槛入口。
3. 返回首页，点击「我炒股能不能赚钱？」或「要不要裸辞？」。
4. 连续选择 3 个选项，强调选项像用户心里的真实辩解。
5. 到结果页，展示：
   - 选择轨迹
   - 知乎相似问题
   - 同一派问题
   - 高赞回声
   - 结果判词
   - 再给我一句
   - 保存小卡片
6. 点击「复制这句话」，说明分享文案自带应用链接。
7. 回到首页，在输入框输入「我想辞职开咖啡店」，展示自定义问题匹配。

## 当前功能状态

- 漂浮问题星图：已完成
- 自定义问题匹配：已完成
- 随机问题入口：已完成
- 10 条精写路线：已完成
- 每条 3 道选择分叉：已完成
- 结果页选择轨迹：已完成
- 知乎相似问题链接：已完成
- 同一派问题链接：已完成
- 再给我一句：已完成
- 保存 PNG 小卡片：已完成
- 复制分享文案：已完成
- 移动端布局：已通过自动化检查

## 测试状态

本地运行：

```bash
bash scripts/smoke-test.sh
```

最近一次结果：

```text
browser ux ok
smoke ok
```

线上运行：

```bash
APP_URL='https://newrudy.github.io/zhihu-chuiniubi-judge/' \
NODE_PATH="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules" \
"$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" \
scripts/browser-ux-check.js
```

最近一次结果：

```text
browser ux ok
```

## API / OAuth 说明

当前版本优先保证可演示、可分享、可提交。正式知乎 OAuth 和高赞回答 API 接入路径已经写在 `API_INTEGRATION.md`：

- 登录后结合用户授权身份和兴趣信号。
- 根据用户选择匹配真实知乎问题。
- 拉取真实高赞回答链接、摘要和互动数据。
- AI 只负责浓缩成 1-2 句高赞回声。
- 接口不可用时回退到本地精写题库和知乎搜索链接，保证路演不中断。

## 最后确认

- GitHub Pages 当前使用 `gh-pages` 分支发布。
- 如果线上打不开，检查仓库 `Settings -> Pages`：
  - Source: `Deploy from a branch`
  - Branch: `gh-pages`
  - Folder: `/root`
