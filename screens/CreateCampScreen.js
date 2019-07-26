import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Input } from 'react-native-elements';

export default function LinksScreen() {
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#F2F2FB' }}>
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
      <View style={styles.camera}>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <Text style={styles.CameraContainerButton}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <Text style={styles.CameraContainerButton}>Library</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.Card}>
          <Input
            inputContainerStyle={styles.inputContain}
            shake={true}
            placeholder='Campaign Name:'
          />
          <Text style={styles.cardPara}>
            Add campaign details and a list of monitary needs.
          </Text>
        </View>
        <View style={styles.Card}>
          <Text style={styles.cardText}>Support our mission</Text>
          <Input
            inputContainerStyle={styles.inputContain}
            shake={true}
            placeholder='Donation link here:'
          />
        </View>
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Create Campaign'
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: 'whitesmoke',
    paddingLeft: 10,
    paddingRight: 10
  },
  TouchableOpacity: {},
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  CancelButton: {
    fontSize: 16,
    color: 'black'
  },
  PublishButton: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  camera: {
    backgroundColor: '#C4C4C4',
    width: '100%',
    height: 150,
    flexDirection: 'row'
  },
  CameraContainerButton: {
    marginTop: 120,
    marginRight: 10,
    marginLeft: 10
  },
  inputContain: {
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 3
  },
  Card: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 25
  },
  cardPara: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13
  }
});
