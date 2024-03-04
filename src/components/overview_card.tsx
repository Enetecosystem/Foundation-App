import { ImageBackground } from "expo-image";
import { FC } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";

interface IOverviewProps {
  referrals: number;
  totalUsers: number;
  globalRank: number;
  referralLink: string;
}
export const Overview: FC<IOverviewProps> = ({
  referrals,
  totalUsers,
  globalRank,
  referralLink,
}) => {
  return (
    <View className="h-[160px] rounded-xl bg-[#000000]">
      {/* States design */}
      <View className="flex h-full w-full flex-col items-start justify-between p-4">
        <View className="flex w-full flex-row items-center justify-between">
          <View className="rounded-lg bg-slate-300/30 p-2">
            <Ionicons name="trophy-outline" size={20} color="white" />
          </View>

          <View className="flex flex-row items-center justify-center gap-2">
            <FontAwesome5 name="users" size={20} color="#ABABAB" />
            <Text className="text-lg font-normal text-[#ABABAB]">
              {totalUsers.toLocaleString("en-US")}
            </Text>
          </View>
        </View>
        <View className="flex w-full flex-row items-center justify-start gap-20 px-8">
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-light text-[#989898]">Referrals</Text>
            <Text className="text-2xl font-medium text-white">
              {referrals.toLocaleString("en-US")}
            </Text>
          </View>
          <View className="flex flex-col items-start justify-center gap-2">
            <Text className="text-lg font-light text-[#989898]">
              Global Rank
            </Text>
            <Text className="text-2xl font-medium text-white">
              {globalRank.toLocaleString("en-US")}
            </Text>
          </View>
        </View>

        <View className="flex w-full flex-row items-center justify-between gap-6 px-8">
          <Text className="text-lg font-light text-[#989898]">
            Referral link: {referralLink}
          </Text>

          <TouchableOpacity onPress={() => Alert.alert("Link copied")}>
            <Feather name="copy" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
