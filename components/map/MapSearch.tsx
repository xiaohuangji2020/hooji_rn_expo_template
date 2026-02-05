import { Circle, MapView, Marker } from "expo-gaode-map-navigation";
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
  const [selectedPOIId, setSelectedPOIId] = useState<string | null>(null); // 当前选中的 POI ID
  const [showHighlight, setShowHighlight] = useState(false); // 是否显示高亮圆圈
  const [allPOIMarkers, setAllPOIMarkers] = useState<any[]>([]); // 所有搜索结果的标记点
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
    console.log("Executing search for:", keyword || searchText);
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
        // city: "北京", // 可选:指定搜索城市
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
        setSelectedPOIId(firstPOI.id);
        setShowHighlight(true);

        // 显示搜索结果列表(最多10个)
        const topResults = result.pois.slice(0, 10);
        setSearchResults(topResults);
        setAllPOIMarkers(topResults);
        setShowSuggestions(true);

        Alert.alert("搜索成功", `找到 ${result.total} 个结果\n\n${firstPOI.name}\n${firstPOI.address || "暂无地址信息"}`);
      } else {
        Alert.alert("未找到结果", "请尝试其他关键词");
        setSearchResults([]);
        setAllPOIMarkers([]);
        setShowHighlight(false);
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

    // 更新地图标记和高亮
    setMarkerPosition({
      latitude: poi.location.latitude,
      longitude: poi.location.longitude,
    });
    setMarkerTitle(poi.name);
    setSelectedPOIId(poi.id);
    setShowHighlight(true);
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
          {/* 主要搜索结果标记(带动画) */}
          <Marker growAnimation={true} position={markerPosition} title={markerTitle} />

          {/* 高亮圆圈覆盖物 - 突出显示选中位置 */}
          {showHighlight && <Circle center={markerPosition} fillColor="#4080FF40" radius={300} strokeColor="#FF4080FF" strokeWidth={2} />}

          {/* 其他搜索结果的小标记点 */}
          {allPOIMarkers.map((poi, index) => {
            // 跳过主标记(已经显示)
            if (poi.id === selectedPOIId) {
              return null;
            }

            return (
              <Marker
                key={poi.id || `marker-${index}`}
                position={{
                  latitude: poi.location.latitude,
                  longitude: poi.location.longitude,
                }}
                title={poi.name}
              >
                {/* 自定义小标记样式 - 显示序号 */}
                <View style={styles.smallMarker}>
                  <Text style={styles.smallMarkerText}>{index + 1}</Text>
                </View>
              </Marker>
            );
          })}
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
              data={searchResults.slice(0, 10)} // 只显示前10个建议
              keyExtractor={(item, index) => item.id || `${index}`}
              renderItem={({ item, index }) => {
                const isSelected = item.id === selectedPOIId;
                return (
                  <Pressable onPress={() => handleSelectSuggestion(item)} style={[styles.suggestionItem, isSelected && styles.suggestionItemSelected]}>
                    <View style={styles.suggestionHeader}>
                      {/* 序号标识 */}
                      <View style={[styles.indexBadge, isSelected && styles.indexBadgeSelected]}>
                        <Text style={[styles.indexBadgeText, isSelected && styles.indexBadgeTextSelected]}>{index + 1}</Text>
                      </View>
                      <View style={styles.suggestionContent}>
                        <Text style={[styles.suggestionName, isSelected && styles.suggestionNameSelected]}>{item.name}</Text>
                        {item.address && <Text style={styles.suggestionAddress}>{item.address}</Text>}
                      </View>
                    </View>
                    {/* 选中标识 */}
                    {isSelected && (
                      <View style={styles.selectedIndicator}>
                        <Text style={styles.selectedIndicatorText}>✓</Text>
                      </View>
                    )}
                  </Pressable>
                );
              }}
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
  // 序号徽章
  indexBadge: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    marginRight: 12,
    width: 24,
  },
  indexBadgeSelected: {
    backgroundColor: "#1890ff",
  },
  indexBadgeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
  },
  indexBadgeTextSelected: {
    color: "#fff",
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
    flex: 1, // 地图占据可用空间,键盘弹起时会自动收缩
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
  // 选中指示器
  selectedIndicator: {
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  selectedIndicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
  // 搜索建议样式
  suggestionAddress: {
    color: "#666",
    fontSize: 13,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionHeader: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  suggestionItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  suggestionItemSelected: {
    backgroundColor: "#e6f7ff",
    borderLeftColor: "#1890ff",
    borderLeftWidth: 3,
  },
  suggestionName: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  suggestionNameSelected: {
    color: "#1890ff",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    maxHeight: 300,
  },
  suggestionsList: {
    flexGrow: 0,
  },
});
