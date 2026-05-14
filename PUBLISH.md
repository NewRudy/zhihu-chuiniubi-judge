# 发布说明

## 当前状态

- 代码已通过 SSH 推送到：`https://github.com/NewRudy/zhihu-chuiniubi-judge`
- 已推送 `main` 分支和 `gh-pages` 分支。
- `gh-pages` 的 GitHub Pages 动态构建已经成功。
- 本地测试通过：`bash scripts/smoke-test.sh`

## GitHub Pages

当前采用 `gh-pages` 分支发布。主分支里不再保留 GitHub Actions Pages workflow，避免仓库没有启用 Actions Pages source 时持续失败。

如果线上地址打不开，请在 GitHub 网页确认：

1. 进入仓库 `Settings`
2. 打开 `Pages`
3. Source 设为 `Deploy from a branch`
4. Branch 选 `gh-pages`，目录选 `/root`

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
