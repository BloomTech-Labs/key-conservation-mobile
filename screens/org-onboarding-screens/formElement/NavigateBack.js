import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import BackArrowHeader from '../../../assets/jsicons/miscIcons/BackArrowHeader';

//NavigateBack props:
// onButtonPress -> button function
// color for arrow color='#000'
const NavigateBack = props => {
  console.log(props);
  return (
    <TouchableOpacity
      style={[styles.arrowView, { ...props }]}
      onPress={() => {
        props.onButtonPress();
      }}
    >
      <BackArrowHeader fill={props.color} width='40' height='40' />
    </TouchableOpacity>
  );
};

export default NavigateBack;

const styles = StyleSheet.create({
  arrowView: {
    // borderColor: 'red',
    // borderWidth: 2
    // zIndex: 3,
    // padding: '2.5%',
    // top: Dimensions.get('screen').height * 0.05,
    // left: Dimensions.get('screen').width * 0.05
  }
});
