import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{}}>
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="history" options={{ headerShown: false }} />
          <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
          <Stack.Screen name="earn" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="dark" translucent hideTransitionAnimation="fade" />
    </SafeAreaProvider>
  );
}
