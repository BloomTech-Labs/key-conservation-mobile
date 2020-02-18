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
      <TouchableOpacity onPress={logoutPressed} style={styles.arrowView}>
        <Image source={require('../../assets/images/onboarding/w_arrow.png')} />
      </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('ToExpect');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeyThereScreen;
