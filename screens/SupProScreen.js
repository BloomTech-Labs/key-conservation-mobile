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

import { getProfileData } from '../store/actions';

import EditButton from '../components/EditButton';

import ProfileHeader from '../components/Profile/ProfileHeader';
import Stylesheet from '../constants/Stylesheet';

class MyProScreen extends React.Component {
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
      headerRight: <EditButton navigation={navigation} editRoute={'EditPro'} />
    };
  };

  componentDidMount() {
    console.log()
    this.props.getProfileData(this.props.currentUserProfile.id, false, 'myProfile');
  }

  render() {
    return (
      <ScrollView>
        <Text>PLACEHOLDER - SUPPORTER PROFILE PAGE</Text>
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
  { getProfileData, deleteCampaign }
)(MyProScreen);
