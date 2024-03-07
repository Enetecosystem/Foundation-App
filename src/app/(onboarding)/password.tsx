import Header from "@/components/header";
import Input from "@/components/input";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { Slider } from "react-native-awesome-slider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/generated/api";
import { Id } from "@/convex/generated/dataModel";

const checkPasswordStrength = (password: string): number => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

  if (password.length === 0) {
    return 0;
  } else if (password.length < 8) {
    return 20;
  } else if (!regex.test(password)) {
    return 40;
  } else {
    return 90;
  }
};

export default function PasswordPage() {
  const params = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const storePassword = useAction(api.onboarding.storePassword);

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="min-h-screen w-full bg-[#F5F5F5]">
            <Stack.Screen
              options={{
                headerShown: true,
                header(props) {
                  return <Header top={top} title="Create password" />;
                },
              }}
            />

            <View className="flex h-auto w-full flex-col items-center justify-center gap-4 rounded-b-[35px] px-[24px] py-5">
              <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                label="Password"
                className="mb-[16px] w-full rounded-md border bg-transparent px-6 py-4 placeholder:font-light placeholder:text-black focus:border-black"
              />
              <Input
                value={confirm}
                onChangeText={(text) => setConfirm(text)}
                label="Confirm Password"
                className="mb-[16px] w-full rounded-md border bg-transparent px-6 py-4 placeholder:font-light placeholder:text-black focus:border-black"
              />

              <PasswordValidation password={password} />
            </View>

            <View className="flex w-full flex-1 flex-col items-start justify-center px-[24px]">
              <Link
                // suppressHighlighting
                href="/password/#"
                onPress={async (e) => {
                  e.preventDefault();

                  if (
                    checkPasswordStrength(password) >= 90 &&
                    password === confirm
                  ) {
                    // TODO: Call mutation to save user password
                    await storePassword({
                      userId: params?.userId as Id<"user">,
                      password: password.trim(),
                    });
                    router.push({ pathname: "/(onboarding)/welcome", params });
                  } else {
                    Alert.alert(
                      "Password error",
                      "Password is invalid or does not match",
                    );
                  }
                }}
                className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-black p-4 text-center text-lg font-normal text-white transition-colors"
              >
                Continue
                {/* <Text className=""></Text> */}
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Password strength measure
function PasswordValidation({ password }: { password: string }) {
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  useEffect(() => {
    progress.value = checkPasswordStrength(password);
  }, [password]);

  return (
    <GestureHandlerRootView className="w-full">
      <View className="flex w-full flex-col items-start justify-center gap-3">
        {/* Validate password strength here */}
        <Text className="text-black">Password strength</Text>
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          style={{ width: "100%", flex: 1, borderRadius: 10 }}
          renderThumb={() => null}
          renderBubble={() => null}
          disableTapEvent
          theme={{
            disableMinTrackTintColor: "#fff",
            maximumTrackTintColor: "#DADADA",
            minimumTrackTintColor: "#000",
            cacheTrackTintColor: "#333",
            bubbleBackgroundColor: "#666",
            heartbeatColor: "#999",
          }}
        />

        <View className="mt-4 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-start gap-2"
            >
              <View
                className={`h-2 w-2 rounded-full`}
                style={{
                  backgroundColor:
                    index == 0 && password.length >= 8
                      ? "#18EAFF"
                      : index == 1 && /\d/.test(password)
                        ? "#18EAFF"
                        : index == 2 && /[!@#$%^&*]/.test(password)
                          ? "#18EAFF"
                          : "#F80F0F",
                }}
              ></View>

              <Text className="font-light">
                {index === 0
                  ? "Not shorter than 8 characters"
                  : index === 1
                    ? "Should include 1 number"
                    : "Should include 1 special character"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
