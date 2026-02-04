import { PhotoCamera } from "@/components/camera";
import { StyleSheet, View } from "react-native";

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
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
});
