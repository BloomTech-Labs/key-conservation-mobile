import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function FeedScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Feed</Text>
    </ScrollView>
  );
}

FeedScreen.navigationOptions = {
  title: 'Feed'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
