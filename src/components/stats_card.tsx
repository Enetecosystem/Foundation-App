import { ImageBackground } from "expo-image";
import { FC } from "react";
import { Text } from "react-native";
import { View } from "react-native";

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
        <View className="flex flex-row items-start justify-center gap-10">
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-normal text-[#989898]">
              $EN Mined
            </Text>
            <Text className="text-xl font-medium text-black">
              $EN {minedCount}
            </Text>
            <Text className="text-sm font-normal text-[#989898]">
              {redeemableCount}
            </Text>
          </View>
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-normal text-[#989898]">
              XP Earned
            </Text>
            <Text className="text-xl font-medium text-black">{xpEarned}</Text>
          </View>
        </View>

        <View className="my-5" />
        <View className="rounded-lg bg-black p-2">
          <Text className="text-start font-normal text-white">
            Mining rate: {miningRate}EN/hr
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
