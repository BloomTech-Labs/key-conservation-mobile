import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

//NavigationButton props:
// onButtonPress -> button function
// label -> text on button
// color to indicate black or white outline/text
const NavigateButton = props => {
  return (
    <TouchableOpacity
      style={
        !props.color || props.color === 'black'
          ? [styles.obFwdContainer, { ...props }]
          : [styles.obFwdContainer, styles.white, { ...props }]
      }
      onPress={() => {
        props.onButtonPress();
      }}
    >
      <Text
        style={
          !props.color || props.color === 'black'
            ? styles.obFwdBtnText
            : [styles.obFwdBtnText, styles.white, { ...props }]
        }
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigateButton;

const styles = StyleSheet.create({
  obFwdContainer: {
    width: 112,
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    margin: '10%'
  },
  obFwdBtnText: {
    fontFamily: 'Lato-Bold',
    fontStyle: 'normal',
    fontSize: responsiveFontSize(2.3),
    color: '#000000',
    margin: '5%'
  },
  white: {
    borderColor: '#fff',
    color: '#fff'
  }
});
