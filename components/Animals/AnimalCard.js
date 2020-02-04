import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent } from '../../components/withAmplitude';

const AnimalCard = props => {
  const [selected, setSelected] = useState(false);

  const WebsiteClick = async () => {
    if (props.link && props.link !== null) {
      (await WebBrowser.openBrowserAsync(props.link)) &&
        AmpEvent('Website Link Clicked');
    }
  };

  return (
    <TouchableOpacity onPress={() => setSelected(!selected)}>
      <View
        style={[
          styles.animalCard,
          selected === true && styles.animalCardSelected
        ]}
      >
        <View>
          <Image
            source={props.image}
            style={[styles.image, selected === true && styles.imageSelected]}
            resizeMode='cover'
          />
        </View>
        <View
          style={[
            styles.animalInfo,
            selected === false && styles.animalInfoHidden
          ]}
        >
          <Text style={styles.animalName}>{props.name}</Text>
          <Text style={styles.link} onPress={WebsiteClick}>
            Learn More
          </Text>
          {props.photoCred && props.photoCred !== '' ? (
            <Text style={styles.photoCred}>Photo by: {props.photoCred}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animalCard: {
    flex: 1,
    flexDirection: 'row',
    flex: 1,
    height: 120,
    width: 340,
    borderRadius: 8,
    alignItems: 'center'
  },
  animalCardSelected: {
    flex: 1,
    height: 340
  },
  image: {
    flex: 1,
    aspectRatio: 2.87,
    width: '200%',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignSelf: 'auto'
  },
  imageSelected: {
    aspectRatio: 1,
    height: 200
  },
  animalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    right: '85%',
    height: '40%',
    width: '70%',
    borderRadius: 10,
    borderColor: '#00F48A',
    borderWidth: 4,
    backgroundColor: '#F4F5F7'
  },
  animalInfoHidden: {
    display: 'none'
  },
  animalName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    alignItems: 'center',
    padding: 5
  },
  link: {
    borderRadius: 5,
    borderColor: '#3b3b3b',
    borderWidth: 2,
    backgroundColor: '#d7ff43',
    fontFamily: 'Lato',
    padding: 5
  },
  photoCred: {
    padding: 5,
    fontFamily: 'Lato'
  }
});

export default AnimalCard;
