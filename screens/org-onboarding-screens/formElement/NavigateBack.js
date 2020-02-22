import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import BackArrowHeader from '../../../assets/jsicons/miscIcons/BackArrowHeader';

//NavigateBack props:
// onArrowPress -> button function
const NavigateBack = props => {
  return (
    <TouchableOpacity
      style={
        !props.color
          ? [styles.arrowView, { ...props }]
          : [styles.arrowView, styles.white, { ...props }]
      }
      style={styles.arrowView}
      onPress={() => {
        props.onArrowPress();
      }}
    >
      <BackArrowHeader />
    </TouchableOpacity>
  );
};

export default NavigateBack;

const styles = StyleSheet.create({
  arrowView: {
    zIndex: 3,
    position: 'absolute',
    padding: '15%',
    top: '2.5%'
  }
});
