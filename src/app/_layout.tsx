import "../global.css";
import { Stack, router } from "expo-router";
import * as Updates from "expo-updates";

// Convex provider and client

import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import { Env } from "@env";
import { useEffect } from "react";
import { getData } from "@/storageUtils";
import { Alert } from "react-native";

const convex = new ConvexReactClient(Env.CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function Layout() {
  useEffect(() => {
    // Check if user is logged in
    onFetchUpdateAsync();

    async function checkUserLoggedIn() {
      const user = (await getData("@enet-store/user", true)) as Record<
        string,
        any
      >;
      if (user) {
        router.replace({ pathname: "/(main)/dashboard", params: { ...user } });
      }
    }

    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
        Alert.alert("Updating app", "Wait for latest update to be fetched...");
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        } else {
          await checkUserLoggedIn();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        Alert.alert("Update error", `Error fetching latest update: ${error}`, [
          {
            text: "Continue to app",
            async onPress() {
              await checkUserLoggedIn();
            },
          },
        ]);
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
