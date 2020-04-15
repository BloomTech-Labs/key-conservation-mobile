import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';

import SearchBar from '../../components/Partners/SearchBar';

// For connecting Partners
import { getConnections } from '../../store/actions';

const PartnersModal = (props) => {
  //   const [partners, setPartners] = useState([]);

  //   const getConnections = async () => {
  //     try {
  //       const partner = await props.getConnections(props.currentUserProfile.id);
  //       if (Array.isArray(partner)) setPartners(partner);
  //       else throw new Error(partner);
  //     } catch (error) {
  //       Alert.alert('Failed to get your partners');
  //     }
  //   };

  //   useEffect(() => {
  //     getConnections();
  //   }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isModalVisable}
      onRequestClose={() => props.setIsModalVisible(!props.isModalVisable)}
    >
      <View>
        <SearchBar />
        {/* {props.currentUserProfile.roles === 'conservationists'} */}
        <View>
          <TouchableOpacity
            onPress={() => props.setIsModalVisible(!props.isModalVisible)}
          >
            <BackArrow />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PartnersModal;
