import React, { useRef, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

interface ITaskBoostCardProps {
  renderTasks: () => React.ReactNode;
  renderBoosts: () => React.ReactNode;
  data: Array<Record<string, any>>;
}
export default function TaskBoostCard() {
  const params = useLocalSearchParams();
  const sliderRef = useRef(null);
  const { width } = useWindowDimensions();
  const [sliderIndex, setSliderIndex] = useState(0);

  return (
    <View className="mb-32 flex w-full flex-col gap-4">
      <View className="flex w-full flex-row rounded-md bg-white p-2">
        <TouchableOpacity
          style={{
            backgroundColor: sliderIndex === 0 ? "black" : "transparent",
          }}
          className="flex w-1/2 flex-row items-center justify-center gap-2 rounded-xl p-4 transition-colors"
          onPress={() => {
            sliderRef.current.scrollTo({ index: 0, animated: true });
            setSliderIndex(0);
          }}
        >
          <Octicons
            name="database"
            size={20}
            color={sliderIndex === 0 ? "white" : "black"}
          />
          <Text
            className="transition-colors"
            style={{
              color: sliderIndex === 0 ? "white" : "black",
            }}
          >
            Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: sliderIndex === 1 ? "black" : "transparent",
          }}
          className="flex w-1/2 flex-row items-center justify-center gap-2 rounded-xl p-4 transition-colors"
          onPress={() => {
            sliderRef.current.scrollTo({ index: 1, animated: true });
            setSliderIndex(1);
          }}
        >
          <Feather
            name="zap"
            size={20}
            color={sliderIndex === 1 ? "white" : "black"}
          />
          <Text
            className="transition-colors"
            style={{
              color: sliderIndex === 1 ? "white" : "black",
            }}
          >
            Boosts
          </Text>
        </TouchableOpacity>
      </View>
      <Carousel
        ref={sliderRef}
        loop={false}
        style={{
          width: "100%",
          // height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          overflow: "scroll",
        }}
        autoPlay={false}
        width={width * 0.95}
        height={width * 1.2}
        pagingEnabled
        enabled={false}
        scrollAnimationDuration={700}
        data={Array.from({ length: 2 })}
        onSnapToItem={(index) => {}}
        defaultIndex={0}
        renderItem={({ index, item }) => {
          if (index === 0) {
            return <Tasks key={index} params={params} />;
          }

          return <Boosts key={index} />;
        }}
      />
    </View>
  );
}

const ccosystemTaskList = [
  {
    name: "Invite 10 Friends",
    reward: 10000,
    icon: <FontAwesome5 name="user-friends" size={24} color="black" />,
    link: "/(main)/referral",
  },
  {
    name: "Follow On X(Twitter)",
    reward: 2000,
    icon: <FontAwesome6 name="x-twitter" size={24} color="black" />,
    link: "https://twitter.com/Enetecosystem",
  },
  {
    name: "Join Telegram Channel",
    reward: 2000,
    icon: <FontAwesome5 name="telegram-plane" size={24} color="black" />,
    link: "https://t.me/enetecosystem",
  },
  {
    name: "Join Telegram",
    reward: 2000,
    icon: <FontAwesome5 name="telegram-plane" size={24} color="black" />,
    link: "https://t.me/enetworkchannel",
  },
  {
    name: "Join Discord",
    reward: 2000,
    icon: <MaterialIcons name="discord" size={24} color="black" />,
    link: "https://discord.gg/RQqVWPxuwq",
  },
];
const Tasks = ({ params }) => (
  <View className="flex w-full flex-1 flex-col items-center justify-start gap-4 bg-white p-6 pb-14">
    <Text className="text-2xl text-black">Ecosystem</Text>
    <Text className="-mt-3 text-lg text-black/50">10,000 XP Challenge</Text>
    {ccosystemTaskList.map((task, index) => (
      <TouchableOpacity
        onPress={() => router.push({ pathname: task.link, params })}
        key={index}
        className="flex w-full flex-row items-center justify-center gap-4"
      >
        <View className="rounded-xl bg-[#EBEBEB] p-5">{task?.icon}</View>
        <View className="flex flex-col items-start justify-center gap-2">
          <Text className="text-lg">{task?.name}</Text>
          <Text>+{task?.reward.toLocaleString("en-US")} XP</Text>
        </View>
        <View className="flex-1" />
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    ))}
  </View>
);

const boosterList = [
  {
    name: "Mining Speed",
    cost: 50,
    icon: <Feather name="zap" size={24} color="black" />,
    action: () => {},
  },
  {
    name: "Auto Mining Bot",
    cost: 500,
    icon: <Octicons name="database" size={24} color="black" />,
    action: () => {},
  },
];
const Boosts = () => (
  <View className="flex w-full flex-1 flex-col items-center justify-start gap-4 bg-white p-6 pb-14">
    <View className="flex w-full flex-row items-center justify-between">
      <Text className="px-6 text-xl font-normal text-black">
        Mining Boosters
      </Text>
      <View className="flex flex-col rounded-lg bg-[#EBEBEB] px-4 py-2">
        <Text className="text-lg text-black">Mining Speed</Text>
        <Text className="text-sm text-black/50">0/6 Available</Text>
      </View>
    </View>

    {boosterList.map((boost, index) => (
      <TouchableOpacity
        onPress={() => {}}
        key={index}
        className="flex w-full flex-row items-center justify-center gap-4"
      >
        <View className="rounded-xl bg-[#EBEBEB] p-5">{boost.icon}</View>
        <View className="flex flex-col items-start justify-center gap-1">
          <Text className="text-lg">{boost?.name}</Text>
          <View className="flex flex-row items-center justify-start gap-2">
            <Image
              source={require("../../assets/enet-logo.png")}
              style={{ width: 20, height: 20 }}
              contentFit="cover"
            />
            <Text className="text-lg font-medium">
              {boost.cost.toLocaleString("en-US")} ENET
            </Text>
          </View>
          {index === 1 && (
            <Text className="text-sm text-black/40">
              Mine when you're asleep
            </Text>
          )}
        </View>
        <View className="flex-1" />
        <View className="flex flex-row items-center justify-end gap-1">
          <Text>1 lvl</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    ))}
  </View>
);
