import { Image, ImageBackground } from "expo-image";
import { FC, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import ClaimModal from "@/components/claim_modal";
import LinearGradient from "react-native-linear-gradient";
import { useMutation } from "convex/react";
import { api } from "@/convex/generated/api";
import { useLocalSearchParams } from "expo-router";
import { Id } from "@/convex/generated/dataModel";

interface IStatsCardProps {
  minedCount: number;
  miningRate: number;
  xpEarned: number;
  redeemableCount: number;
}
export const StatsCard: FC<IStatsCardProps> = ({
  minedCount,
  miningRate,
  xpEarned,
  redeemableCount,
}) => {
  const params = useLocalSearchParams();

  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const claimReward = useMutation(api.mutations.claimRewards);


  return (
    <ImageBackground
      source={require("../../assets/main/stats-bg.png")}
      style={{
        justifyContent: "center",
        height: 180,
        width: "100%",
        backgroundColor: "#EBEBEB",
        borderRadius: 20,
      }}
      contentFit="contain"
      contentPosition="center"
    // className="bg-contain bg-center bg-no-repeat"
    >
      {/* States design */}
      <View className="flex h-full w-full flex-col items-start justify-end p-4">
        <View className="flex flex-row items-end justify-center gap-2">
          <TouchableOpacity onPress={() => {

            setClaimModalVisible(true);

          }} className="flex w-12 h-20  justify-end items-end">
            <Image source={require("../../assets/main/miner-fluid-low.png")} style={{ width: 40, height: 48, marginBottom: 10 }} contentFit="contain" />
          </TouchableOpacity>
          <ClaimModal isClaimModalVisible={claimModalVisible} setClaimModalVisible={setClaimModalVisible}>
            {/*<View className="w-full relative items-center justify-center flex-1"> */}

            <LinearGradient colors={['#000000', '#D9D9D9']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
              style={{ display: "flex", position: "absolute", flexDirection: "column", alignItems: "center", justifyContent: "center", top: 160, left: 6, right: 6, borderRadius: 10, padding: 8, height: 114 }}>
              <View className="bg-white w-full h-full rounded-md p-3 flex flex-col items-center justify-between">
                <View className="w-full flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center justify-center gap-2">
                    <Image source={require("../../assets/main/icons/claim-icon.png")} style={{width: 47, height: 47}} contentFit="cover" />
                    <View className="flex flex-col gap-1 items-center justify-start">
                      <Text className="text-lg text-black font-normal">+6.01 $EN/hour</Text>  
                      <Text className="text-sm font-lighter text-black">Mined by Auto Bot</Text>
                    </View>  
                  </View>
                  <TouchableOpacity className="px-8 py-3 bg-black rounded-xl items-center justify-center" onPress={async () => {
                    setClaimModalVisible(false);
                    try {
                      await claimReward({userId: params?.userId as Id<"user">});
                    } catch(e: any) {
                      return Alert.alert("Claim error", e.message ?? e.toString());
                    }
                    Alert.alert("Claim rewards", "Your reward has been successfuly claimed, you can restart mining at any time");
                  }}>
                    <Text className="text-white">Claim</Text>  
                  </TouchableOpacity>
                </View>
                <Text>{["Boost your Auto Mining Bot to increase your mining time", "Auto Mining will be enabled after one hour of inactivity.", "Boost your Mining Speed to earn more $EN per hour"][Math.floor(Math.random() * 3)]}</Text>
              </View>
            </LinearGradient>

            {/* </View> */}
          </ClaimModal>
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-light text-[#989898]">
              $EN Mined
            </Text>
            <Text className="text-2xl font-medium text-black">
              $EN {minedCount}
            </Text>
            <Text className="text-lg font-normal text-[#989898]">
              {redeemableCount}
            </Text>
          </View>
          <View className="mx-10" />
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-light text-[#989898]">
              XP Earned
            </Text>
            <Text className="text-2xl font-medium text-black">{xpEarned}</Text>
            <Text className="text-lg font-normal text-[#989898]">

            </Text>
          </View>
        </View>

        <View className="my-3" />
        <View className="rounded-lg bg-black px-4 py-2">
          <Text className="text-start font-normal text-white">
            Mining rate: {miningRate}EN/hr
          </Text>
        </View>
      </View >
    </ImageBackground >
  );
};
