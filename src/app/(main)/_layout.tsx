import { Stack } from "expo-router";
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
    </SafeAreaProvider>
  );
}
