import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SplashScreen() {
  const { order } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Text>Splash page</Text>
      <Text>Splash page ${order}</Text>
      <Text>Splash page</Text>
    </View>
  );
}
