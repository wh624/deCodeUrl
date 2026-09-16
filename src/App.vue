<script setup>
import { useDecoder } from "./composables/useDecoder.js";

const {
  source,
  itemId,
  skuId,
  decoded,
  output,
  status,
  outputStatus,
  qrSrc,
  qrHint,
  outputEl,
  fillSample,
  generate,
  copyOutput,
} = useDecoder();
</script>

<template>
  <main class="page">
    <header class="hero">
      <div>
        <h1>goToUrl 解码替换</h1>
        <p class="sub">
          粘贴带 goToUrl 的天猫链接，循环 decodeURIComponent 直到完全解密，
          改完 itemId / skuId 后再 encodeURIComponent 两次拼回去。
        </p>
      </div>
      <span class="badge">本地工具 · 不上传链接</span>
    </header>

    <section class="grid">
      <article class="card">
        <label for="source">原始链接</label>
        <textarea
          id="source"
          v-model="source"
          placeholder="把 https://pages.tmall.com/wow/z/wt/act/alipay-login?goToUrl=... 粘贴到这里"
        />
        <div class="actions">
          <button class="ghost" type="button" @click="fillSample">填入示例</button>
          <button class="primary" type="button" @click="generate">生成新链接</button>
        </div>
        <p class="meta" :class="status.type">{{ status.text }}</p>

        <div class="row">
          <div>
            <label for="itemId">itemId</label>
            <input id="itemId" v-model="itemId" type="text" placeholder="解码后自动填入" />
          </div>
          <div>
            <label for="skuId">skuId</label>
            <input id="skuId" v-model="skuId" type="text" placeholder="解码后自动填入" />
          </div>
        </div>

        <div class="decoded">
          <label for="decoded">完全解密后的 goToUrl</label>
          <textarea id="decoded" :value="decoded" readonly />
        </div>
      </article>

      <article class="card">
        <label for="output">新链接</label>
        <div class="output-box">
          <textarea
            id="output"
            ref="outputEl"
            :value="output"
            readonly
            placeholder="修改 itemId / skuId 后会出现在这里"
          />
          <button class="primary copy" type="button" @click="copyOutput">复制</button>
        </div>
        <p class="meta" :class="outputStatus.type">{{ outputStatus.text }}</p>

        <label>扫码打开</label>
        <div class="qr-wrap">
          <img v-if="qrSrc" :src="qrSrc" alt="新链接二维码" width="240" height="240" />
        </div>
        <p class="hint">{{ qrHint }}</p>
      </article>
    </section>
  </main>
</template>
