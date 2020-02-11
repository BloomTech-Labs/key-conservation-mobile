import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent } from '../../components/withAmplitude';

import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftSolid';

import styles from '../../constants/Animals/AnimalCard';

const AnimalCard = props => {
  const [selected, setSelected] = useState(false);

  const WebsiteClick = async () => {
    if (props.link && props.link !== null) {
      (await WebBrowser.openBrowserAsync(props.link)) &&
        AmpEvent('Website Link Clicked');
    }
  };

  return (
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
        <TouchableOpacity
          style={[
            styles.chevronTouch,
            selected === true && styles.chevronSelected
          ]}
          onPress={() => setSelected(!selected)}
        >
          <ChevronLeft />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.animalInfo,
          selected === false && styles.animalInfoHidden
        ]}
      >
        <View style={styles.infoLeft}>
          <Text style={styles.animalName}>{props.name}</Text>
          {props.photoCred && props.photoCred !== '' ? (
            <Text style={styles.photoCred}>© {props.photoCred}</Text>
          ) : null}
        </View>
        <Text style={styles.link} onPress={WebsiteClick}>
          Learn More
        </Text>
      </View>
    </View>
  );
};

export default AnimalCard;
