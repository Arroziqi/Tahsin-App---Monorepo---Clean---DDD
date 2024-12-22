import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Ahmad Arroziqi!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href={"/sign-in"}>Signin</Link>
      <Link href={"/sign-up"}>Signup</Link>
      <Link href={"/splash/1"}>Splash 1</Link>
      <Link href={"/splash/2"}>Splash 2</Link>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
