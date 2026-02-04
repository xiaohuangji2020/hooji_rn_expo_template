import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Button, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CameraProps {
  onBarcodeScanned?: (data: { type: string; data: string }) => void;
  paused?: boolean;
  style?: ViewStyle;
}

export function ScanCamera({ onBarcodeScanned, paused = false, style }: CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />; // 等待权限加载
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>我们需要相机权限来扫码</Text>
        <Button onPress={requestPermission} title="授权相机" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "aztec", "ean13", "ean8", "code39", "code93", "code128", "upc_e", "upc_a", "itf14", "codabar", "datamatrix"], // 支持所有常见的条形码和二维码类型
        }}
        onBarcodeScanned={paused ? undefined : onBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  permissionText: { fontSize: 16, marginBottom: 16, textAlign: "center" },
});
