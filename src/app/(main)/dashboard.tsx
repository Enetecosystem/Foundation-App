import ClaimModal from "@/components/claim_modal";
import DashboardHeader from "@/components/dashboard_header";
import { Overview } from "@/components/overview_card";
import { StatsCard } from "@/components/stats_card";
import TaskBoostCard from "@/components/task_boost_card";
import { api } from "@/convex/generated/api";
import { Id } from "@/convex/generated/dataModel";
import { Octicons } from "@expo/vector-icons";
import { useAction, useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  // Modal,
  View,
  ScrollView,
  useWindowDimensions,
  Alert,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardPage() {
  const params = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch users data
  const userDetail = useQuery(api.queries.getUserDetails, {
    userId: params?.userId as Id<"user">,
  });
  const [claimModalVisible, setClaimModalVisible] = useState(false);

  const claimReward = useMutation(api.mutations.claimRewards);
  const triggerMiner = useAction(api.mutations.triggerMining);

  useEffect(() => {
    if (!userDetail?.mineActive && userDetail?.redeemableCount > 0) {
      setClaimModalVisible(true);
    }
  }, [userDetail?.mineActive, userDetail?.redeemableCount]);

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView behavior={"position"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ height: height }}
            className="relative h-screen min-h-screen w-full"
          >
            <View
              // style={{ bottom: bottom + 92 }}
              style={{
                height: 100,
                top: height - 202,
              }}
              className="absolute left-0 right-0 z-50 flex w-full flex-col items-center justify-center gap-3 bg-white"
            >
              {!userDetail?.mineActive && userDetail?.redeemableCount <= 0 && (
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
                  <Text className="font-[nunito]">Start Mining</Text>
                  <Octicons name="database" size={20} color="black" />
                </TouchableOpacity>
              )}

              {userDetail?.mineActive && userDetail?.redeemableCount >= 0 && (
                <TouchableOpacity className="flex flex-row items-center gap-3 rounded-full border border-gray-600 bg-black px-4 py-3 shadow-lg drop-shadow-md">
                  <Text className="font-[nunito] font-medium text-white">
                    Mining at {userDetail?.miningRate} $EN/hr
                  </Text>
                  <Octicons name="database" size={20} color="white" />
                </TouchableOpacity>
              )}

              {!userDetail?.mineActive && userDetail?.redeemableCount > 0 && (
                <TouchableOpacity
                  onPress={() => setClaimModalVisible(true)}
                  className="flex flex-row items-center gap-3 rounded-full border border-gray-600 bg-black px-4 py-3 shadow-lg drop-shadow-md"
                >
                  <Text className="font-[nunito] font-medium text-white">
                    Claim reward $EN {userDetail?.redeemableCount}
                  </Text>
                  {/* <Octicons name="database" size={20} color="white" /> */}
                </TouchableOpacity>
              )}
              <Text className="font-[nunito]">
                {userDetail &&
                  format(
                    userDetail?.mineStartTime
                      ? userDetail.mineStartTime
                      : Date.now(),
                    "HH mm ss",
                  )}
              </Text>

              <ClaimModal
                isClaimModalVisible={claimModalVisible}
                setClaimModalVisible={setClaimModalVisible}
              >
                {/*<View className="w-full relative items-center justify-center flex-1"> */}

                <LinearGradient
                  colors={["#000000", "#D9D9D9"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    display: "flex",
                    position: "absolute",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 160,
                    left: 6,
                    right: 6,
                    borderRadius: 10,
                    padding: 8,
                    height: 114,
                  }}
                >
                  <View className="flex h-full w-full flex-col items-center justify-between rounded-md bg-white p-3">
                    <View className="flex w-full flex-row items-center justify-between">
                      <View className="flex flex-row items-center justify-center gap-2">
                        <Image
                          source={require("../../../assets/main/icons/claim-icon.png")}
                          style={{ width: 47, height: 47 }}
                          contentFit="cover"
                        />
                        <View className="flex flex-col items-start justify-center gap-1">
                          <Text className="text-lg font-normal text-black">
                            {userDetail?.miningRate} $EN/hour
                          </Text>
                          <Text className="font-lighter text-sm text-black">
                            Mined by Auto Bot
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        className="items-center justify-center rounded-xl bg-black px-8 py-3"
                        onPress={async () => {
                          setClaimModalVisible(false);
                          try {
                            await claimReward({
                              userId: params?.userId as Id<"user">,
                            });
                          } catch (e: any) {
                            return Alert.alert(
                              "Claim error",
                              e.message ?? e.toString(),
                            );
                          }
                          Alert.alert(
                            "Claim rewards",
                            "Your reward has been successfuly claimed, you can restart mining at any time",
                          );
                        }}
                      >
                        <Text className="text-white">Claim</Text>
                      </TouchableOpacity>
                    </View>
                    <Text>
                      {
                        [
                          "Boost your Auto Mining Bot to increase your mining time",
                          "Auto Mining will be enabled after one hour of inactivity.",
                          "Boost your Mining Speed to earn more $EN per hour",
                        ][Math.floor(Math.random() * 3)]
                      }
                    </Text>
                  </View>
                </LinearGradient>

                {/* </View> */}
              </ClaimModal>
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
                      nickname={userDetail?.nickname}
                    />
                  ),
                }}
              />

              <TouchableOpacity
                activeOpacity={1}
                className="flex h-full w-full flex-col px-[20px] py-4 pb-32"
              >
                <StatsCard
                  minedCount={userDetail?.minedCount ?? 0}
                  miningRate={userDetail?.miningRate ?? 0}
                  xpEarned={userDetail?.xpCount ?? 0}
                  redeemableCount={userDetail?.redeemableCount ?? 0}
                />

                <View className="my-4" />

                <View className="mt-4 flex w-full flex-col gap-2">
                  <Text className="font-[nunito] text-xl font-medium">
                    Overview
                  </Text>
                  <Overview
                    totalUsers={userDetail?.totalUserCount ?? 0}
                    referrals={userDetail?.referralCount ?? 0}
                    referralCode={userDetail?.referralCode ?? "REFCOD"}
                    globalRank={userDetail?.globalRank ?? 1000}
                  />
                </View>

                <View className="my-6" />

                <TouchableOpacity
                  onPress={() =>
                    router.push({ pathname: "/(main)/referral", params })
                  }
                  className="flex w-full flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-[#B3B2B2]/50 bg-[#EBEBEB] p-4"
                >
                  <Image
                    source={require("../../../assets/main/invite.png")}
                    style={{ width: 50, height: 50 }}
                    alt="Referre"
                  />
                  <View className="flex flex-col items-start justify-center gap-1">
                    <Text className="font-[nunito] text-lg font-normal text-black">
                      Invite Friends
                    </Text>
                    <Text className="text-light font-[nunito] text-sm text-[#989898]">
                      The more users you refer, the more star you earn
                    </Text>
                  </View>
                </TouchableOpacity>
                <View className="my-6" />
                {/* Task and boosts */}
                <View className="mt-6 w-full flex-1">
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
