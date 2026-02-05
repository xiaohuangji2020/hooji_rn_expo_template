import Fontisto from "@expo/vector-icons/Fontisto";
import { StyleSheet, Text, View } from "react-native";

import { Color } from "@/constants/css/Color";
import { Typography } from "@/constants/css/Typography";

import { Menu } from "./Menu";

export function DrawerMenu() {
  return (
    <View>
      <View style={styles.userBox}>
        <Text style={styles.userName}>伍六七</Text>
        <Fontisto name="email" size={24} style={{ marginRight: 15 }} />
      </View>
      <Text style={styles.userPhone}>14012345678</Text>
      <Menu columns={3} showHome={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  userBox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 50,
    paddingLeft: 35,
    paddingRight: 28,
  },
  userName: {
    fontSize: Typography.title,
  },
  userPhone: {
    color: Color.info,
    fontSize: Typography.caption,
    paddingBottom: 20,
    paddingLeft: 35,
  },
});
