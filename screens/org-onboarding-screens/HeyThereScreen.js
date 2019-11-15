import React from "react";
import { View, Text, Button, TouchableOpacity, Linking } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/HeyThere.js';
import * as SecureStore from 'expo-secure-store';

import { logout } from "../../store/actions";

const HeyThereScreen = props => {

  logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    logout();
    props.navigation.navigate('Loading');

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    Linking.canOpenURL(logoutURL).then(supported => {
      if (supported) {
        Linking.openURL(logoutURL);
      } else {
        console.log("Don't know how to open URI: " + logoutURL);
      }
    });
  };
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Hey There!</Text>
            <Text style={styles.obSubtitle}>We can't wait to get your organization on board.</Text>
            <Text style={styles.obText}>After just a brief overview of our process, you'll be on your way to creating a custom page for your organization.</Text>
            <TouchableOpacity style={styles.obBackContainer}
                onPress={() => {
                    props.navigation.navigate("ToExpect");
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
                </TouchableOpacity> 
          <View style={styles.spacer}/>
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
}

export default HeyThereScreen;