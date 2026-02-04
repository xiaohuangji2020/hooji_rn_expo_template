import Ionicons from "@expo/vector-icons/Ionicons";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Pressable } from "react-native";

import { DrawerMenu } from "@/components/menu/DrawerMenu";
import { Typography } from "@/constants/css/Typography";

export default function RootLayout() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff", // 修改这个值，所有页面的默认底色都会变
    },
  };
  return (
    <ThemeProvider value={MyTheme}>
      <Drawer
        drawerContent={() => <DrawerMenu />}
        screenOptions={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log("Menu button right pressed");
              }}
            >
              <Ionicons name="notifications-outline" size={24} style={{ marginRight: 15 }} />
            </Pressable>
          ),
          headerStyle: {},
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: Typography.title },
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "顺立通",
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
