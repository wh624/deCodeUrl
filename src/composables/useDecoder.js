import { computed, ref, watch } from "vue";
import { buildOutput, parseSource, SAMPLE_URL } from "../utils/urlCodec.js";
import { createQrDataUrl } from "../utils/qrcode.js";

export const useDecoder = () => {
  const source = ref("");
  const itemId = ref("");
  const skuId = ref("");
  const parsed = ref(null);
  const status = ref({ text: "粘贴链接后会自动解码", type: "" });
  const outputStatus = ref({ text: "", type: "" });
  const qrSrc = ref("");
  const qrHint = ref("生成新链接后会在这里出现二维码");
  const outputEl = ref(null);

  const decoded = computed(() => parsed.value?.decoded ?? "");

  const output = computed(() => {
    if (!parsed.value) return "";
    return buildOutput(parsed.value, itemId.value.trim(), skuId.value.trim()).url;
  });

  const refreshQr = async (text) => {
    if (!text) {
      qrSrc.value = "";
      qrHint.value = "生成新链接后会在这里出现二维码";
      return;
    }

    try {
      qrSrc.value = await createQrDataUrl(text);
      qrHint.value = "用手机扫一扫即可打开新链接";
    } catch {
      qrSrc.value = "";
      qrHint.value = "链接过长，二维码生成失败，请直接复制上方链接";
    }
  };

  const applyParse = (updateInputs = true) => {
    try {
      parsed.value = parseSource(source.value);
      if (updateInputs) {
        itemId.value = parsed.value.itemId;
        skuId.value = parsed.value.skuId;
      }

      status.value =
        !parsed.value.itemId || !parsed.value.skuId
          ? {
              text: `已解码 ${parsed.value.times} 次，但没有找到 itemId / skuId`,
              type: "error",
            }
          : {
              text: `已解码 ${parsed.value.times} 次，已提取商品信息`,
              type: "ok",
            };

      outputStatus.value = {
        text: "已对解密结果 encodeURIComponent 两次，并拼回 goToUrl",
        type: "ok",
      };
    } catch (error) {
      parsed.value = null;
      qrSrc.value = "";
      status.value = { text: error.message, type: "error" };
      outputStatus.value = { text: "", type: "" };
      qrHint.value = "生成新链接后会在这里出现二维码";
    }
  };

  const fillSample = () => {
    source.value = SAMPLE_URL;
    applyParse(true);
  };

  const generate = () => {
    if (!source.value.trim()) {
      applyParse(true);
      return;
    }
    if (!parsed.value) applyParse(false);
  };

  const copyOutput = async () => {
    const text = output.value.trim();
    if (!text) {
      outputStatus.value = { text: "还没有可复制的新链接", type: "error" };
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      outputStatus.value = { text: "新链接已复制到剪贴板", type: "ok" };
    } catch {
      outputEl.value?.focus();
      outputEl.value?.select();
      document.execCommand("copy");
      outputStatus.value = { text: "已选中文本，可手动复制", type: "ok" };
    }
  };

  watch(source, () => applyParse(true));
  watch(output, (url) => {
    refreshQr(url);
  });

  return {
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
  };
};
