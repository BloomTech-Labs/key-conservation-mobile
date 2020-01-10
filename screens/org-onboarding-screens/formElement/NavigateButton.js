import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const NavigateButton = props => {
  return (
    <TouchableOpacity
      style={styles.obFwdContainer}
      onPress={() => {
        props.onButtonPress();
      }}
    >
      <Text style={styles.obFwdBtnText}>{props.label}</Text>
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
    borderRadius: 20,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: '5%'
  },
  obFwdBtnText: {
    fontFamily: 'Lato-Bold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000'
  }
});
