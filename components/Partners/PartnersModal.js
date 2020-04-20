import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, TouchableOpacity, Text } from 'react-native';
import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';

import SearchBar from '../../components/Partners/SearchBar';

// For connecting Partners
import { getConnections } from '../../store/actions';

import styles from '../../constants/Partners/PartnerModal';
const PartnersModal = (props) => {
  const [partners, setPartners] = useState([]);

  const getConnections = async () => {
    try {
      const partner = await props.getConnections(props.currentUserProfile.id);
      if (Array.isArray(partner)) setPartners(partner);
      else throw new Error(partner);
    } catch (error) {
      Alert.alert('Failed to get your partners');
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isPartnersModalVisable}
      onRequestClose={() =>
        props.setIsPartnersModalVisible(!props.isPartnersModalVisable)
      }
    >
      <View style={styles.modalContainer}>
      
        <View>
          <TouchableOpacity
            onPress={() =>
              props.setIsPartnersModalVisible(!props.isPartnersModalVisible)
            }
          >
            <BackArrow />
          </TouchableOpacity>
        </View>
        <SearchBar />
        {/* {props.currentUserProfile.roles === 'conservationists'} */}
      </View>
    </Modal>
  );
};

export default PartnersModal;
