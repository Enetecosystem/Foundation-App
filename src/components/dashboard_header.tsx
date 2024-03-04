import { Image } from "expo-image";
import { router } from "expo-router";
import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";

export default function DashboardHeader({
  top,
  modalVisible,
  setModalVisible,
}: {
  top: number;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View
      className="flex w-full flex-row items-center justify-between px-4 py-4"
      style={{ marginTop: top }}
    >
      <View className="flex w-full flex-row items-center justify-between gap-5">
        <UserAvatar
          source="../../../assets/main/avatar.png"
          alt="avatar"
          nickname="Johcee"
        />
        <TouchableOpacity className="p-2" onPress={() => setModalVisible(true)}>
          <Ionicons name="grid-outline" size={24} color="#D9D8D8" />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            className="h-full w-full"
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => router.push("/(main)/history")}
                >
                  <MaterialIcons name="chat" size={20} color="black" />
                  <Text className="text-lg font-normal text-black">
                    History
                  </Text>
                </Pressable>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => router.push("/(main)/leaderboard")}
                >
                  <SimpleLineIcons name="globe" size={20} color="black" />
                  <Text className="text-lg font-normal text-black">
                    Leaderboard
                  </Text>
                </Pressable>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => router.push("/(main)/earn")}
                >
                  <FontAwesome6 name="x-twitter" size={20} color="black" />
                  <Text className="text-lg font-normal text-black">X-Earn</Text>
                </Pressable>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => {
                    // router.push("/(main)/spaces")
                    Alert.alert("Spaces feature comming soon...");
                    setModalVisible(false);
                  }}
                >
                  <FontAwesome6 name="x-twitter" size={20} color="black" />
                  <Text className="text-lg font-normal text-black">Spaces</Text>
                </Pressable>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => {
                    setModalVisible(false);
                    Alert.alert("Log out", "Are you sure you want to logout?", [
                      {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => {},
                      },
                      {
                        text: "Logout",
                        style: "destructive",
                        onPress: () => {
                          // TODO: cleanup local data and logout
                          router.replace("/(onboarding)/register");
                        },
                      },
                    ]);
                  }}
                >
                  <AntDesign name="logout" size={20} color="black" />
                  <Text className="text-lg font-normal text-black">Logout</Text>
                </Pressable>
                <Pressable
                  className="my-2 flex w-full flex-row items-center justify-start gap-4"
                  onPress={() => {
                    setModalVisible(false);
                    Alert.alert(
                      "Delete Account",
                      "Are you sure you want to delete your account?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                          onPress: () => {},
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => {
                            // TODO: Delete logic
                            router.replace("/(onboarding)/register");
                          },
                        },
                      ],
                    );
                  }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#FF4747"
                  />
                  <Text className="text-lg font-normal text-[#FF4747]">
                    Delete Account
                  </Text>
                </Pressable>
                <View className="my-8" />
                <TouchableOpacity className="w-full items-center justify-center rounded-lg border border-black bg-transparent p-2">
                  <Text>Connect Wallet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
}

interface IUserAvatarProps {
  source: string;
  alt: string;
  nickname: string;
}
const UserAvatar: FC<IUserAvatarProps> = ({ source, alt, nickname }) => (
  <View className="flex flex-row items-center justify-center gap-2">
    <View className="h-[40px] w-[40px] overflow-hidden rounded-xl bg-[#14BBCC] p-1">
      <Image
        source={require("../../assets/main/avatar.png")}
        alt={alt}
        style={{ width: "100%", height: "100%" }}
      />
    </View>

    <Text className="font-medium">{nickname}</Text>
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "relative",
  },
  modalView: {
    minWidth: 200,
    maxWidth: 200,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    position: "absolute",
    top: 20,
    right: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
