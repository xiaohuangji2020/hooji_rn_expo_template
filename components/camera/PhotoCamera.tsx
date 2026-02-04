import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";

interface PhotoCameraProps {
  onPhotoTaken?: (uri: string) => void;
  style?: ViewStyle;
}

interface Photo {
  id: string;
  uri: string;
}

export function PhotoCamera({ onPhotoTaken, style }: PhotoCameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />; // 等待权限加载
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>我们需要相机权限来拍照</Text>
        <Button onPress={requestPermission} title="授权相机" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        if (photo) {
          const newPhoto: Photo = {
            id: Date.now().toString(),
            uri: photo.uri,
          };
          setPhotos((prev) => [...prev, newPhoto]);
          onPhotoTaken?.(photo.uri);
        }
      } catch (error) {
        console.error("拍照失败:", error);
      }
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <View style={[styles.container, style]}>
      {/* 相机视图 */}
      <View style={styles.cameraContainer}>
        <CameraView facing="back" ref={cameraRef} style={StyleSheet.absoluteFillObject} />
      </View>

      {/* 照片缩略图区域 */}
      {photos.length > 0 && (
        <View style={styles.thumbnailContainer}>
          <ScrollView contentContainerStyle={styles.thumbnailScroll} horizontal showsHorizontalScrollIndicator={false}>
            {photos.map((photo) => (
              <View key={photo.id} style={styles.thumbnailWrapper}>
                <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
                <Pressable onPress={() => deletePhoto(photo.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>×</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 拍照按钮 */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={takePicture} style={({ pressed }) => [styles.captureButton, pressed && styles.captureButtonPressed]}>
          <View style={styles.captureButtonInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: 100,
    justifyContent: "center",
  },
  cameraContainer: {
    backgroundColor: "#000",
    flex: 1,
  },
  captureButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 35,
    borderWidth: 4,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
  captureButtonInner: {
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  captureButtonPressed: {
    backgroundColor: "#e0e0e0",
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    position: "absolute",
    right: 4,
    top: 4,
    width: 24,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  thumbnail: {
    height: "100%",
    width: "100%",
  },
  thumbnailContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: 120,
    paddingVertical: 10,
  },
  thumbnailScroll: {
    gap: 10,
    paddingHorizontal: 10,
  },
  thumbnailWrapper: {
    borderRadius: 8,
    height: 100,
    overflow: "hidden",
    position: "relative",
    width: 100,
  },
});
