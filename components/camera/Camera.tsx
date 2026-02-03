import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />; // 等待权限加载
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>我们需要相机权限来扫码</Text>
        <Button title="授权相机" onPress={requestPermission} />
      </View>
    );
  }

  // 扫码后的回调函数
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    alert(`扫描成功！类型: ${type}, 内容: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "ean13"], // 指定扫码类型，提高识别速度
        }}
      />
      {scanned && <Button title={"再次扫描"} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
