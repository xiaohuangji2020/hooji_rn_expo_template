import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375; // 以 375 (iPhone 13/14) 为基准

// 响应式缩放函数
const normalize = (size: number) => {
  const newSize = size * scale;
  const res = Math.round(PixelRatio.roundToNearestPixel(newSize));
  console.log(res);
  return res;
};

// 具名导出字体配置
export const Typography = {
  header: normalize(24),
  title: normalize(20),
  body: normalize(16),
  info: normalize(14),
  caption: normalize(12),
};
