import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
          <View style={styles.headerContainer}></View>
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
          <Text style={styles.title}>
            Click to learn more about these beautiful Animals!
          </Text>
          <View style={styles.animalList}>
            <Animals />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 100
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 2
  },

  title: {
    opacity: 70,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    //fontSize: 17,
    fontFamily: 'Lato',
    //marginHorizontal: 8,
    borderColor: 'blue',
    borderWidth: 2
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    padding: 5,
    borderColor: 'orange',
    borderWidth: 2
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
