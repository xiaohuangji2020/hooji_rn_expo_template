import { MapView, Marker } from "expo-gaode-map-navigation";
import { getInputTips, type InputTipsResult, type SearchResult as POISearchResult, searchPOI } from "expo-gaode-map-search";
import React, { useRef, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function MapSearch() {
  const [searchText, setSearchText] = useState("");
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 39.909186,
    longitude: 116.397411,
  });
  const [markerTitle, setMarkerTitle] = useState("天安门");
  const [searchResults, setSearchResults] = useState<any[]>([]); // 兼容 InputTips 和 POI 类型
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);

  // 输入提示 - 实时获取搜索建议
  const handleInputChange = async (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      setShowSuggestions(false);
      setSearchResults([]);
      return;
    }

    try {
      // 调用高德地图输入提示 API
      const result: InputTipsResult = await getInputTips({
        city: "全国", // 可以改为具体城市，如 "北京"
        keyword: text,
      });

      if (result.tips && result.tips.length > 0) {
        setSearchResults(result.tips);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("获取输入提示失败:", error);
      setShowSuggestions(false);
    }
  };

  // 执行搜索 - 调用真实的高德地图 POI 搜索 API
  const handleSearch = async (keyword?: string) => {
    const searchKeyword = keyword || searchText;

    if (!searchKeyword.trim()) {
      Alert.alert("提示", "请输入搜索地址");
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      // 调用高德地图 POI 搜索 API
      const result: POISearchResult = await searchPOI({
        keyword: searchKeyword,
        // city: "北京", // 可选：指定搜索城市
        pageNum: 1, // 页码
        pageSize: 20, // 每页结果数
      });

      if (result.pois && result.pois.length > 0) {
        const firstPOI = result.pois[0];

        // 更新地图标记位置
        setMarkerPosition({
          latitude: firstPOI.location.latitude,
          longitude: firstPOI.location.longitude,
        });
        setMarkerTitle(firstPOI.name);

        // 显示搜索结果列表
        setSearchResults(result.pois);
        setShowSuggestions(true);

        Alert.alert("搜索成功", `找到 ${result.total} 个结果\n\n${firstPOI.name}\n${firstPOI.address || "暂无地址信息"}`);
      } else {
        Alert.alert("未找到结果", "请尝试其他关键词");
        setSearchResults([]);
      }
    } catch (error) {
      Alert.alert("搜索失败", "请检查网络连接或稍后重试");
      console.error("POI 搜索错误:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // 选择搜索建议项
  const handleSelectSuggestion = (poi: any) => {
    setSearchText(poi.name);
    setShowSuggestions(false);

    // 更新地图标记
    setMarkerPosition({
      latitude: poi.location.latitude,
      longitude: poi.location.longitude,
    });
    setMarkerTitle(poi.name);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={90} style={styles.container}>
      {/* 地图区域 - 占屏幕大半部分 */}
      <View style={styles.mapContainer}>
        <MapView
          initialCameraPosition={{
            target: markerPosition,
            zoom: 15,
          }}
          ref={mapRef}
          style={styles.map}
        >
          <Marker position={markerPosition} title={markerTitle} />
        </MapView>
      </View>

      {/* 搜索栏区域 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={handleInputChange}
            onSubmitEditing={() => handleSearch()}
            placeholder="请输入地址或地点名称"
            returnKeyType="search"
            style={styles.input}
            value={searchText}
          />
          <TouchableOpacity disabled={isSearching} onPress={() => handleSearch()} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>{isSearching ? "搜索中..." : "搜索"}</Text>
          </TouchableOpacity>
        </View>

        {/* 搜索建议列表 */}
        {showSuggestions && searchResults.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={searchResults.slice(0, 5)} // 只显示前5个建议
              keyExtractor={(item, index) => item.id || `${index}`}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectSuggestion(item)} style={styles.suggestionItem}>
                  <Text style={styles.suggestionName}>{item.name}</Text>
                  {item.address && <Text style={styles.suggestionAddress}>{item.address}</Text>}
                </Pressable>
              )}
              style={styles.suggestionsList}
            />
          </View>
        )}

        {/* 提示信息 */}
        <Text style={styles.hint}>支持搜索全国各地的地点、商家、景点等</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  hint: {
    color: "#999",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderColor: "#d0d0d0",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 16,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1, // 地图占据可用空间，键盘弹起时会自动收缩
  },
  searchBar: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    elevation: 5,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: -2,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // 新增：搜索建议样式
  suggestionAddress: {
    color: "#666",
    fontSize: 13,
  },
  suggestionItem: {
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    padding: 12,
  },
  suggestionName: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    maxHeight: 200,
  },
  suggestionsList: {
    flexGrow: 0,
  },
});
