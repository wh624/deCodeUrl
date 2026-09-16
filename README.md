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

不要使用 GitHub 自动生成的 `static.yml`（Deploy static content）。那个工作流会把未构建的源码直接发布出去，页面会空白并出现 `/src/main.js` 404。
