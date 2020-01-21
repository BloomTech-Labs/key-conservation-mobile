import React from 'react';
import { Text, ImageBackground, TouchableOpacity } from 'react-native';

import styles from '../constants/screens/LoadingScreen';

const LogoutScreen = props => {
  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      style={styles.container}
    >
      <Text style={styles.text}>Logout successful!</Text>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Loading' });
        }}
      >
        <Text style={styles.touchableText}>Log Back In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LogoutScreen;
