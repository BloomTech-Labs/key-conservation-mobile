import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';

import DetailHeader from '../components/DetailScreen/DetailHeader';
import DetailAboutUs from '../components/DetailScreen/DetailAboutUs';

const MyDetailsScreen = props => {
  let { currentUser } = useSelector(state => state);
  const { navigation } = props;
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#F2F2FB' }}>
      <DetailHeader
        navigation={navigation}
        myProfile={true}
        profile={currentUser.profile}
      />
      <DetailAboutUs
        navigation={navigation}
        myProfile={true}
        profile={currentUser.profile}
      />
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

// MyDetail.navigationOptions = {
//   // This setting needs to be on every screen so that header is in the center
//   // This is fix for andriod devices should be good on IOS
//   headerTitleStyle: {
//     textAlign: 'center',
//     flexGrow: 1,
//     alignSelf: 'center'
//   }
// };

export default MyDetailsScreen;
