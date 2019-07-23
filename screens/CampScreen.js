import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';


export default function CampScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <Text>Camp</Text>
    </ScrollView>
  );
}

CampScreen.navigationOptions = {
  title: 'Camp',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
