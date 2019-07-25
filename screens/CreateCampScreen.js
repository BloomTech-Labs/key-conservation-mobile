import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Create Camp</Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Create Campaign'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
