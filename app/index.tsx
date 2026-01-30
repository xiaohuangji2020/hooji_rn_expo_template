import { Menu } from "@/components/menu";
import { Typography } from "@/constants/css/Typography";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const bgImage = require("@/assets/images/home/bg.png");

export default function App() {
  return (
    <View>
      <View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Image source={bgImage} style={styles.image} contentFit="contain" />
        </View>
        <View style={styles.userBox}>
          <View style={styles.userTextBox}>
            <Text style={styles.userText}>您好，伍六七</Text>
          </View>
          <View style={styles.userTextBox}>
            <Text style={styles.userText}>顺立通欢迎您</Text>
          </View>
        </View>
      </View>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 2.86,
  },
  userBox: {
    position: "absolute",
    top: "25%",
    bottom: "25%",
    left: "10%",
  },
  userTextBox: {
    flex: 1,
    justifyContent: "center",
  },
  userText: {
    color: "#FFFFFF",
    fontSize: Typography.title,
  },
});
