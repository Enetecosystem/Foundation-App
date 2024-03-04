import DashboardHeader from "@/components/dashboard_header";
import Header from "@/components/header";
import { Stack } from "expo-router";
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

export default function ReferralPage() {
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
                  onPress={() => Alert.alert("Link copied to clipboard")}
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
                  <Text className="text-lg font-normal">10,001</Text>
                </View>

                <FlashList
                  data={Array.from({ length: 20 })}
                  renderItem={({ item, index }) => (
                    <View className="my-2 flex flex-row items-center justify-between rounded-lg bg-[#EBEBEB] p-4">
                      <View className="flex flex-row items-center justify-center gap-2">
                        <Text>{index + 1}.</Text>
                        <Text>Johcee joined via your link</Text>
                      </View>

                      <Text className="font-medium">+{index + 13}Pts</Text>
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
