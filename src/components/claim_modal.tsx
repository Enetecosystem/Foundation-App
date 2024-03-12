
import { ReactNode, useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface ClaimModalProps {
  children: ReactNode;
  isClaimModalVisible: boolean;
  setClaimModalVisible: Function;
}
export default function ClaimModal({ children, setClaimModalVisible, isClaimModalVisible }: ClaimModalProps) {



  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isClaimModalVisible}
      onRequestClose={() => {
        setClaimModalVisible(false);
      }}

    >
      <TouchableWithoutFeedback
        className="h-full w-full"
        onPress={() => setClaimModalVisible(false)}
      >
        <View style={styles.centeredView}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: "relative",
  },
  modalView: {
    // minWidth: 200,
    // maxWidth: 200,
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
});


