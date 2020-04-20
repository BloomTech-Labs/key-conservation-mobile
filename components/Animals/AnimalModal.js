import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';

//import icons
import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';
import KeyInfoYellow from '../../assets/jsicons/KeyCon/KeyInfoYellow';

//import components
import Animals from '../Animals/Animals';

//import styles
import styles from '../../constants/Animals/AnimalModal';

const AnimalModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={() => props.setIsModalVisible(!props.isModalVisible)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backArrowTouch}
            onPress={() => props.setIsModalVisible(!props.isModalVisible)}
          >
            <BackArrow />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={styles.headerTitle}>
              <View style={styles.keyIcon}>
                <KeyInfoYellow />
              </View>
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

export default AnimalModal;
