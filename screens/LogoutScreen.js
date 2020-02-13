import React from 'react';
import { Text, ImageBackground, TouchableOpacity, View } from 'react-native';

import styles from '../constants/screens/LoadingScreen';

const LogoutScreen = props => {
  return (
    <ImageBackground
      source={require('../assets/images/loginscreen2.png')}
      style={styles.container}
    >
      <View style={styles.logoutContainer}>
        <Text style={styles.text}>Log Out successful!</Text>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => {
            props.navigation.navigate({ routeName: 'Loading' });
          }}
        >
          <Text style={styles.touchableText}>LOG BACK IN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LogoutScreen;
