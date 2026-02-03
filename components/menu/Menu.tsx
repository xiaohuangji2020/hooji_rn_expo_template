import { Typography } from "@/constants/css/Typography";
import { MENU_CONFIG } from "@/constants/menu/menu";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Menu({ columns = 4 }: { columns?: number }) {
  const menuList = Object.values(MENU_CONFIG);
  return (
    <View style={styles.imageContainer}>
      {menuList.map((menuItem, index) => (
        <Link href="/scan" key={index} asChild style={[styles.imageBox, { width: columns === 4 ? "25%" : "33%" }]}>
          <Pressable>
            <Image source={menuItem.image} style={styles.image} contentFit="contain" />
            <Text style={styles.text}>{menuItem.text}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "25%",
    aspectRatio: 1.2,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    width: "35%",
  },
  text: {
    fontSize: Typography.info,
  },
});
