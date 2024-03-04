import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  return (
    <SafeAreaView className="bg-[#EBEBEB]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "position"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="min-h-screen w-full bg-white">
            <View className="flex h-auto w-full flex-col items-center justify-center rounded-b-[35px] bg-[#EBEBEB] py-10">
              <Image
                source={require("../../../assets/miner_onboard_img-1.png")}
                style={{ width: 200, height: 200, alignItems: "center" }}
              />
              <Text className="text-2xl font-medium tracking-normal">
                Welcome to Enetwallet
              </Text>
              <Text className="text-lg font-light tracking-widest">
                THE Web3 STANDARD
              </Text>
            </View>
            <View className="flex h-auto w-full flex-col items-center justify-center px-[20px] py-5">
              <Text className="mb-[27px] text-lg font-medium">
                Input your email address
              </Text>
              <TextInput
                placeholder="Email address"
                className="mb-[16px] w-full rounded-md bg-[#EBEBEB] px-6 py-4 placeholder:font-light placeholder:text-black"
              />
              <TextInput
                placeholder="Referral"
                className="w-full rounded-md bg-[#EBEBEB] px-6 py-4 placeholder:font-light placeholder:text-black"
              />
            </View>

            <View className="flex h-auto w-full flex-col items-center justify-center px-[20px]">
              <Link
                suppressHighlighting
                href="/otp"
                className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-black p-4 text-center text-lg font-normal text-white transition-colors"
              >
                Signup
                {/* <Text className=""></Text> */}
              </Link>

              <Text className="mt-4 text-center leading-6 text-black sm:max-w-xl">
                By continuing, you agree to our{" "}
                <Link
                  // suppressHighlighting
                  className="text-[#15BDCF]"
                  href="/register/#"
                >
                  terms of service
                </Link>{" "}
                and{" "}
                <Link
                  // suppressHighlighting
                  className="text-[#15BDCF]"
                  href="/register/#"
                >
                  privacy policy
                </Link>
                .
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
