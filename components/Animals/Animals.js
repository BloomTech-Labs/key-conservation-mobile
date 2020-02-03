import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import AnimalCard from './AnimalCard';
import animalData from './animalData';

const Animals = props => {
  return (
    <View style={styles.animalsList}>
      <FlatList
        data={animalData}
        renderItem={animal => <AnimalCard {...animal.item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animalsList: {
    // borderWidth: 2,
    // borderColor: 'red',
    flex: 1,
    width: '100%'
  }
});

export default Animals;
