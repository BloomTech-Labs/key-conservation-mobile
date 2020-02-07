import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';

import AnimalCard from './AnimalCard';
import animalData from './animalData';
const Animals = props => {
  return (
    <ScrollView>
      <View>
        <FlatList
          bounces={false}
          scrollToOverflowEnabled={true}
          data={animalData}
          renderItem={animal => <AnimalCard {...animal.item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   animalsList: {
//     flex: 0,
//     width: '120%'
//   }
// });

export default Animals;
