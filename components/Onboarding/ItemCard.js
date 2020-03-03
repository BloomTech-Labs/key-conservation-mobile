import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemCard = props => {
  const { item } = props;
  const listItems = item.split(',');

  return listItems.map((item, index) => {
    return (
      <View style={styles.aroundName} key={index}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  aroundName: {
    backgroundColor: '#3FFFB3',
    margin: 8,
    marginLeft: '5%',
    borderRadius: 5,
    alignSelf: 'flex-start',
    height: 40
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    padding: 10
  }
});

export default ItemCard;
