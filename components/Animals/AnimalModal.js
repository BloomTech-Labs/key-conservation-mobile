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
          <View style={styles.headerContainer}>
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
          </View>
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
    backgroundColor: 'black',
    marginHorizontal: 30,
    marginVertical: 60,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 5
  },

  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    paddingHorizontal: 10
  },
  x: {
    alignSelf: 'flex-start',
    backgroundColor: '#d7ff43',
    borderRadius: 50,
    padding: 3,
    margin: 10
  },
  title: {
    fontSize: 20,
    //color: '#00F48A',
    color: '#F4F5F7',
    fontFamily: 'Lato',
    marginHorizontal: 8
  },
  animalList: {
    flex: 1,
    alignItems: 'center'
  }
});

export default AnimalModal;
