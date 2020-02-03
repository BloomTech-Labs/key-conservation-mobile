import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const AnimalCard = props => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.animalCard}>
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.image} />
      </View>

      <View style={styles.reportInfo}>
        <Text style={styles.animalName}>{props.name}</Text>
        <Text style={styles.link}>Learn More</Text>
        <Text style={styles.photoCred}>{props.photoCred}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animalCard: {
    // flex: 1,
    // height: 170,
    // width: 100,
    // //marginVertical: 4,
    //alignItems: 'center',
    //justifyContent: 'space-between'
  },
  imageContainer: {
    //borderColor: 'orange',
    //borderWidth: 2
    //height: 170,
    //width: '100%'
  },
  image: {
    // flex: 1,
    // borderRadius: 8,
    // borderColor: 'red',
    // borderWidth: 2
    //overflow: 'hidden'
  },
  reportInfo: {
    //marginHorizontal: -26
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
  link: {},
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
