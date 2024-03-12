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
    ],
    [
      "expo-font",
      {
        "fonts": ["./assets/fonts/Nunito_Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf", "./assets/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf", "./assets/fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf"]
      }
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
