import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { Input } from 'react-native-elements';

import PublishButton from '../components/PublishButton';

export default class LinksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold',
      },
      headerRight: <PublishButton />
    };
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={165}
        enabled
      >
        <View>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '#F2F2FB',
              minHeight: '100%'
            }}
          >
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
                <Input
                  inputContainerStyle={styles.inputContain}
                  shake={true}
                  placeholder='Campaign Image URL:'
                />
                <Input
                  inputContainerStyle={styles.inputContain}
                  shake={true}
                  placeholder='Campaign Details:'
                />
                <Input
                  inputContainerStyle={styles.inputContain}
                  shake={true}
                  placeholder='Donation Link:'
                />
                <Input
                  inputContainerStyle={styles.inputContain}
                  shake={true}
                  placeholder='Donation Message:'
                />
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
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
    paddingRight: 10,
    height: 75
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
