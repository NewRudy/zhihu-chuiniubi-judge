# 发布说明

当前项目已经准备好 GitHub 发布，但本机 GitHub CLI 尚未登录。

## 已准备好

- 本地 Git 仓库
- 完整静态应用源码
- `dist/index.html` 单文件部署包
- GitHub Pages workflow
- 本地 GitHub CLI：`tools/gh_2.92.0_macOS_arm64/bin/gh`

## 发布步骤

```bash
./tools/gh_2.92.0_macOS_arm64/bin/gh auth login
bash scripts/publish-github.sh
```

预期产物：

- 仓库：`https://github.com/NewRudy/zhihu-chuiniubi-judge`
- 应用：`https://newrudy.github.io/zhihu-chuiniubi-judge/`

## 如果只想最快上线单文件版

可将 `dist/index.html` 上传到任意静态托管服务，例如 Vercel、Netlify、GitHub Pages 或飞书附件预览不推荐。
