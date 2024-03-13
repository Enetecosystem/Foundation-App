import type { ConfigContext, ExpoConfig } from "@expo/config";

import { ClientEnv, Env } from "./env";

export default ({ config }: ConfigContext): ExpoConfig => ({
  // "expo": {
  ...config,
  scheme: "acme",
  userInterfaceStyle: "automatic",
  orientation: "portrait",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F5F5F5",
  },
  web: {
    output: "static",
    bundler: "metro",
  },
  plugins: [
    [
      "expo-router",
      {
        origin: "https://n",
      },
    ]
  ],
  name: "enet_miner",
  slug: "enet-miner",
  extra: {
    ...ClientEnv,
    router: {
      origin: "https://n",
    },
    eas: {
      projectId: "8852539f-a61b-4ce3-90d9-52c939c8f2c3",
    },
  },
  owner: "fullsnack_mimi",
  android: {
    package: "com.enetminer.enet",
  },
  ios: {
    bundleIdentifier: Env.BUNDLE_ID,
    supportsTablet: false,
  },
  // }
});
