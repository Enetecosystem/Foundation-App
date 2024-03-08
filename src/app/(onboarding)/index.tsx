import { Image } from "expo-image";
import { Link, router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAction } from "convex/react";
import { api } from "@/convex/generated/api";
import { useEffect, useState } from "react";
import { getData, storeData } from "@/storageUtils";

export default function Register() {
  const [email, setEmail] = useState("");
  const [referreeCode, setReferreeCode] = useState("");
  const [password, setPassword] = useState("");
  const [userIsOnboarded, setUserIsOnbaorded] = useState(false);

  const initiateUser = useAction(api.onboarding.initializeNewUser);
  const loginUser = useAction(api.onboarding.loginUser);

  useEffect(() => {
    getUserLocalData();
    async function getUserLocalData() {
      try {
        const isOnboarded = await getData("@enet-store/isOnboarded");
        console.log(isOnboarded, ":::isOnboarded");
        if (!isOnboarded) {
          setUserIsOnbaorded(false);
          return;
        }
        setUserIsOnbaorded(true);
      } catch (e: any) {
        return Alert.alert(e.message ?? e.toString());
      }
    }
  }, [userIsOnboarded]);

  return (
    <SafeAreaView className="bg-[#EBEBEB]">
      <KeyboardAvoidingView behavior={"position"}>
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
                onChangeText={(text) => setEmail(text)}
              />
              {!userIsOnboarded && (
                <TextInput
                  placeholder="Referral"
                  className="w-full rounded-md bg-[#EBEBEB] px-6 py-4 placeholder:font-light placeholder:text-black"
                  value={referreeCode}
                  onChangeText={(text) => setReferreeCode(text)}
                />
              )}
              {userIsOnboarded && (
                <TextInput
                  placeholder="Password"
                  value={password}
                  className="w-full rounded-md bg-[#EBEBEB] px-6 py-4 placeholder:font-light placeholder:text-black"
                  onChangeText={(text) => setPassword(text)}
                />
              )}
            </View>

            <View className="flex h-auto w-full flex-col items-center justify-center px-[20px]">
              <Link
                suppressHighlighting
                href="/otp"
                className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-black p-4 text-center text-lg font-normal text-white transition-colors"
                onPress={async (e) => {
                  try {
                    e.preventDefault();
                    // return router.push("/(main)/history");
                    //

                    // TODO: If user is onboarded already, then login
                    if (userIsOnboarded) {
                      if (!email.length || !password.length) {
                        return Alert.alert(
                          "Onbaording error",
                          "Valid email or password must be entered",
                        );
                      }

                      const user = await loginUser({ email, password });
                      const userId = user?._id;
                      // Store data to local storage
                      await storeData("@enet-store/user", { email, userId });
                      return router.push({
                        pathname: "/(main)/dashboard",
                        params: { email, userId, nickname: user?.nickname },
                      });
                    }

                    // TODO: call server convex function to store users email and referral then send OTP to email address
                    const userId = await initiateUser({
                      referreeCode: !!referreeCode.length
                        ? referreeCode.trim()
                        : undefined,
                      email: email.trim(),
                    });

                    console.log(userId, ":::Result of stored user");

                    // Store data to local storage
                    await storeData("@enet-store/user", { email, userId });

                    router.push({
                      pathname: "/(onboarding)/otp",
                      params: { email, userId },
                    });
                  } catch (e: any) {
                    Alert.alert("Onboarding error", e.message ?? e.toString());
                  }
                }}
              >
                {userIsOnboarded ? "Login" : "Signup"}
                {/* <Text className=""></Text> */}
              </Link>

              <Text className="mt-4 text-center leading-6 text-black sm:max-w-xl">
                By continuing, you agree to our{" "}
                <Link
                  // suppressHighlighting
                  className="text-[#15BDCF]"
                  href="/#"
                >
                  terms of service
                </Link>{" "}
                and{" "}
                <Link
                  // suppressHighlighting
                  className="text-[#15BDCF]"
                  href="/#"
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
