import React from 'react';
import { View, FlatList } from 'react-native';

import AnimalCard from './AnimalCard';
import animalData from './animalData';
const Animals = () => {
  return (
    <View>
      <FlatList
        bounces={false}
        scrollToOverflowEnabled={true}
        data={animalData}
        renderItem={animal => <AnimalCard {...animal.item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Animals;
