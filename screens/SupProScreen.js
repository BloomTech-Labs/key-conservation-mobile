import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { ScrollView } from "react-navigation";
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import { Icon, ListItem } from 'react-native-elements';

import * as SecureStorage from "expo-secure-store";

import { getProfileData, logout } from '../store/actions';

import EditButton from '../components/EditButton';

import ProfileHeader from '../components/Profile/ProfileHeader';
import Stylesheet from '../constants/Stylesheet';

class SupProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Profile',
      headerLeft: null,
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold',
      },
      headerRight: <EditButton navigation={navigation} editRoute={'EditSupPro'} />
    };
  };

  componentDidMount() {
    this.props.getProfileData(this.props.currentUserProfile.id, false, 'myProfile');
  }

  logMeOut = async () => {
    await SecureStorage.deleteItemAsync("sub", {});
    await SecureStorage.deleteItemAsync("email", {});
    await SecureStorage.deleteItemAsync("roles", {});
    await SecureStorage.deleteItemAsync("userId", {});
    this.props.logout();
    this.props.navigation.navigate("Loading");
  }

  render() {
    return (
      <ScrollView>
        <Text>PLACEHOLDER - SUPPORTER PROFILE PAGE</Text>
        <Button onPress={this.logMeOut} title="LOGOUT"/>
        <View />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});
const optionsStyles = {
  optionsContainer: {
    width: 75
  },
}
  

export default connect(
  mapStateToProps,
  { getProfileData, logout }
)(SupProScreen);
