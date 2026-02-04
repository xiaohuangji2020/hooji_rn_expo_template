import { StyleSheet, View } from "react-native";

import { PhotoCamera } from "@/components/camera";

export default function PhotoScreen() {
  const handlePhotoTaken = (uri: string) => {
    console.log("📸 照片已拍摄！");
    console.log("📁 路径:", uri);
    console.log("---");
  };

  return (
    <View style={styles.container}>
      <PhotoCamera onPhotoTaken={handlePhotoTaken} style={styles.camera} />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
});
