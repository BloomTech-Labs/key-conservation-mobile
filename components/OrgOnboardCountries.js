import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import X from '../assets/jsicons/miscIcons/X';

const OrgOnboardCountries = props => {
  const { name } = props;

  const removeSelected = name => {
    return props.setSelectedCountries(
      props.selectedCountries.filter(country => country !== name)
    );
  };

  return (
    <View style={styles.aroundName}>
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity
        style={styles.aroundX}
        onPress={() => {
          removeSelected(name);
        }}
      >
        <X />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  aroundName: {
    backgroundColor: '#3FFFB3',
    margin: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    height: 40
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    padding: 10
  },
  aroundX: {
    alignSelf: 'flex-end',
    left: 10,
    bottom: '120%'
  }
});

export default OrgOnboardCountries;
