import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import SvgUri from 'react-native-svg-uri';

const AnimalCard = props => {
  const image = `require("${props.item.image}")`;
  console.log(image);
  return (
    <View style={styles.animalCard}>
      <View style={styles.left}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tortoise.png')}
            style={styles.image}
          />
          {/* <Image source={image} style={{ width: 50, height: 50 }} /> */}
        </View>

        <View style={styles.reportInfo}>
          <Text style={styles.animalName}>{props.item.name}</Text>
          {/* <Text style={styles.animalName}>Learn More</Text> */}
        </View>
      </View>

      <View style={styles.right}>
        <View style={styles.arrowContainer}>
          <SvgUri
            style={styles.arrowIcon}
            fill='#00F48A'
            width='31'
            height='31'
            source={require('../../assets/icons/plus.svg')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animalCard: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    height: 48,
    width: 48
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: 50,
    width: 300
  },
  reportInfo: {
    marginHorizontal: -26
  },
  animalName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    // borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 10,
    padding: 8
  },
  arrowContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
    //borderColor: "red",
    //borderWidth: 2
  },
  arrowIcon: {
    transform: [{ rotateZ: '180deg' }],
    paddingVertical: 18
  },
  left: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center'
    //borderColor: "red",
    //borderWidth: 2
  },
  right: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  }
});

export default AnimalCard;
