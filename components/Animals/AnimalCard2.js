import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent } from '../../components/withAmplitude';

import Collapsible2 from '../../components/Collapsible2';

import ChevronLeft from '../../assets/jsicons/miscIcons/ChevronLeftSolid';

const AnimalCard2 = props => {
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
    <Collapsible2 collapsed={!selected} image={props.image}>
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
        {/* <TouchableOpacity */}
        {/* style={styles.chevronTouch}
          //   onPress={() => setSelected(!selected)}
        > */}

        {/* </TouchableOpacity> */}
      </View>
    </Collapsible2>
    // </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignSelf: 'auto'
  },
  imageSelected: {
    aspectRatio: 1,
    height: 200
  },
  animalInfo: {
    bottom: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    right: '105%',
    height: '20%',
    width: '90%',
    borderRadius: 5,
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
    fontFamily: 'Lato',
    padding: 5
  },
  photoCred: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Lato',
    paddingBottom: 5
  },
  chevronTouch: {
    zIndex: 3,
    // borderColor: 'red',
    // borderWidth: 2,
    right: 70,
    bottom: 15,
    color: 'white'
  },
  chevron: {},
  chevronDown: {}
});

export default AnimalCard2;
