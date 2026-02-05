import { NaviView, type NaviViewRef } from "expo-gaode-map-navigation";
import { getInputTips, type InputTipsResult } from "expo-gaode-map-search";
import React, { useRef, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Location {
  latitude: number;
  longitude: number;
}

interface SearchTip {
  address?: string;
  id: string;
  location: Location;
  name: string;
}

type InputField = "start" | "end";

export function MapNavigation() {
  const naviRef = useRef<NaviViewRef>(null);

  // 起点和终点状态
  const [startText, setStartText] = useState("当前位置");
  const [endText, setEndText] = useState("");
  const [startLocation, setStartLocation] = useState<Location | null>(null); // null 表示使用当前位置
  const [endLocation, setEndLocation] = useState<Location | null>(null);

  // 搜索建议状态
  const [searchResults, setSearchResults] = useState<SearchTip[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInput, setActiveInput] = useState<InputField | null>(null);

  // 导航状态
  const [isNavigating, setIsNavigating] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // 输入提示 - 实时获取搜索建议
  const handleInputChange = async (text: string, field: InputField) => {
    if (field === "start") {
      setStartText(text);
    } else {
      setEndText(text);
    }

    setActiveInput(field);

    if (!text.trim() || text === "当前位置") {
      setShowSuggestions(false);
      setSearchResults([]);
      return;
    }

    try {
      const result: InputTipsResult = await getInputTips({
        city: "全国",
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

  // 选择搜索建议
  const handleSelectSuggestion = (poi: SearchTip) => {
    if (activeInput === "start") {
      setStartText(poi.name);
      setStartLocation(poi.location);
    } else if (activeInput === "end") {
      setEndText(poi.name);
      setEndLocation(poi.location);
    }

    setShowSuggestions(false);
    setActiveInput(null);
  };

  // 开始导航
  const handleStartNavigation = async () => {
    if (!endText.trim() || !endLocation) {
      Alert.alert("提示", "请选择终点位置");
      return;
    }

    setIsStarting(true);

    try {
      // 启动导航
      // startLocation 为 null 表示使用当前位置作为起点
      await naviRef.current?.startNavigation(
        startLocation, // 起点（null 表示使用当前位置）
        endLocation, // 终点
        1, // 0: GPS导航, 1: 模拟导航（开发时建议用模拟）
      );

      setIsNavigating(true);
      setShowSuggestions(false);
    } catch (error) {
      console.error("启动导航失败:", error);
      Alert.alert("导航失败", "无法启动导航，请稍后重试");
    } finally {
      setIsStarting(false);
    }
  };

  // 重置起点为当前位置
  const handleResetStart = () => {
    setStartText("当前位置");
    setStartLocation(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={90} style={styles.container}>
      {/* 导航地图区域 - 占屏幕大半部分 */}
      <View style={styles.mapContainer}>
        <NaviView
          enableVoice={true} // 开启语音
          onArrive={() => {
            Alert.alert("提示", "已到达目的地");
            setIsNavigating(false);
          }}
          onNaviEnd={() => {
            setIsNavigating(false);
          }}
          onNaviInfoUpdate={(e) => {
            const { pathRetainDistance, pathRetainTime } = e.nativeEvent;
            console.log(`剩余距离: ${pathRetainDistance}米, 剩余时间: ${pathRetainTime}秒`);
          }}
          onNaviStart={() => {
            console.log("导航已开始");
          }}
          ref={naviRef}
          showCamera={true} // 显示摄像头
          style={styles.map}
          trafficLayerEnabled={true} // 显示路况
        />

        {/* 导航中状态提示 */}
        {isNavigating && (
          <View style={styles.navigationOverlay}>
            <Text style={styles.navigationText}>导航中...</Text>
          </View>
        )}
      </View>

      {/* 输入区域 */}
      <View style={styles.inputContainer}>
        {/* 起点输入 */}
        <View style={styles.inputRow}>
          <View style={styles.dotStart} />
          <TextInput
            onChangeText={(text) => handleInputChange(text, "start")}
            onFocus={() => setActiveInput("start")}
            placeholder="请输入起点（默认为当前位置）"
            returnKeyType="next"
            style={styles.input}
            value={startText}
          />
          {startText !== "当前位置" && (
            <TouchableOpacity onPress={handleResetStart} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>重置</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 终点输入 */}
        <View style={styles.inputRow}>
          <View style={styles.dotEnd} />
          <TextInput
            onChangeText={(text) => handleInputChange(text, "end")}
            onFocus={() => setActiveInput("end")}
            onSubmitEditing={handleStartNavigation}
            placeholder="请输入终点位置"
            returnKeyType="go"
            style={styles.input}
            value={endText}
          />
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

        {/* 开始导航按钮 */}
        <TouchableOpacity
          disabled={isStarting || !endLocation || isNavigating}
          onPress={handleStartNavigation}
          style={[styles.startButton, (isStarting || !endLocation || isNavigating) && styles.startButtonDisabled]}
        >
          <Text style={styles.startButtonText}>{isStarting ? "准备中..." : isNavigating ? "导航中" : "开始导航"}</Text>
        </TouchableOpacity>

        {/* 提示信息 */}
        <Text style={styles.hint}>支持全国范围内的地点搜索和导航</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  dotEnd: {
    backgroundColor: "#f5222d",
    borderRadius: 6,
    height: 12,
    marginLeft: 4,
    marginRight: 12,
    width: 12,
  },
  dotStart: {
    backgroundColor: "#52c41a",
    borderRadius: 6,
    height: 12,
    marginLeft: 4,
    marginRight: 12,
    width: 12,
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
    fontSize: 15,
    height: 44,
    paddingHorizontal: 12,
  },
  inputContainer: {
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
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  navigationOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    left: 16,
    padding: 12,
    position: "absolute",
    top: 16,
  },
  navigationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: "#1890ff",
    fontSize: 14,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#1890ff",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    marginTop: 12,
  },
  startButtonDisabled: {
    backgroundColor: "#d9d9d9",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
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
    marginBottom: 12,
    maxHeight: 200,
  },
  suggestionsList: {
    flexGrow: 0,
  },
});
