

import { ExpoGaodeMapModule, MapView, Marker } from 'expo-gaode-map-navigation';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Map () { 

  useEffect(() => {
    // 如果需要开启世界地图（海外地图）
    // 必须在 initSDK 之前调用
    // 世界地图为高级服务，需要开通相关权限：
    // 1.注册成为高德开放平台开发者，并申请 注册 key
    // 2.通过 工单 联系商务开通
    // ExpoGaodeMapModule.setLoadWorldVectorMap(true);

    // 初始化 SDK （仅需要 Web API Key 调用，默认会加载 Android 和 iOS 端的 API Key）
    ExpoGaodeMapModule.initSDK({
      webKey: '71c1e8719029002e2074409fff0e9fd2', // 使用 Web API 服务时需要
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialCameraPosition={{
          target: { latitude: 39.909186, longitude: 116.397411 },
          zoom: 15,
        }}
      >
        <Marker
          position={{ latitude: 39.909186, longitude: 116.397411 }}
          title="天安门"
        />
      </MapView>
    </View>
  );
}
