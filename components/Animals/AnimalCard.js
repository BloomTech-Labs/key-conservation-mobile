import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent } from '../../components/withAmplitude';

import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftSolid';

const AnimalCard = props => {
  const [selected, setSelected] = useState(false);
  //console.log(props);

  const WebsiteClick = async () => {
    if (props.link && props.link !== null) {
      (await WebBrowser.openBrowserAsync(props.link)) &&
        AmpEvent('Website Link Clicked');
    }
  };

  return (
    // <TouchableOpacity onPress={() => setSelected(!selected)}>
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
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animalCard: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('screen').height * 0.11,
    width: Dimensions.get('screen').width,
    justifyContent: 'flex-start',
    alignItems: 'center'
    //left: '25%'
  },
  animalCardSelected: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.66
    //left: '32%'
  },
  image: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    alignItems: 'flex-start'
  },
  animalInfo: {
    bottom: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    right: '105%',
    height: '10%',
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#F4F5F7'
  },
  animalInfoHidden: {
    display: 'none'
  },
  infoLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  animalName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    alignItems: 'center',
    paddingTop: 5
  },
  link: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 5,
    borderRadius: 10,
    backgroundColor: '#d7ff43',
    fontFamily: 'Lato-Bold',
    padding: 5
  },
  photoCred: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Lato-Bold',
    paddingBottom: 5
  },
  chevronTouch: {
    transform: [{ rotateZ: '180deg' }],
    zIndex: 3,
    position: 'absolute',
    right: 0,
    top: 9,
    padding: 25
  },
  chevronSelected: {
    transform: [{ rotateZ: '90deg' }]
  }
});

export default AnimalCard;
