import { Color } from "@/constants/css/Color";
import { Typography } from "@/constants/css/Typography";
import Fontisto from "@expo/vector-icons/Fontisto";
import { StyleSheet, Text, View } from "react-native";
import { Menu } from "./Menu";

export function DrawerMenu() {
  return (
    <View>
      <View style={styles.userBox}>
        <Text style={styles.userName}>伍六七</Text>
        <Fontisto name="email" size={24} style={{ marginRight: 15 }} />
      </View>
      <Text style={styles.userPhone}>14012345678</Text>
      <Menu columns={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 35,
    paddingRight: 28,
    marginTop: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: Typography.title,
  },
  userPhone: {
    fontSize: Typography.caption,
    color: Color.info,
    paddingLeft: 35,
    paddingBottom: 20,
  },
});
