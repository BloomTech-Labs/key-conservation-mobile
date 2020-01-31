import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import Animals from '../Animals/Animals';

const AnimalModal = props => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => props.setIsModalVisible(!props.isModalVisible)}
    >
      <View style={styles.background}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.x}
            onPress={() => props.setIsModalVisible(!props.isModalVisible)}
          >
            <SvgUri
              fill='#3b3b3b'
              width='31'
              height='31'
              source={require('../../assets/icons/x.svg')}
            />
          </TouchableOpacity>
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
    backgroundColor: 'white',
    margin: 60,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8
    // borderColor: 'orange',
    // borderWidth: 2
  },
  background: {
    opacity: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // borderColor: 'yellow',
    // borderWidth: 2
  },
  x: {
    alignSelf: 'flex-end',
    padding: 5
    // borderColor: 'orange',
    // borderWidth: 2
  },
  //   text: {
  //     fontSize: 16,
  //     marginBottom: 15,
  //     borderColor: 'orange',
  //     borderWidth: 2
  //   },
  animalList: {
    flex: 1,
    //height: 180,
    justifyContent: 'center',
    alignItems: 'flex-start'
    // padding: 20,
    // borderColor: 'blue',
    // borderWidth: 2
  }
});

export default AnimalModal;
