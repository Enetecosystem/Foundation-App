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
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import Header from "@/components/header";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

export default function HistoryPage() {
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
                header: () => <Header top={top} title="History" />,
              }}
            />
            <View className="flex w-full flex-col px-[20px] py-4">
              <Text className="text-lg font-normal text-black">Today</Text>
              <View className="w-full flex-1 pb-24">
                <FlashList
                  data={Array.from({ length: 20 })}
                  renderItem={({ item, index }) => (
                    <View className="my-2 flex w-full flex-row gap-3 rounded-lg bg-white p-3">
                      {index % 2 <= 0 && (
                        <View className="h-[32px] w-[32px] items-center justify-center rounded-lg bg-[#E2DEF0] p-3">
                          <Image
                            source={require("../../../assets/main/icons/redo.png")}
                            style={{ width: 18, height: 18 }}
                          />
                        </View>
                      )}
                      {index % 2 >= 1 && (
                        <View className="h-[32px] w-[32px] items-center justify-center rounded-lg bg-[#D5EEF0] p-3">
                          <Image
                            source={require("../../../assets/main/icons/microscope.png")}
                            style={{ width: 18, height: 18 }}
                          />
                        </View>
                      )}

                      {index % 2 <= 0 && (
                        <View className="flex flex-1 flex-col items-start justify-start">
                          <Text className="text-start text-lg font-normal">
                            Johcee joined using your referral link
                          </Text>
                          <Text className="text-black/60">12:12pm</Text>
                        </View>
                      )}

                      {index % 2 >= 1 && (
                        <View className="flex flex-1 flex-col items-start justify-start">
                          <Text className="text-start text-lg font-normal">
                            You ranked at NO.1 on the local leaderboard this
                            week
                          </Text>
                          <Text>12:12pm</Text>
                        </View>
                      )}

                      {index % 2 <= 0 && (
                        <Text className="mt-4 text-lg font-medium">123 XP</Text>
                      )}
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
