<script setup>
import { useDecoder } from "./composables/useDecoder.js";

const { itemId, skuId, output, copyHint, qrSrc, outputEl, copyOutput } = useDecoder();
</script>

<template>
  <main class="page">
    <header class="hero">
      <h1>goToUrl 链接替换</h1>
    </header>

    <section class="card">
      <p class="hint-top">itemId 和 skuId 都可以直接修改</p>

      <div class="row">
        <div>
          <label for="itemId">itemId</label>
          <input id="itemId" v-model="itemId" type="text" placeholder="输入 itemId" />
        </div>
        <div>
          <label for="skuId">skuId</label>
          <input id="skuId" v-model="skuId" type="text" placeholder="输入 skuId" />
        </div>
      </div>

      <div class="output">
        <label for="output">新链接</label>
        <div class="output-box">
          <textarea id="output" ref="outputEl" :value="output" readonly />
          <button class="primary copy" type="button" @click="copyOutput">
            {{ copyHint || "复制" }}
          </button>
        </div>
      </div>

      <label>扫码打开</label>
      <div class="qr-wrap">
        <img v-if="qrSrc" :src="qrSrc" alt="新链接二维码" width="240" height="240" />
      </div>
    </section>
  </main>
</template>
