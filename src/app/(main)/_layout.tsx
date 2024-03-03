import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Stack screenOptions={{}}>
          <Stack.Screen options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style="dark" translucent hideTransitionAnimation="slide" />
    </SafeAreaProvider>
  );
}
