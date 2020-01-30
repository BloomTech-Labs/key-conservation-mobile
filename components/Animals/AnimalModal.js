import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";
import Animals from "../Animals/Animals";

const AnimalModal = props => {
  const [modalVisible, setModalVisible] = useState(true);

  const { navigation } = props;

  const toggleVisible = () => {
    setModalVisible(!modalVisible);
    console.log(modalVisible);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => navigation.navigate("Loading")}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>
              Click to find out more about these beautiful animals!
            </Text>
            <Animals />
            <TouchableHighlight
              onPress={() => {
                toggleVisible();
                navigation.navigate("Loading");
              }}
            >
              <Text style={styles.back}>Back to Sign In</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 220,
    width: 300,
    height: 300
  },
  modalContainer: {
    flex: 1,
    margin: 22
    //width: 300,
    //height: 300
  },
  title: {
    fontSize: 22
  },
  back: {}
});

export default AnimalModal;
