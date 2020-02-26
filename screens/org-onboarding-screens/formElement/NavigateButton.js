import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

//NavigationButton props:
// onButtonPress -> button function
// label -> text on button
// color to indicate black or white outline/text
// inactive bool
const NavigateButton = props => {
  return (
    <TouchableOpacity
      style={
        props.inactive === true
          ? [styles.obFwdContainer, styles.inactive]
          : !props.color || props.color === 'black'
          ? [styles.obFwdContainer]
          : [styles.obFwdContainer, styles.white]
      }
      onPress={() => {
        props.onButtonPress();
      }}
    >
      <Text
        style={
          props.inactive === true
            ? [styles.obFwdBtnText, styles.inactive]
            : !props.color || props.color === 'black'
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
    alignItems: 'center',
    marginBottom: '10%',
    marginRight: '10%',
    marginTop: '3%'
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
  },
  inactive: {
    borderColor: '#E0E0E0',
    color: '#E0E0E0'
  }
});
