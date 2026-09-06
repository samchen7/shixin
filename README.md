# 拾信

把旧短信收进 Gmail 的落地页。静态站点，推送到 GitHub 后由 Vercel 自动部署。

## 本地预览

只看页面可以用任意静态服务器：

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

打开 http://127.0.0.1:5500/ 。本机要用激活码走 Blob 下载时，先把 Blob store 连上 Development，再：

```bash
vercel env pull .env.local --yes
vercel dev
```

## 部署

仓库已对接 Vercel Git 集成：推送到 `main` 会部署生产环境，其他分支会生成 Preview。

## 当前 Demo

- 产品页包含归档流程、使用场景、联系人归档预览与下载解锁。
- 联系人示例统一为「老周」「小王」「电话号码」。
- 点击下载后输入激活码；验证通过会展示已解锁状态并自动请求 APK 下载。
- 演示激活码沿用 `9119`。本次浏览器会话通过 `sessionStorage` 保存已解锁状态；存储不可用时退回当前页面内存。

### 支付接入边界

`assets/access.js` 集中提供 `hasAccess()`、`verify(code)`、`getDownload()`，`assets/download.js` 只管理下载界面与状态。当前是本地交互 Demo，尚未接入 Stripe、用户账户或真实订单。

上线付费版本时，用服务端接口替换演示适配器：创建 Checkout 会话、验证支付 webhook、持久化订单与下载权益，再通过已认证接口签发短期下载 URL。支付返回页面只查询服务端权益，不应把跳转参数当作付款成功证明。激活码也需要改成服务端验证。

生产环境的 APK 放在私有 Vercel Blob 里，通过 `/api/download` 校验激活码后再流出。仓库不再跟踪安装包。本机静态预览仍可把 `downloads/shixin.apk` 放在本地作后备（已 gitignore）。前端激活码和浏览器存储仍是 Demo 门禁，不是完整授权。
