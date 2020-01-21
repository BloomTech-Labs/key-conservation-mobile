import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import styles from '../constants/screens/LoadingScreen';

const LogoutScreen = props => {
  return (
    <ImageBackground
      source={require('../assets/images/splash.png')}
      style={styles.container}
    >
      <Text style={styles.text}>Logout successful!</Text>
      <TouchableOpacity
        style={style.touchableContainer}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Loading' });
        }}
      >
        <Text style={style.touchableText}>Log Back In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LogoutScreen;
