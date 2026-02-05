import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Typography } from "@/constants/css/Typography";
import { MENU_CONFIG } from "@/constants/menu/menu";

interface MenuProps {
  columns?: number;
  showHome?: boolean;
}

export function Menu({ columns = 4, showHome = false }: MenuProps) {
  const menuList = Object.entries(MENU_CONFIG)
    .filter(([key]) => showHome || key !== "home")
    .map(([, value]) => value);

  return (
    <View style={styles.imageContainer}>
      {menuList.map((menuItem, index) => (
        <Link asChild href={menuItem.link} key={index} style={[styles.imageBox, { width: columns === 4 ? "25%" : "33%" }]}>
          <Pressable>
            <Image contentFit="contain" source={menuItem.image} style={styles.image} />
            <Text style={styles.text}>{menuItem.text}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "35%",
  },
  imageBox: {
    alignItems: "center",
    aspectRatio: 1.2,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    width: "25%",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontSize: Typography.info,
  },
});
