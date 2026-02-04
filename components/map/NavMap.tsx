import { NaviView, type NaviViewRef } from "expo-gaode-map-navigation";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";

export default function NavigationScreen() {
  const naviRef = useRef<NaviViewRef>(null);

  useEffect(() => {
    // 延迟 1 秒后开始导航
    const timer = setTimeout(() => {
      if (naviRef.current) {
        naviRef.current.startNavigation(
          { latitude: 39.909186, longitude: 116.397411 }, // 起点
          { latitude: 39.99, longitude: 116.47 }, // 终点
          0, // 0: GPS导航, 1: 模拟导航
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NaviView
        enableVoice={true} // 开启语音
        ref={naviRef}
        showCamera={true} // 显示摄像头
        style={{ flex: 1 }}
      />
    </View>
  );
}
