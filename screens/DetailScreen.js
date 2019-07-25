import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function DetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Detail Screen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
