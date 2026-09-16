# deCodeUrl

修改 `itemId` / `skuId` 后生成新的天猫 goToUrl 链接，支持复制和扫码。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

## GitHub Pages

地址：https://wh624.github.io/deCodeUrl/

仓库 **Settings → Pages → Source** 必须选 **GitHub Actions**。
如果选成 Deploy from a branch，线上会直接发布未构建的 `index.html`，页面会空白，并出现 `/src/main.js` 404。
