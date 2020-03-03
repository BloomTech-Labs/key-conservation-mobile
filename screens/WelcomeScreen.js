import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../constants/screens/org-onboarding-styles/WelcomeScreen';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const WelcomeScreen = props => {
  return (
    <>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.background}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={styles.touchableButton}
          >
            <View style={styles.button}>
              <Text
                style={{
                  ...styles.buttonText,
                  fontSize: responsiveFontSize(2.3)
                }}
              >
                LET'S GO!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;
