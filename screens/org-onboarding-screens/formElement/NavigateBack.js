import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import BackArrow from '../../../assets/jsicons/miscIcons/BackArrow';

//NavigateBack props:
// onButtonPress -> button function
// color for arrow ex: color='#000'
const NavigateBack = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onButtonPress();
      }}
    >
      <BackArrow fill={props.color} width='40' height='40' />
    </TouchableOpacity>
  );
};

export default NavigateBack;
