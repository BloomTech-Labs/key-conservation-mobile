import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text
} from 'react-native';

import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';
// import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftSolid';
// import SvgUri from 'react-native-svg-uri';

import Animals from '../Animals/Animals';

const AnimalModal = props => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => props.setIsModalVisible(!props.isModalVisible)}
    >
      {/* <View style={styles.background}> */}
      <View style={styles.modal}>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            style={styles.backArrow}
            onPress={() => props.setIsModalVisible(!props.isModalVisible)}
          >
            <BackArrow />
          </TouchableHighlight>
        </View>
        <View style={styles.animalList}>
          <Animals />
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    borderColor: 'red',
    borderWidth: 5,
    flex: 1,
    opacity: 50
    //backgroundColor: '#F4F5F7'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    marginHorizontal: 30,
    marginVertical: 60,
    borderRadius: 8
    // borderColor: 'black',
    // borderWidth: 5
  },

  headerContainer: {
    flex: 0,
    borderColor: 'orange',
    borderWidth: 2,
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  backArrow: {
    borderColor: 'red',
    borderWidth: 2,
    padding: 3,
    margin: 10
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Lato',
    marginHorizontal: 8
  },
  animalList: {
    flex: 1,
    alignItems: 'center'
  }
});

export default AnimalModal;
