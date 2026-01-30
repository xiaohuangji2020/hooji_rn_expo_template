import { Typography } from "@/constants/css/Typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

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
      <Stack
        screenOptions={{
          headerStyle: {},
          headerTitleStyle: { fontSize: Typography.title },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                console.log("Menu button pressed");
              }}
            >
              <Ionicons name="close-circle-outline" size={24} color="black" style={{ marginLeft: 10 }} />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: "顺立通" }} />
      </Stack>
    </ThemeProvider>
  );
}
