import DashboardHeader from "@/components/dashboard_header";
import { Overview } from "@/components/overview_card";
import { StatsCard } from "@/components/stats_card";
import { Image } from "expo-image";
import { Link, Stack, router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardPage() {
  const { top } = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
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
                header: () => (
                  <DashboardHeader
                    top={top}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                ),
              }}
            />

            <View className="flex w-full flex-col px-[20px] py-4">
              <StatsCard
                minedCount={48500.71}
                miningRate={25}
                xpEarned={2000}
              />

              <View className="my-2" />

              <View className="mt-4 flex w-full flex-col gap-2">
                <Text className="text-xl font-medium">Overview</Text>
                <Overview
                  totalUsers={4218000}
                  referrals={12880}
                  referralLink="https://ref.link"
                  globalRank={4218}
                />
              </View>

              <View className="my-4" />

              <TouchableOpacity
                onPress={() => router.push("/(main)/referral")}
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

              <View className="flex w-full flex-col"></View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
