import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent } from '../../components/withAmplitude';

const AnimalCard = props => {
  const [selected, setSelected] = useState(false);
  const [cardStyle, setCardStyle] = useState(styles.animalCard);
  const [imageStyle, setImageStyle] = useState(styles.image);
  const [infoStyle, setInfoStyle] = useState(styles.animalInfo);

  useEffect(() => {
    if (selected === true) {
      setCardStyle(styles.animalCardSelected);
      setImageStyle(styles.imageSelected);
      setInfoStyle(styles.animalInfoSelected);
    } else {
      setCardStyle(styles.animalCard);
      setImageStyle(styles.image);
      setInfoStyle(styles.animalInfo);
    }
  }, [selected]);

  const WebsiteClick = async () => {
    if (props.wwfLink && props.wwfLink !== null) {
      (await WebBrowser.openBrowserAsync(props.wwfLink)) &&
        AmpEvent('Website Link Clicked');
    }
  };

  return (
    <View style={cardStyle}>
      <TouchableOpacity onPress={() => setSelected(!selected)}>
        <View style={styles.imageContainer}>
          <View style={infoStyle}>
            <Text style={styles.animalName}>{props.name}</Text>
            <Text style={styles.link} onPress={WebsiteClick}>
              Learn More
            </Text>
            <Text style={styles.photoCred}>{props.photoCred}</Text>
          </View>
          <Image
            source={props.image}
            style={imageStyle}
            resizeMode='cover'
            offset={{ x: -250, y: 250 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  animalCard: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    height: 120,
    width: 340,
    borderRadius: 8,
    alignItems: 'center'
  },
  animalCardSelected: {
    borderColor: 'red',
    borderWidth: 2,
    flex: 2,
    height: 340,
    width: 340,
    borderRadius: 8,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    borderColor: 'orange',
    borderWidth: 2,
    paddingVertical: 1.2,
    width: 335
  },
  image: {
    flex: 1,
    //resizeMode: 'cover',
    aspectRatio: 2.8,
    //paddingVertical: 2,
    borderRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'yellow',
    // borderWidth: 2,
    //width: '100%',
    height: '100%'
    //overflow: 'hidden'
  },
  imageSelected: {
    flex: 2,
    //resizeMode: 'cover',
    aspectRatio: 1,
    //paddingVertical: 2,
    borderRadius: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'yellow',
    // borderWidth: 2,
    //width: '100%',
    height: '100%'
    //overflow: 'hidden'
  },
  animalInfoSelected: {
    top: 140,
    height: '60%',
    zIndex: 3,
    borderRadius: 10,
    borderColor: '#00F48A',
    borderWidth: 4,
    backgroundColor: '#F4F5F7'
  },
  animalInfo: {
    display: 'none'
  },
  animalName: {
    //color: 'black',
    // fontSize: 20,
    // fontWeight: 'bold',
    // borderColor: 'red',
    // borderWidth: 2,
    // borderRadius: 10,
    // padding: 8
  },
  link: {
    borderRadius: 8,
    borderColor: '#3b3b3b',
    borderWidth: 2,
    backgroundColor: '#d7ff43'
  },
  photoCred: {}
  //   left: {
  //     flex: 4,
  //     flexDirection: 'row',
  //     alignItems: 'center'
  //     //borderColor: "red",
  //     //borderWidth: 2
  //   },
  //   right: {
  //     justifyContent: 'center',
  //     flex: 1,
  //     alignItems: 'center'
  //   }
});

export default AnimalCard;
