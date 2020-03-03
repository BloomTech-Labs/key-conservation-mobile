import React from 'react';

import { View, Text, ImageBackground } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';
import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';

const MakeAccountScreen = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg4.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.arrowView}>
        <NavigateBack
          onButtonPress={() => {
            props.navigation.navigate('Cant');
          }}
          color='#FFF'
        />
      </View>
      <View style={styles.obBody}>
        <View style={styles.spacer} />
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>Let's begin!</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <NavigateButton
          onButtonPress={() => {
            props.navigation.navigate('TellAboutOrganization');
          }}
          //   onButtonPress={() => {
          //     props.navigation.navigate('AlmostDone');
          //   }}
          color='white'
          label='Next'
        />
      </View>
    </ImageBackground>
  );
};

export default MakeAccountScreen;
