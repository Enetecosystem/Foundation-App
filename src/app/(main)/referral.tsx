import DashboardHeader from "@/components/dashboard_header";
import Header from "@/components/header";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { api } from "@/convex/generated/api";
import { useQuery } from "convex/react";
import * as Clipboard from "expo-clipboard";
import { Id } from "@/convex/generated/dataModel";

export default function ReferralPage() {
  const { top } = useSafeAreaInsets();
  const params = useLocalSearchParams();

  // Fetch users data
  const userDetail = useQuery(api.queries.getUserDetails, {
    userId: params?.userId as Id<"user">,
  });

  const historyDetails = useQuery(api.queries.getOnlyXpHistory, {
    userId: params?.userId as Id<"user">,
  });

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userDetail?.referralCode);
  };

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
                header: () => <Header top={top} />,
              }}
            />

            <View className="flex w-full flex-col py-4">
              <View className="flex w-full flex-col px-[20px]">
                <Text className="text-2xl font-normal">
                  Refer your friends and share up to 1000XPs on each referrals
                </Text>
                <Text className="text-lg font-light">
                  Your friends get 500 Xp when they signup with your referral
                  code
                </Text>
              </View>

              <View className="my-4" />
              <View className="px-[20px]">
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard();
                    Alert.alert("Link copied to clipboard");
                  }}
                  className="flex w-36 flex-row items-center justify-center gap-2 rounded-lg bg-black py-2"
                >
                  <SimpleLineIcons name="share-alt" size={18} color="white" />
                  <Text className="text-lg text-white">Share link</Text>
                </TouchableOpacity>
              </View>
              <View className="my-4" />
              <View className="flex w-full flex-1 flex-col gap-4 rounded-t-3xl bg-white px-[20px] py-5 pb-24">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-lg">Referrals</Text>
                  <Text className="text-lg font-normal">
                    {(userDetail?.referralCount ?? 0).toLocaleString("en-US")}
                  </Text>
                </View>

                <FlashList
                  data={historyDetails ?? []}
                  renderItem={({ item, index }) => (
                    <View className="my-2 flex flex-row items-center justify-between rounded-lg bg-[#EBEBEB] p-4">
                      <View className="flex flex-row items-center justify-center gap-2">
                        <Text>{index + 1}.</Text>
                        <Text>{item?.message}</Text>
                      </View>

                      <Text className="font-medium">+{item?.extra} XP</Text>
                    </View>
                  )}
                  estimatedItemSize={
                    historyDetails ? historyDetails.length + 200 : 200
                  }
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
