import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import AnimalCard from "./AnimalCard";

const Animals = props => {
  const animalData = [
    {
      image: "../../assets/images/africanelephant.png",
      name: "African Elephant",
      wwfLink: "https://www.worldwildlife.org/species/african-elephant"
    },
    {
      image: "../../assets/images/whaleshark.png",
      name: "Whale Shark",
      wwfLink: "https://www.worldwildlife.org/species/whale-shark"
    },
    {
      image: "../../assets/images/africanelephant.png",
      name: "Giant Tortoise",
      wwfLink: "https://www.worldwildlife.org/species/giant-tortoise"
    }
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Click to learn more about these beautiful Animals!
      </Text>
      <View style={styles.reportList}>
        <ScrollView>
          {animalData.map(animal => (
            <AnimalCard animal={animal} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242,242,251)"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    marginHorizontal: 8
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8
  },
  tabSelector: {
    width: "100%",
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    justifyContent: "space-between"
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center"
  },
  tabText: {
    flex: 1,
    letterSpacing: 0.7,
    fontSize: 17
  },
  reportList: {
    flex: 1,
    padding: 12,
    flexDirection: "column"
  },
  selectedTab: {
    width: "100%",
    backgroundColor: "#00FF9D",
    height: 3
  }
});

export default Animals;
