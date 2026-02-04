import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";

interface PhotoCameraProps {
  style?: ViewStyle;
  onPhotoTaken?: (uri: string) => void;
}

interface Photo {
  uri: string;
  id: string;
}

export function PhotoCamera({ style, onPhotoTaken }: PhotoCameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />; // 等待权限加载
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>我们需要相机权限来拍照</Text>
        <Button title="授权相机" onPress={requestPermission} />
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
            uri: photo.uri,
            id: Date.now().toString(),
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
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing="back" />
      </View>

      {/* 照片缩略图区域 */}
      {photos.length > 0 && (
        <View style={styles.thumbnailContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailScroll}>
            {photos.map((photo) => (
              <View key={photo.id} style={styles.thumbnailWrapper}>
                <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
                <Pressable style={styles.deleteButton} onPress={() => deletePhoto(photo.id)}>
                  <Text style={styles.deleteButtonText}>×</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* 拍照按钮 */}
      <View style={styles.buttonContainer}>
        <Pressable style={({ pressed }) => [styles.captureButton, pressed && styles.captureButtonPressed]} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  thumbnailContainer: {
    height: 120,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 10,
  },
  thumbnailScroll: {
    paddingHorizontal: 10,
    gap: 10,
  },
  thumbnailWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  buttonContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  captureButtonPressed: {
    backgroundColor: "#e0e0e0",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});

