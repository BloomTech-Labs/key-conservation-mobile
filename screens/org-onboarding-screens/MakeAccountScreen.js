import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/MakeAccount.js';

const MakeAccountScreen = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg4.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.obBody}>
        <View style={styles.spacer} />
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>Let's get acquainted!</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('TellAboutOrganization');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MakeAccountScreen;
