import React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/KeyConservation.js';

import SvgUri from 'react-native-svg-uri';

const KeyConservationScreen = props => {
  return (
    <View style={styles.obBody}>
      <SvgUri
        style={styles.svg}
        source={require('./../../assets/icons/How-it-works.svg')}
      />
      <TouchableOpacity
        style={styles.obFwdContainer}
        onPress={() => {
          props.navigation.navigate('Can');
        }}
      >
        <Text style={styles.obFwdBtnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KeyConservationScreen;
