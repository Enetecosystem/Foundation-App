import { ImageBackground } from "expo-image";
import { FC } from "react";
import { Text } from "react-native";
import { View } from "react-native";

interface IStatsCardProps {
  minedCount: number;
  miningRate: number;
  xpEarned: number;
}
export const StatsCard: FC<IStatsCardProps> = ({}) => {
  return (
    <View className="flex w-full flex-col items-center justify-between p-4">
      <ImageBackground
        source={require("../../../assets/main/stats-bg.png")}
        style={{ justifyContent: "center" }}
        className="bg-contain bg-center bg-no-repeat"
      >
        <Text>Mining rate of $EN</Text>
      </ImageBackground>
      {/* States design */}
    </View>
  );
};
