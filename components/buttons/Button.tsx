import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
};

export default function Button({ label, theme }: Props) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderColor: "#ffd33d", borderRadius: 18, borderWidth: 4 }]}>
        <Pressable onPress={() => alert("You pressed a button.")} style={[styles.button, { backgroundColor: "#fff" }]}>
          <FontAwesome color="#25292e" name="picture-o" size={18} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={() => alert("You pressed a button.")} style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    height: 68,
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 3,
    width: 320,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
