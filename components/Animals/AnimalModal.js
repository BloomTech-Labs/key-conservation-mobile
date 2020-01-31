import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";
import SvgUri from "react-native-svg-uri";

import Animals from "../Animals/Animals";

const AnimalModal = props => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const { navigation } = props;

    const toggleVisible = () => {
      setIsModalVisible(!isModalVisible);
    };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleVisible()
    
      }}
    >
      <View style={styles.background}>
        <View style={styles.modal}>
          <TouchableHighlight
            style={{ alignItems: "flex-end", marginBottom: 15 }}
            onPress={() => {navigation.navigate("Loading");
                toggleVisible();
            }}
          >
            <SvgUri
              fill="#3b3b3b"
              width="31"
              height="31"
              source={require("../../assets/icons/x.svg")}
            />
          </TouchableHighlight>
          <View style={styles.animalList}>
            <Animals />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8
  },
  background: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 15
  },
  animalList: {
    flex: 1,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  
});

export default AnimalModal;
