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
import { images } from './images';
import {
  africanelephant,
  africanwilddog,
  bongo,
  bubble,
  gorilla,
  greatgreen,
  kakapo,
  pangolin,
  tortoise,
  whaleshark,
  zebra
} from './images';
//import africanelephant from '../../assets/images/africanelephant.png';
//import whaleshark from '../../assets/images/whaleshark.png';
//import tortoise from '../../assets/images/tortoise.png';

const Animals = props => {
  const animalData = [
    {
      id: 1,
      image: africanelephant,
      name: 'African Elephant',
      wwfLink: 'https://www.worldwildlife.org/species/african-elephant',
      photoCred: "Photographer's Name"
    },
    {
      id: 2,
      image: whaleshark,
      name: 'Whale Shark',
      wwfLink: 'https://www.worldwildlife.org/species/whale-shark',
      photoCred: "Photographer's Name"
    },
    {
      id: 3,
      image: tortoise,
      name: 'Giant Tortoise',
      wwfLink: 'https://www.worldwildlife.org/species/giant-tortoise',
      photoCred: "Photographer's Name"
    },
    {
      id: 4,
      image: africanwilddog,
      name: 'Afican Wild Dog',
      wwfLink: 'https://www.worldwildlife.org',
      photoCred: "Photographer's Name"
    },
    {
      id: 5,
      image: bongo,
      name: 'Bongo',
      wwfLink: 'https://google.com',
      photoCred: "Photographer's Name"
    },
    {
      id: 6,
      image: bubble,
      name: 'Bubble???',
      wwfLink: 'https://www.worldwildlife.org',
      photoCred: "Photographer's Name"
    },
    {
      id: 7,
      image: gorilla,
      name: 'Gorilla',
      wwfLink: 'https://www.worldwildlife.org',
      photoCred: "Photographer's Name"
    },
    {
      id: 8,
      image: greatgreen,
      name: 'Great Green??',
      wwfLink: 'https://www.worldwildlife.org',
      photoCred: "Photographer's Name"
    },
    {
      id: 9,
      image: kakapo,
      name: 'Kakapo',
      wwfLink: 'https://www.worldwildlife.org',
      photoCred: "Photographer's Name"
    },
    {
      id: 10,
      image: pangolin,

      name: 'Pangolin',
      wwfLink: 'https://www.worldwildlife.org/species/pangolin',
      photoCred: "Photographer's Name"
    },
    {
      id: 11,
      image: zebra,
      name: 'Zebra',
      wwfLink: 'https://www.worldwildlife.org/species/zebra',
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
      <FlatList
        //scrollToOffset={{ offset: 100, animated: false }}
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
    //padding: 8,
    width: '100%'
    //height: 80,
    // borderColor: 'blue',
    // borderWidth: 2
    //backgroundColor: "pink",
  }
});

export default Animals;
