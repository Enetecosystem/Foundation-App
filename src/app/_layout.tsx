import "../global.css";
import { Stack } from "expo-router";

// Convex provider and client

import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { Env } from "@env";

const convex = new ConvexReactClient(Env.CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function Layout() {
  return (
    <ConvexProvider client={convex}>
      <Stack
        // initialRouteName="/(onboarding)/"
        // initialRouteName="tasks"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="tasks" options={{ headerShown: false }} /> */}
      </Stack>
    </ConvexProvider>
  );
}
