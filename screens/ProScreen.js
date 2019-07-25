import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import { Avatar, Icon } from 'react-native-elements';

import ProfileHeader from '../components/ProfileHeader';

export default class ProScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <ProfileHeader />
      </ScrollView>
    );
  }
}

ProScreen.navigationOptions = {
  title: 'Profile'
};
