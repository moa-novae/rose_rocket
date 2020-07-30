// inspired by https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/
import { hexToRgb } from "./hexToRgb";
export const bgBrightness = function (hex) {
  const { r, g, b } = hexToRgb(hex);
  //the threshold at which colors are considered "light"
  const threshold = 0.5;
  const perceivedBrightness = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
  console.log(r, g, b);
  return perceivedBrightness < threshold ? "dark" : "bright";
};
