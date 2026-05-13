# 发布说明

## 当前状态

- 代码已通过 SSH 推送到：`https://github.com/NewRudy/zhihu-chuiniubi-judge`
- 最新提交：`1d2db66 Rebuild as Zhihu resonance game`
- 已额外推送 `gh-pages` 分支，方便切换 GitHub Pages 的分支发布模式。
- 本地测试通过：`bash scripts/smoke-test.sh`

## GitHub Pages

当前仓库的 Pages API 返回 404，Actions 中 `Setup Pages` 步骤失败，说明仓库设置里很可能还没有启用 Pages。

需要在 GitHub 网页上手动打开：

1. 进入仓库 `Settings`
2. 打开 `Pages`
3. 如果选择 GitHub Actions：把 Source 设为 `GitHub Actions`，然后重新运行 Actions
4. 如果选择分支部署：把 Source 设为 `Deploy from a branch`，Branch 选 `gh-pages`，目录选 `/root`

预期应用地址：

```text
https://newrudy.github.io/zhihu-chuiniubi-judge/
```

## 新仓库发布

这台机器 SSH 已经可用，但 GitHub 不允许通过 SSH push 自动创建不存在的新仓库；当前也没有可用的 `gh` 命令。

如果要新建仓库，先在 GitHub 网页创建：

```text
NewRudy/zhihu-chuiniubi
```

然后本地执行：

```bash
git remote set-url origin git@github.com:NewRudy/zhihu-chuiniubi.git
git push -u origin main
git push -f origin gh-pages
```

如果保留当前仓库，只需要继续：

```bash
git push origin main
```

## 提交包

生成提交包：

```bash
bash scripts/package-submission.sh
```

输出：

```text
dist/zhihu-chuiniubi-submission.zip
```
