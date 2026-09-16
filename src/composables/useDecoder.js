import { computed, ref, watch } from "vue";
import { buildOutput, parseSource, SAMPLE_URL } from "../utils/urlCodec.js";
import { createQrDataUrl } from "../utils/qrcode.js";

const template = parseSource(SAMPLE_URL);

export const useDecoder = () => {
  const itemId = ref(template.itemId);
  const skuId = ref(template.skuId);
  const copyHint = ref("");
  const qrSrc = ref("");
  const outputEl = ref(null);

  const output = computed(() =>
    buildOutput(template, itemId.value.trim(), skuId.value.trim()).url,
  );

  const refreshQr = async (text) => {
    if (!text) {
      qrSrc.value = "";
      return;
    }

    try {
      qrSrc.value = await createQrDataUrl(text);
    } catch {
      qrSrc.value = "";
    }
  };

  const copyOutput = async () => {
    const text = output.value.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      copyHint.value = "已复制";
    } catch {
      outputEl.value?.focus();
      outputEl.value?.select();
      document.execCommand("copy");
      copyHint.value = "已选中，可手动复制";
    }
  };

  watch(output, (url) => {
    copyHint.value = "";
    refreshQr(url);
  });

  refreshQr(output.value);

  return {
    itemId,
    skuId,
    output,
    copyHint,
    qrSrc,
    outputEl,
    copyOutput,
  };
};
