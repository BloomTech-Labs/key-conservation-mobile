import React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/KeyConservation.js';

const KeyConservationScreen = props => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg3.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.obBody}>
        <View style={styles.spacer} />
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>
            Let's go over how Key Conservation works
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('Can');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default KeyConservationScreen;
