import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/KeyConservation.js';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';

const KeyConservationScreen = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg3.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.arrowView}>
        <NavigateBack
          color='white'
          onButtonPress={() => {
            props.navigation.navigate('ToExpect');
          }}
        />
      </View>
      <View style={styles.obBody}>
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>
            Let's go over how Key Conservation works
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <NavigateButton
          onButtonPress={() => {
            props.navigation.navigate('Can');
          }}
          color='white'
          label='Next'
        />
      </View>
    </ImageBackground>
  );
};

export default KeyConservationScreen;
