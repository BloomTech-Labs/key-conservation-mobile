import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/HeyThere.js';
import { logout } from '../../store/actions';
import { useDispatch } from 'react-redux';

import NavigateButton from './formElement/NavigateButton';
import BackArrowHeader from '../../assets/jsicons/miscIcons/BackArrowHeader.js';
import NavigateBack from './formElement/NavigateBack.js';

const HeyThereScreen = props => {
  const dispatch = useDispatch();

  const logoutPressed = () => {
    dispatch(logout());
  };
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding/sg2.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <NavigateBack
        onArrowPress={() => {
          dispatch(logout());
        }}
        logoutPressed={logoutPressed}
      />
      <View style={styles.obBody}>
        <View style={styles.spacer} />
        <View style={styles.obBorderView}>
          <Text style={styles.obTitle}>Hey There!</Text>
          <Text style={styles.obSubtitle}>
            We can't wait to get your organization on board.
          </Text>
          <Text style={styles.obText}>
            After just a brief overview of our process, you'll be on your way to
            creating a custom page for your organization.
          </Text>
        </View>
        <View style={styles.buttons}>
          <NavigateButton
            onButtonPress={() => {
              props.navigation.navigate('ToExpect');
            }}
            color='white'
            label='Next'
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeyThereScreen;
