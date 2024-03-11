import { Stack, useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "@/components/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "convex/react";
import { api } from "@/convex/generated/api";
import { Id } from "@/convex/generated/dataModel";

export default function LeaderboardPage() {
  const params = useLocalSearchParams();

  const { top, bottom } = useSafeAreaInsets();

  const data = useQuery(api.queries.getLeaderBoard, {
    userId: params?.userId as Id<"user">,
  });

  console.log(params, ":::Params for the leaderboard");

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="relative h-screen min-h-screen w-full">
            <View
              style={{ bottom: bottom + 92 }}
              className="absolute left-0 right-0 z-50 mx-3 flex h-24 flex-row items-center justify-between gap-2 rounded-md bg-[#ABABAB] px-6"
            >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-black">
                <Image
                  source={require("../../../assets/main/avatar-1.png")}
                  style={{ width: 40, height: 40 }}
                />
              </View>

              <View className="flex flex-col">
                <View className="flex flex-row items-center justify-between gap-8">
                  <Text className="text-white">Referrals</Text>
                  <Text className="text-white">
                    {(data ? data?.user.referralCount : 0).toLocaleString(
                      "en-US",
                    )}
                  </Text>
                </View>
                <View className="flex flex-row items-center justify-between gap-8">
                  <Text className="text-white">XP</Text>
                  <Text className="text-white">
                    {(data ? data?.user.xpCount : 0).toLocaleString("en-US")}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <Text className="text-white">Position | Members</Text>
                <View className="flex flex-row items-center justify-between gap-8 rounded-md bg-white px-6 py-2">
                  <Text className="font-medium text-black">
                    {(data ? data.globalRank : 0).toLocaleString("en-US")}
                  </Text>
                  <Text>|</Text>
                  <Text className="font-medium text-black">
                    {(data ? data?.totalUsers : 0).toLocaleString("en-US")}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView className="z-40 min-h-full w-full bg-[#F5F5F5]">
              <Stack.Screen
                options={{
                  headerShown: true,
                  header: () => <Header top={top} title="Leaderboard" />,
                }}
              />
              <TouchableOpacity
                activeOpacity={1}
                className="flex h-full w-full flex-col py-4 pb-20"
              >
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
                    {(data ? data?.sortedUsers.splice(0, 3) : []).map(
                      (user, index) => {
                        if (index === 0)
                          return (
                            <View
                              key={index}
                              className="flex flex-row items-center justify-between gap-2"
                            >
                              <View className="flex h-20 w-3/4 flex-row items-center justify-between rounded-r-[30px] bg-[#15BDCF] p-2">
                                <View className="flex flex-row items-center justify-center gap-2">
                                  <Text className="text-xl font-medium text-white">
                                    1
                                  </Text>
                                  <MaterialCommunityIcons
                                    name="crown"
                                    size={24}
                                    color="black"
                                  />
                                  <Text className="ml-4 text-xl font-normal text-black">
                                    {user.referralCount.toLocaleString("en-US")}
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
                                <Text className="text-sm font-medium">
                                  {user?.nickname}
                                </Text>
                                <Text className="text-xs font-normal">
                                  {user.xpCount.toLocaleString("en-US")} Xp
                                </Text>
                              </View>
                            </View>
                          );

                        if (index === 1)
                          return (
                            <View
                              key={index}
                              className="flex flex-row items-center justify-between gap-2"
                            >
                              <View className="flex h-20 w-3/5 flex-row items-center justify-between rounded-r-[30px] bg-[#5F37E6] p-2">
                                <View className="flex flex-row items-center justify-center gap-2">
                                  <Text className="text-xl font-medium text-white">
                                    2
                                  </Text>
                                  {/* <MaterialCommunityIcons
                          name="crown"
                          size={24}
                          color="black"
                        /> */}
                                  <Text className="ml-4 text-xl font-normal text-white">
                                    {user.referralCount.toLocaleString("en-US")}
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
                                <Text className="text-sm font-medium">
                                  {user?.nickname}
                                </Text>
                                <Text className="text-xs font-normal">
                                  {user.xpCount.toLocaleString("en-US")} Xp
                                </Text>
                              </View>
                            </View>
                          );

                        return (
                          <View
                            key={index}
                            className="flex flex-row items-center justify-between gap-2"
                          >
                            <View className="flex h-20 w-3/6 flex-row items-center justify-between rounded-r-[30px] bg-[#000000] p-2">
                              <View className="flex flex-row items-center justify-center gap-2">
                                <Text className="text-xl font-medium text-white">
                                  3
                                </Text>
                                {/* <MaterialCommunityIcons
                          name="crown"
                          size={24}
                          color="black"
                        /> */}
                                <Text className="ml-4 text-xl font-normal text-white">
                                  {user.referralCount.toLocaleString("en-US")}
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
                              <Text className="text-sm font-medium">
                                {user?.nickname}
                              </Text>
                              <Text className="text-xs font-normal">
                                {user.xpCount.toLocaleString("en-US")} Xp
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                  </View>

                  <View className="my-3" />
                  {/* Other ranks */}
                  <View className="flex w-full flex-1 flex-col gap-4 px-[20px] py-5 pb-24">
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-lg">Users</Text>
                      <Text className="text-lg font-normal">Global Rank</Text>
                    </View>

                    <FlashList
                      data={data ? data.sortedUsers : []}
                      renderItem={({ item, index }) => (
                        <View className="my-2 flex flex-row items-center justify-between rounded-lg">
                          <View className="flex flex-row items-center justify-start gap-4">
                            <View className="h-12 w-12 items-center justify-center rounded-full bg-black">
                              <Image
                                source={require("../../../assets/main/avatar-1.png")}
                                style={{ width: 40, height: 40 }}
                              />
                            </View>
                            <View className="flex flex-col items-start justify-center gap-2">
                              <Text>{item?.nickname}</Text>
                              <View className="h-6 w-6 items-center justify-center rounded-lg bg-[#EBEBEB]">
                                <Text>{index + 4}</Text>
                              </View>
                            </View>
                          </View>

                          <View className="flex flex-col items-end justify-center gap-2">
                            <Text className="font-normal text-black">
                              {item.referralCount.toLocaleString("en-US")}
                            </Text>
                            <Text className="font-normal text-black/60">
                              {item.xpCount.toLocaleString("en-US")} XP
                            </Text>
                          </View>
                        </View>
                      )}
                      estimatedItemSize={
                        data ? data.sortedUsers.length + 200 : 200
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
