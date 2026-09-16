import QRCode from "qrcode";

export const createQrDataUrl = (text) =>
  QRCode.toDataURL(text, {
    width: 240,
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark: "#1c1915",
      light: "#ffffff",
    },
  });
