import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  TouchableHighlight,
  Image,
  FlatList
} from 'react-native';

import AnimalCard from './AnimalCard';

const Animals = props => {
  const animalData = [
    {
      image: '../../assets/images/africanelephant.png',
      name: 'African Elephant',
      wwfLink: 'https://www.worldwildlife.org/species/african-elephant',
      photoCred: "Photographer's Name"
    },
    {
      image: '../../assets/images/whaleshark.png',
      name: 'Whale Shark',
      wwfLink: 'https://www.worldwildlife.org/species/whale-shark',
      photoCred: "Photographer's Name"
    },
    {
      image: '../../assets/images/tortoise.png',
      name: 'Giant Tortoise',
      wwfLink: 'https://www.worldwildlife.org/species/giant-tortoise',
      photoCred: "Photographer's Name"
    }
  ];

  // const animalData = [
  //   "require('../../assets/images/loginscreen2.png')",
  //   "require('../../assets/images/loginscreen2.png')",
  //   "require('../../assets/images/loginscreen2.png')",
  //   "require('../../assets/images/loginscreen2.png')"
  // ];

  return (
    <View style={styles.animalsList}>
      <Text style={styles.title}>
        Click to learn more about these beautiful Animals!
      </Text>
      <View style={styles.reportList}>
        <FlatList
          data={animalData}
          renderItem={animal => <AnimalCard {...animal} />}
          keyExtractor={item => item.index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animalsList: {
    flex: 1,
    //backgroundColor: "pink",
    padding: 12
    //height: 80,
    //borderColor: 'blue',
    //borderWidth: 2
  },
  title: {
    //backgroundColor: "yellow",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16
    //marginHorizontal: 8,
    //borderColor: 'blue',
    //borderWidth: 2
  }
});

export default Animals;
