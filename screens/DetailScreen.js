import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { withNavigation } from 'react-navigation';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

class DetailsScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: '#F2F2FB' }}>
        <DetailHeader />
        <DetailAboutUs />
      </ScrollView>
    );
  }
}

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
    borderBottomColor: 'whitesmoke'
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  ButtonText: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  DetailButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'blue'
  }
});

export default withNavigation(DetailsScreen);
