import React from 'react';
import { Text, ImageBackground, TouchableOpacity } from 'react-native';

import styles from '../constants/screens/LoadingScreen';

const LogoutScreen = props => {
  return (
    <ImageBackground
      source={require('../assets/images/loginscreen2.png')}
      style={styles.container}
    >
      <Text style={styles.text}>Logout successful!</Text>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Loading' });
        }}
      >
        <Text style={styles.touchableText}>LOG BACK IN</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LogoutScreen;
