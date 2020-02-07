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

const AnimalModal = props => {
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
            <TouchableOpacity
              onPress={() => props.setIsModalVisible(!props.isModalVisible)}
            >
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
        <Animals />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  headerContainer: {
    top: 60,
    flex: 1,
    flexDirection: 'row'
  },
  aroundBackArrow: {
    flex: 0,
    alignSelf: 'flex-start',
    paddingLeft: 15
  },
  headerInfo: {
    flex: 1
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10
  },
  title: {
    flex: 0,
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
    color: '#F4F5F7',
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  headerText: {
    flex: 2,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Lato',
    color: '#F4F5F7',
    fontSize: 16,
    paddingBottom: 20
  },
  listContainer: {
    flex: 2.7,
    backgroundColor: '#3b3b3b'
  }
});

export default AnimalModal;
