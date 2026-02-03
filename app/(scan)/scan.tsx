import { Camera } from "@/components/camera";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export function ScanScreen() {
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
        <Camera onBarcodeScanned={handleBarcodeScanned} paused={isPaused} style={styles.camera} />
      </View>

      {/* 扫描结果显示区域 */}
      <View style={styles.resultContainer}>
        {scannedData ? (
          <View style={styles.resultContent}>
            <Text style={styles.resultTitle}>扫描结果：</Text>
            <Text style={styles.resultType}>类型: {scannedData.type}</Text>
            <Text style={styles.resultData} numberOfLines={3} ellipsizeMode="tail">
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
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, !scannedData && styles.buttonDisabled]}
          onPress={handleRescan}
          disabled={!scannedData}
        >
          <Text style={[styles.buttonText, !scannedData && styles.buttonTextDisabled]}>重新扫描</Text>
        </Pressable>
      </View>
    </View>
  );
}

// 使用默认导出以符合 Expo Router 的要求
export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cameraContainer: {
    flex: 7, // 占据大部分屏幕
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  resultContent: {
    gap: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  resultType: {
    fontSize: 14,
    color: "#666",
  },
  resultData: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,
  },
  waitingText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#0056b3",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: "#999",
  },
});