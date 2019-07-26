import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
       <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            // onPress={}
          >
            <View style={styles.ButtonStyle}>
              <Text style={styles.CancelButton}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}>
            <View style={styles.ButtonStyle}>
              <Text style={styles.PublishButton}>Publish</Text>
            </View>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Create Campaign'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomColor: 'whitesmoke'
  },
  TouchableOpacity: {
    flex: 1
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1,
  },
  CancelButton: {
    fontSize: 18,
    color: 'black'
  },
  PublishButton: {
    fontSize: 18,
    color: 'black',
    fontWeight: "bold"
  }
});
