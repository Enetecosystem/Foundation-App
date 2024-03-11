import DashboardHeader from "@/components/dashboard_header";
import { Overview } from "@/components/overview_card";
import { StatsCard } from "@/components/stats_card";
import TaskBoostCard from "@/components/task_boost_card";
import { api } from "@/convex/generated/api";
import { Id } from "@/convex/generated/dataModel";
import { Octicons } from "@expo/vector-icons";
import { useAction, useQuery } from "convex/react";
import { format, formatDuration } from "date-fns";
import { Image } from "expo-image";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  // Modal,
  View,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardPage() {
  const params = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  console.log(params, ":::Params");

  // Fetch users data
  const userDetail = useQuery(api.queries.getUserDetails, {
    userId: params?.userId as Id<"user">,
  });

  const triggerMiner = useAction(api.mutations.triggerMining);

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView behavior={"position"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="relative h-screen min-h-screen w-full">
            <View
              style={{ bottom: bottom + 92 }}
              className="absolute left-0 right-0 z-50 flex h-24 w-full flex-col items-center justify-center gap-2 bg-white"
            >
              {!userDetail?.mineActive && (
                <TouchableOpacity
                  onPress={async () => {
                    Alert.alert(
                      "Start mining",
                      "Are you sure you want to start mining?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Start",
                          // style: "destructive",
                          onPress: async () => {
                            // TODO: Delete logic
                            await triggerMiner({
                              userId:
                                userDetail?._id ??
                                (params?.userId as Id<"user">),
                            });
                          },
                        },
                      ],
                    );
                  }}
                  className="flex flex-row items-center gap-3 rounded-full border border-gray-600 px-4 py-3 shadow-lg drop-shadow-md"
                >
                  <Text>Start Mining</Text>
                  <Octicons name="database" size={20} color="black" />
                </TouchableOpacity>
              )}

              {userDetail?.mineActive && (
                <TouchableOpacity className="flex flex-row items-center gap-3 rounded-full border border-gray-600 bg-black px-4 py-3 shadow-lg drop-shadow-md">
                  <Text className="font-medium text-white">
                    Mining at {userDetail?.miningRate} $EN/hr
                  </Text>
                  <Octicons name="database" size={20} color="white" />
                </TouchableOpacity>
              )}
              <Text>
                {userDetail &&
                  format(
                    userDetail?.mineStartTime
                      ? userDetail.mineStartTime
                      : Date.now(),
                    "HH mm ss",
                  )}
              </Text>
            </View>
            <ScrollView
              className="z-40 min-h-full w-full bg-[#F5F5F5]"
              contentInsetAdjustmentBehavior="always"
              style={{ height: height - top }}
            >
              <Stack.Screen
                options={{
                  headerShown: true,
                  header: () => (
                    <DashboardHeader
                      top={top}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      nickname={params?.nickname as string}
                    />
                  ),
                }}
              />

              <TouchableOpacity
                activeOpacity={1}
                className="flex h-full w-full flex-col px-[20px] py-4 pb-20"
              >
                <StatsCard
                  minedCount={userDetail?.minedCount ?? 0}
                  miningRate={userDetail?.miningRate ?? 0}
                  xpEarned={userDetail?.xpCount ?? 0}
                  redeemableCount={userDetail?.redeemableCount ?? 0}
                />

                <View className="my-2" />

                <View className="mt-4 flex w-full flex-col gap-2">
                  <Text className="text-xl font-medium">Overview</Text>
                  <Overview
                    totalUsers={userDetail?.totalUserCount ?? 0}
                    referrals={userDetail?.referralCount ?? 0}
                    referralCode={userDetail?.referralCode ?? "REFCOD"}
                    globalRank={userDetail?.globalRank ?? 1000}
                  />
                </View>

                <View className="my-4" />

                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/(main)/referral", params })
                  }
                  className="flex w-full flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-[#EBEBEB] p-4"
                >
                  <Image
                    source={require("../../../assets/main/invite.png")}
                    style={{ width: 40, height: 40 }}
                    alt="Referre"
                  />
                  <View className="flex flex-col items-start justify-center gap-1">
                    <Text className="text-lg font-medium">Invite Friends</Text>
                    <Text className="text-sm">
                      The more users you refer, the more star you earn
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Task and boosts */}
                <View className="mt-4 w-full flex-1">
                  <TaskBoostCard />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
