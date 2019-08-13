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

import { getProfileData } from '../store/actions';

import EditButton from '../components/EditButton';

import SupProfileHeader from '../components/Profile/SupProfileHeader';
import SupProfileBody from '../components/Profile/SupProfileBody';
import Stylesheet from '../constants/Stylesheet';

class MySupProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Profile',
      headerLeft: <View />,
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

  render() {
    return (
      <ScrollView>
        <View>
          <SupProfileHeader profile={this.props.currentUserProfile}/>
          <SupProfileBody profile={this.props.currentUserProfile}/>
        
        </View>
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
  { getProfileData }
)(MySupProScreen);
