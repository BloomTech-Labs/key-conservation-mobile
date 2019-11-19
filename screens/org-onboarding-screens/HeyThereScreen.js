import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Linking } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/HeyThere.js';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { logout } from '../../store/actions';

const HeyThereScreen = props => {
  const [state, setState] = useState(null);

  logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    logout();

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    WebBrowser.openBrowserAsync(logoutURL)
      .then(result => {
        setState({ result });
        props.navigation.navigate('Loading');
      })
      .catch(() => {
        alert('Something went wrong');
      });
  };
  return (
    <View style={styles.obBody}>
      <Text style={styles.obTitle}>Hey There!</Text>
      <Text style={styles.obSubtitle}>
        We can't wait to get your organization on board.
      </Text>
      <Text style={styles.obText}>
        After just a brief overview of our process, you'll be on your way to
        creating a custom page for your organization.
      </Text>
      <TouchableOpacity
        style={styles.obBackContainer}
        onPress={() => {
          props.navigation.navigate('ToExpect');
        }}
      >
        <Text style={styles.obFwdBtnText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <TouchableOpacity
        onPress={this.logoutPress}
        style={styles.touchableButton}
      >
        <View style={styles.touchableView}>
          <Text style={styles.touchableText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeyThereScreen;
