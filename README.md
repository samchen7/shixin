# 拾信

把旧短信收进 Gmail 的落地页。静态站点，推送到 GitHub 后由 Vercel 自动部署。

## 本地预览

只看页面可以用任意静态服务器：

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

打开 http://127.0.0.1:5500/ 。本机要用激活码走 Blob 下载，或测试 Stripe 结账时，先把环境变量拉到 Development，再：

```bash
vercel env pull .env.local --yes
vercel dev
```

## 部署

仓库已对接 Vercel Git 集成：推送到 `main` 会部署生产环境，其他分支会生成 Preview。

## 当前 Demo

- 产品页包含归档流程、使用场景、联系人归档预览、购买与下载解锁。
- 联系人示例统一为「老周」「小王」「电话号码」。
- 点击购买会进入 Stripe Checkout；付款成功后回到已购工作台（下载 + 怎么用）。
- 激活码仍可作为备用入口（默认 `9119`）。浏览器 cookie 保存已购状态；前端 sessionStorage 只用于界面。

### 支付接入边界

`assets/access.js` 提供 `hasAccess()`、`restore()`、`startCheckout()`、`claim(sessionId)`、`verify(code)`、`getDownload()`。购买走 Stripe Checkout：`/api/checkout` 创建一次性付款会话，回来后 `/api/access` 向 Stripe 核对 `session_id` 是否已付款且对应 `STRIPE_PRICE_ID`，再签发下载 cookie。`/api/webhook` 校验 Stripe 签名。不要把支付跳转参数当作成功证明。

激活码仍可作为备用入口（`SHIXIN_ACCESS_CODE`，默认 `9119`），便于内测。生产环境的 APK 放在私有 Vercel Blob，通过 `/api/download` 在 cookie 有效时流出。

需要的环境变量见 `.env.example`。密钥只放 Vercel / `.env.local`，不要提交仓库，也不要发到聊天里。
