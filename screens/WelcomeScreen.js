import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../constants/screens/NameScreen';

const WelcomeScreen = props => {
  return (
    <>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        // style={styles.container}
      ></ImageBackground>
      <View>
        <Text>You're in! Welcome to Key Conservation.</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>LET'S GO!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default WelcomeScreen;
