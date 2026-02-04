import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Menu } from "@/components/menu";
import { Typography } from "@/constants/css/Typography";

const bgImage = require("@/assets/images/home/bg.png");

export default function App() {
  return (
    <View>
      <View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Image contentFit="contain" source={bgImage} style={styles.image} />
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
    aspectRatio: 2.86,
    width: "100%",
  },
  userBox: {
    bottom: "25%",
    left: "10%",
    position: "absolute",
    top: "25%",
  },
  userText: {
    color: "#FFFFFF",
    fontSize: Typography.title,
  },
  userTextBox: {
    flex: 1,
    justifyContent: "center",
  },
});
