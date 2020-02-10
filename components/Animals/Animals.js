import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';

import AnimalCard from './AnimalCard';
import animalData from './animalData';
const Animals = props => {
  return (
    <View style={styles.animalsList}>
      <FlatList
        bounces={false}
        scrollToOverflowEnabled={true}
        // alwaysBounceVertical={false}
        data={animalData}
        renderItem={animal => <AnimalCard {...animal.item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animalsList: {
    flex: 1,
    width: '100%'
  }
});

export default Animals;
