import { Stack } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "@/components/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";

export default function LeaderboardPage() {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="min-h-screen w-full bg-[#F5F5F5]">
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => <Header top={top} title="Leaderboard" />,
              }}
            />


            <View className="flex w-full flex-col py-4">
              <View className="flex w-full flex-col px-[20px]">
                <View className="flex w-full flex-row items-center justify-center gap-4 rounded-xl bg-[#EBEBEB] p-1">
                  <View className="h-16 w-16 items-center justify-center rounded-lg bg-[#FFFFFF]/20">
                    <Text className="text-4xl">👍</Text>
                  </View>
                  <Text className="flex-1 text-wrap text-lg text-black/60">
                    You are doing better than 80% of others
                  </Text>
                </View>
              </View>
              <View className="my-3" />
              <View className="flex w-full flex-col gap-4 pr-[20px]">
                <View className="flex flex-row items-center justify-between gap-2">
                  <View className="flex h-20 w-3/4 flex-row items-center justify-between rounded-r-[30px] bg-[#15BDCF] p-2">
                    <View className="flex flex-row items-center justify-center gap-2">
                      <Text className="text-xl font-medium text-white">1</Text>
                      <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      />
                      <Text className="ml-4 text-xl font-normal text-black">
                        100,000
                      </Text>
                    </View>

                    <View className="h-16 w-16 items-center justify-center rounded-full bg-white">
                      <Image
                        source={require("../../../assets/main/avatar.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                  <View className="flex flex-1 flex-col">
                    <Text className="text-sm font-medium">Amazinglanky</Text>
                    <Text className="text-xs font-normal">111,000,002 Xp</Text>
                  </View>
                </View>

                {/* 2 place */}
                <View className="flex flex-row items-center justify-between gap-2">
                  <View className="flex h-20 w-3/5 flex-row items-center justify-between rounded-r-[30px] bg-[#5F37E6] p-2">
                    <View className="flex flex-row items-center justify-center gap-2">
                      <Text className="text-xl font-medium text-white">2</Text>
                      {/* <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      /> */}
                      <Text className="ml-4 text-xl font-normal text-white">
                        90,000
                      </Text>
                    </View>

                    <View className="h-16 w-16 items-center justify-center rounded-full bg-white">
                      <Image
                        source={require("../../../assets/main/avatar.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                  <View className="flex flex-1 flex-col">
                    <Text className="text-sm font-medium">Larry G</Text>
                    <Text className="text-xs font-normal">11,000,002 Xp</Text>
                  </View>
                </View>

                {/* 3 place */}
                <View className="flex flex-row items-center justify-between gap-2">
                  <View className="flex h-20 w-3/6 flex-row items-center justify-between rounded-r-[30px] bg-[#000000] p-2">
                    <View className="flex flex-row items-center justify-center gap-2">
                      <Text className="text-xl font-medium text-white">3</Text>
                      {/* <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      /> */}
                      <Text className="ml-4 text-xl font-normal text-white">
                        80,000
                      </Text>
                    </View>

                    <View className="h-16 w-16 items-center justify-center rounded-full bg-white">
                      <Image
                        source={require("../../../assets/main/avatar.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                  <View className="flex flex-1 flex-col">
                    <Text className="text-sm font-medium">Johcee</Text>
                    <Text className="text-xs font-normal">1,000,002 Xp</Text>
                  </View>
                </View>
              </View>

              <View className="my-3" />
              {/* Other ranks */}
              <View className="flex w-full flex-1 flex-col gap-4 px-[20px] py-5 pb-24">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-lg">Users</Text>
                  <Text className="text-lg font-normal">Global Rank</Text>
                </View>

                <FlashList
                  data={Array.from({ length: 20 })}
                  renderItem={({ item, index }) => (
                    <View className="my-2 flex flex-row items-center justify-between rounded-lg">
                      <View className="flex flex-row items-center justify-start gap-4">
                        <View className="h-12 w-12 items-center justify-center rounded-full bg-black">
                          <Image
                            source={require("../../../assets/main/avatar.png")}
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                        <View className="flex flex-col items-start justify-center gap-2">
                          <Text>@leo_donald</Text>
                          <View className="h-6 w-6 items-center justify-center rounded-lg bg-[#EBEBEB]">
                            <Text>{index + 4}</Text>
                          </View>
                        </View>
                      </View>

                      <View className="flex flex-col items-end justify-center gap-2">
                        <Text className="font-normal text-black">
                          {(index + 10000).toLocaleString("en-US")}
                        </Text>
                        <Text className="font-normal text-black/60">
                          {(13000425 - index).toLocaleString("en-US")}XP
                        </Text>
                      </View>
                    </View>
                  )}
                  estimatedItemSize={200}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
