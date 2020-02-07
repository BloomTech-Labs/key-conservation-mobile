import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';

import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';
import KeyInfoGreen from '../../assets/jsicons/KeyCon/Key_Info_Green';

import Animals from '../Animals/Animals';

const AnimalModal2 = props => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => props.setIsModalVisible(!props.isModalVisible)}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.aroundBackArrow}>
            <TouchableOpacity>
              <BackArrow style={styles.backArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerInfo}>
            <View style={styles.headerTitle}>
              <KeyInfoGreen />
              <Text style={styles.title}>Species Patterns</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.text}>
                Click on the Key icon throughout the app to learn more about the
                species behind the patterns.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <ScrollView>
          <Animals />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
    // borderColor: 'red',
    // borderWidth: 2,
    // backgroundColor: 'transparent'
  },
  headerContainer: {
    top: 60,
    flex: 1,
    flexDirection: 'row'
    // borderColor: 'red',
    // borderWidth: 2
    //backgroundColor: 'grey'
  },
  aroundBackArrow: {
    padding: 10,
    alignSelf: 'flex-start',
    paddingLeft: 25
    // borderColor: 'red',
    // borderWidth: 2,
    // backgroundColor: 'yellow'
  },
  //   backArrow: {
  //     borderColor: 'red',
  //     borderWidth: 2
  //   },
  headerInfo: {
    flex: 1

    // borderColor: 'red',
    // borderWidth: 2
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15
    // borderColor: 'red',
    // borderWidth: 2
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
    color: '#F4F5F7',
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 8
    // borderColor: 'red',
    // borderWidth: 2
  },
  headerText: {
    flex: 2,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center'
    // borderColor: 'red',
    // borderWidth: 2
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Lato',
    color: '#F4F5F7',
    fontSize: 20
    // borderColor: 'red',
    // borderWidth: 2
  },
  listContainer: {
    flex: 3,
    backgroundColor: '#3b3b3b',
    borderColor: 'purple',
    borderWidth: 2
  }
});

export default AnimalModal2;
