import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

//NavigationButton props:
// onButtonPress -> button function
// label -> text on button
// color to indicate black or white outline/text
const NavigateButton = props => {
  return (
    <TouchableOpacity
      style={
        !props.color
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
            : [styles.obFwdBtnText, styles.white]
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
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    top: Dimensions.get('screen').height * 0.1,
    right: Dimensions.get('screen').width * 0.01
  },
  obFwdBtnText: {
    fontFamily: 'Lato-Bold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000'
  },
  white: {
    borderColor: '#fff',
    color: '#fff'
  }
});
