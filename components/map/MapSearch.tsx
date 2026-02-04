import { MapView, Marker } from "expo-gaode-map-navigation";
import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

interface SearchResult {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

export function MapSearch() {
  const [searchText, setSearchText] = useState("");
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 39.909186,
    longitude: 116.397411,
  });
  const [markerTitle, setMarkerTitle] = useState("天安门");
  const mapRef = useRef(null);

  // 模拟地址搜索（实际项目中应该调用高德地图 POI 搜索 API）
  const handleSearch = async () => {
    if (!searchText.trim()) {
      Alert.alert("提示", "请输入搜索地址");
      return;
    }

    try {
      // TODO: 集成高德地图 POI 搜索 API
      // 这里是模拟数据，实际开发中需要调用 expo-gaode-map-navigation 的搜索功能
      // 或者使用高德 Web Service API

      // 示例：简单的关键词匹配
      const mockSearchResults: Record<string, SearchResult> = {
        天安门: { latitude: 39.909186, longitude: 116.397411, name: "天安门", address: "北京市东城区天安门广场" },
        故宫: { latitude: 39.916345, longitude: 116.397155, name: "故宫博物院", address: "北京市东城区景山前街4号" },
        鸟巢: { latitude: 39.992889, longitude: 116.397528, name: "国家体育场（鸟巢）", address: "北京市朝阳区国家体育场南路1号" },
        上海东方明珠: { latitude: 31.239889, longitude: 121.499763, name: "东方明珠", address: "上海市浦东新区世纪大道1号" },
        广州塔: { latitude: 23.105925, longitude: 113.319233, name: "广州塔", address: "广东省广州市海珠区阅江西路222号" },
      };

      // 简单的模糊匹配
      const foundKey = Object.keys(mockSearchResults).find((key) => searchText.includes(key) || key.includes(searchText));

      if (foundKey) {
        const result = mockSearchResults[foundKey];
        setMarkerPosition({
          latitude: result.latitude,
          longitude: result.longitude,
        });
        setMarkerTitle(result.name);
        Alert.alert("搜索成功", `已找到：${result.name}\n${result.address}`);
      } else {
        Alert.alert("未找到结果", "请尝试搜索：天安门、故宫、鸟巢、上海东方明珠、广州塔等");
      }
    } catch (error) {
      Alert.alert("搜索失败", "请稍后重试");
      console.error("搜索错误:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 地图区域 - 占屏幕大半部分 */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialCameraPosition={{
            target: markerPosition,
            zoom: 15,
          }}
        >
          <Marker position={markerPosition} title={markerTitle} />
        </MapView>
      </View>

      {/* 搜索栏区域 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="请输入地址或地点名称"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>搜索</Text>
          </TouchableOpacity>
        </View>

        {/* 提示信息 */}
        <Text style={styles.hint}>试试搜索：天安门、故宫、鸟巢、上海东方明珠、广州塔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    minHeight: "65%", // 地图占屏幕大半部分
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  searchButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: "#1890ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
