# 拾信

把旧短信收进 Gmail 的落地页。静态站点，推送到 GitHub 后由 Vercel 自动部署。

## 本地预览

任意静态服务器即可，例如：

```bash
npx --yes serve .
```

打开提示的本地地址即可。

## 部署

仓库已对接 Vercel Git 集成：推送到 `main` 会部署生产环境，其他分支会生成 Preview。
