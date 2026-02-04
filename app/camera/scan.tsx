import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ScanCamera } from "@/components/camera";

export default function ScanScreen() {
  const [scannedData, setScannedData] = useState<{ type: string; data: string } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleBarcodeScanned = (result: { type: string; data: string }) => {
    // 调试信息：查看扫描到的条形码类型和内容
    console.log("🔍 扫描成功！");
    console.log("📋 类型:", result.type);
    console.log("📝 内容:", result.data);
    console.log("---");

    setScannedData(result);
    setIsPaused(true);
  };

  const handleRescan = () => {
    setScannedData(null);
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      {/* 相机区域 - 占据大半部分屏幕 */}
      <View style={styles.cameraContainer}>
        <ScanCamera onBarcodeScanned={handleBarcodeScanned} paused={isPaused} style={styles.camera} />
      </View>

      {/* 扫描结果显示区域 */}
      <View style={styles.resultContainer}>
        {scannedData ? (
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>扫描结果：</Text>
            <Text style={styles.resultType}>类型: {scannedData.type}</Text>
            <Text ellipsizeMode="tail" numberOfLines={3} style={styles.resultData}>
              内容: {scannedData.data}
            </Text>
          </View>
        ) : (
          <Text style={styles.waitingText}>请对准二维码或条形码进行扫描</Text>
        )}
      </View>

      {/* 重新扫描按钮 */}
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={!scannedData}
          onPress={handleRescan}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, !scannedData && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, !scannedData && styles.buttonTextDisabled]}>重新扫描</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 16,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonPressed: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: "#999",
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    backgroundColor: "#000",
    flex: 7, // 占据大部分屏幕
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  resultContainer: {
    backgroundColor: "#f5f5f5",
    flex: 2,
    justifyContent: "center",
    padding: 20,
  },
  resultContent: {
    gap: 8,
  },
  resultData: {
    color: "#000",
    fontSize: 16,
    marginTop: 4,
  },
  resultTitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultType: {
    color: "#666",
    fontSize: 14,
  },
  waitingText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
});
