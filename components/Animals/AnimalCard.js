import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const AnimalCard = props => {
console.log(props.animal.image);
    return (
       <View style={styles.reportCard}>
           <View style={styles.imageContainer}>
               <Text>{props.animal.name}</Text>
          {/* <Image source={require(props.animal.image)} style={styles.image}></Image> */}
        </View>

       </View>
    )
};

const styles = StyleSheet.create({
    reportCard: {
      flex: 1,
      flexDirection: "row",
      height: 48,
      marginVertical: 4,
      alignItems: "center",
      justifyContent: "space-between"
    },
    imageContainer: {
      height: 48,
      width: 48
    },
    image: {
      flex: 1,
      borderRadius: 40,
      height: null,
      width: null
    },
    reportInfo: {
      marginHorizontal: 6
    },
    reportName: {
      fontSize: 16
    },
    reportType: {
      fontSize: 12,
      color: "grey"
    },
    reportCount: {},
    arrowContainer: {
      width: "10%",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    },
    arrowIcon: {
      transform: [{ rotateZ: "180deg" }],
      paddingVertical: 18,
    },
    left: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    right: {
      justifyContent: "flex-end",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    }
  });

export default AnimalCard;
