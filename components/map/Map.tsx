import { MapView, Marker } from "expo-gaode-map-navigation";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * 地图位置信息
 */
export interface MapLocation {
  address?: string;
  id?: string;
  latitude: number;
  longitude: number;
  name: string;
}

/**
 * Map 组件属性
 */
interface MapProps {
  /** 所有搜索结果的位置列表（必填） */
  allLocations: MapLocation[];
  /** 初始缩放级别，默认 15 */
  initialZoom?: number;
  /** 当前选中的位置 ID（选中的显示高亮 Marker，其他显示序号） */
  selectedId: string | null;
}

/**
 * 地图组件
 *
 * 功能：
 * - 显示所有搜索结果位置
 * - 选中的位置显示高亮 Marker（带动画）
 * - 未选中的位置显示序号小圆圈
 * - 列表序号始终保持不变
 */
export function Map({ allLocations, initialZoom = 15, selectedId }: MapProps) {
  const mapRef = useRef(null);

  // 计算地图中心点（使用选中位置或第一个位置）
  const centerLocation = allLocations.find((loc) => loc.id === selectedId) || allLocations[0];

  return (
    <View style={styles.container}>
      <MapView
        initialCameraPosition={{
          target: {
            latitude: centerLocation.latitude,
            longitude: centerLocation.longitude,
          },
          zoom: initialZoom,
        }}
        ref={mapRef}
        style={styles.map}
      >
        {/* 遍历所有位置，根据选中状态显示不同的标记 */}
        {allLocations.map((poi, index) => {
          const isSelected = poi.id === selectedId;

          if (isSelected) {
            // 选中的位置 - 显示特殊的高亮 Marker（带动画）
            return (
              <Marker
                key={poi.id || `marker-${index}`}
                growAnimation={true}
                position={{
                  latitude: poi.latitude,
                  longitude: poi.longitude,
                }}
                title={poi.name}
              />
            );
          } else {
            // 未选中的位置 - 显示序号小圆圈
            return (
              <Marker
                key={poi.id || `marker-${index}`}
                position={{
                  latitude: poi.latitude,
                  longitude: poi.longitude,
                }}
                title={poi.name}
              >
                {/* 自定义小标记样式 - 显示序号（序号保持不变） */}
                <View style={styles.smallMarker}>
                  <Text style={styles.smallMarkerText}>{index + 1}</Text>
                </View>
              </Marker>
            );
          }
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  // 地图上的小标记样式
  smallMarker: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#1890ff",
    borderRadius: 15,
    borderWidth: 2,
    elevation: 3,
    height: 30,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    width: 30,
  },
  smallMarkerText: {
    color: "#1890ff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
