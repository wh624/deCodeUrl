# goToUrl 解码替换

把天猫 `alipay-login?goToUrl=` 链接循环 `decodeURIComponent` 直到完全解密，修改 `itemId` / `skuId` 后再 `encodeURIComponent` 两次拼回去。支持复制新链接，并生成可扫码的二维码。

链接只在浏览器本地处理，不会上传。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址即可。

## 构建

```bash
npm run build
```

产物在 `dist/`。`vite.config.js` 已设置 `base: './'`，方便之后发布到 GitHub Pages。

预览构建结果：

```bash
npm run preview
```

## 发布到 GitHub

1. 在本目录执行 `git init`
2. 到 GitHub 新建仓库
3. 提交并推送：

```bash
git add .
git commit -m "feat: 天猫 goToUrl 解码替换工具"
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

如果要用 GitHub Pages，把 Pages 的 Source 设为 `GitHub Actions` 或把 `dist` 发布到 `gh-pages` 分支即可。
