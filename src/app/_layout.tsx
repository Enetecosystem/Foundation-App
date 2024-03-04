import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      initialRouteName="/(onboarding)/"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='(onboarding)' options={{ headerShown: false }} />
    </Stack>
  );
}
