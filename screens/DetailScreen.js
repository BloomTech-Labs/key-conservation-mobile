import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from "react-navigation";
import { useSelector } from 'react-redux';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

const DetailsScreen = props => {
  let { selectedProfile } = useSelector(state => state);
  const { navigation } = props;
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#F2F2FB' }}>
      <DetailHeader navigation={navigation} profile={selectedProfile} />
      <DetailAboutUs navigation={navigation} profile={selectedProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',

    paddingTop: 50,

    flexWrap: 'wrap'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: '#f5f5f5'
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  ButtonText: {
    color: '#C4C4C4',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  DetailButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#00FF9D'
  }
});

export default DetailsScreen;
