export const DEFAULT_PREFIX =
  "https://pages.tmall.com/wow/z/wt/act/alipay-login?goToUrl=";

export const SAMPLE_URL =
  "https://pages.tmall.com/wow/z/wt/act/alipay-login?goToUrl=https%253A%252F%252Fpages.tmall.com%252Fwow%252Fwt%252Fact%252Flm-pages%253Fenv%253D%2526extJson%253D%257B%2522requestSourceInfo%2522%253A%2522SID%253A178927440840510001and99999999INTELLIGENT_SORT7295396794000SR2024110510425045%252C94000SR2025091714812006%252C94000SR2023102305988003%257C0%2522%257D%2526orderItems%253D%255B%257B%2522itemId%2522%253A%2522904974097167%2522%252C%2522skuId%2522%253A%25225932027339350%2522%252C%2522number%2522%253A1%257D%255D%2526verifyPoint%2526wh_page%253Dbuy";

export const decodeFully = (value) => {
  let current = value;
  let times = 0;

  while (times < 12) {
    let next;
    try {
      next = decodeURIComponent(current);
    } catch {
      break;
    }
    if (next === current) break;
    current = next;
    times += 1;
  }

  return { decoded: current, times };
};

export const splitOuter = (fullUrl) => {
  const marker = "goToUrl=";
  const idx = fullUrl.indexOf(marker);

  if (idx === -1) {
    return {
      prefix: DEFAULT_PREFIX,
      value: fullUrl.trim(),
      suffix: "",
    };
  }

  const after = fullUrl.slice(idx + marker.length);
  const amp = after.indexOf("&");

  if (amp === -1) {
    return {
      prefix: fullUrl.slice(0, idx + marker.length),
      value: after,
      suffix: "",
    };
  }

  return {
    prefix: fullUrl.slice(0, idx + marker.length),
    value: after.slice(0, amp),
    suffix: after.slice(amp),
  };
};

export const extractIds = (decodedInner) => {
  try {
    const url = new URL(decodedInner);
    const raw = url.searchParams.get("orderItems");
    if (raw) {
      const items = JSON.parse(raw);
      if (Array.isArray(items) && items[0]) {
        return {
          itemId: String(items[0].itemId ?? ""),
          skuId: String(items[0].skuId ?? ""),
        };
      }
    }
  } catch {
    // fall through to regex
  }

  return {
    itemId: decodedInner.match(/"itemId"\s*:\s*"([^"]*)"/)?.[1] || "",
    skuId: decodedInner.match(/"skuId"\s*:\s*"([^"]*)"/)?.[1] || "",
  };
};

export const replaceIds = (decodedInner, itemId, skuId) =>
  decodedInner
    .replace(/("itemId"\s*:\s*")([^"]*)(")/, `$1${itemId}$3`)
    .replace(/("skuId"\s*:\s*")([^"]*)(")/, `$1${skuId}$3`);

export const parseSource = (source) => {
  const trimmed = source.trim();
  if (!trimmed) {
    throw new Error("请先粘贴原始链接");
  }

  const outer = splitOuter(trimmed);
  if (!outer.value) {
    throw new Error("没有找到 goToUrl 参数");
  }

  const { decoded, times } = decodeFully(outer.value);
  const ids = extractIds(decoded);

  return {
    prefix: outer.prefix,
    suffix: outer.suffix,
    decoded,
    times,
    itemId: ids.itemId,
    skuId: ids.skuId,
  };
};

export const buildOutput = (state, itemId, skuId) => {
  const replaced = replaceIds(state.decoded, itemId, skuId);
  const encoded = encodeURIComponent(encodeURIComponent(replaced));
  return {
    replaced,
    url: state.prefix + encoded + state.suffix,
  };
};
