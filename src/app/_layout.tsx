import "../global.css";
import { Stack, router } from "expo-router";

// Convex provider and client

import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { Env } from "@env";
import { useEffect } from "react";
import { getData } from "@/storageUtils";

const convex = new ConvexReactClient(Env.CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function Layout() {
  useEffect(() => {
    // Check if user is logged in
    checkUserLoggedIn();

    async function checkUserLoggedIn() {
      const user = (await getData("@enet-store/user", true)) as Record<
        string,
        any
      >;
      if (user) {
        router.replace({ pathname: "/(main)/dashboard", params: { ...user } });
      }
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <Stack
        initialRouteName="/(onboarding)/"
        // initialRouteName="tasks"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="tasks" options={{ headerShown: false }} /> */}
      </Stack>
    </ConvexProvider>
  );
}
