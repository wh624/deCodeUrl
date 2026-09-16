# deCodeUrl

链接解析。把天猫 `alipay-login?goToUrl=` 链接循环 `decodeURIComponent` 直到完全解密，修改 `itemId` / `skuId` 后再 `encodeURIComponent` 两次拼回去。支持复制新链接，并生成可扫码的二维码。

链接只在浏览器本地处理，不会上传。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址即可。

## GitHub Pages 自动部署

推送到 `master` 或 `main` 后，GitHub Actions 会自动构建并发布 Pages。

第一次需要在仓库里打开一次 Pages：

1. 打开 GitHub 仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**
3. 推送代码，或到 **Actions** 里手动跑一次 `Deploy GitHub Pages`

发布成功后地址：

```text
https://wh624.github.io/deCodeUrl/
```
