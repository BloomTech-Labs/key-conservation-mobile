import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        display: 'none'
      }
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/keyFullBlack.png')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.SelectText}>Select one:</Text>
        </View>
        <View style={styles.buttons}>
          {/* <View style={styles.buttonContainer}> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Main')}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>CONSERVATION ORGANIZATION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Alt')}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>GLOBAL SUPPORTER</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.needHelp}>
          <Text style={styles.needHelpText}>Not sure which one to pick?</Text>
          <Button
            title='Click Here'
            style={styles.needHelpText}
            onPress={() => console.log('help')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    // height: 667,
    // width: 375
  },
  button: {
    // margin: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 189,
    width: 189
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    // marginTop: 20,
    // marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SelectText: {
    fontSize: 27,
    fontFamily: 'Lato'
    // marginTop: 64
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '2.5%',
    // marginBottom: 50,
    // marginTop: 50,
    width: '90%'
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    marginBottom: 18,
    borderRadius: 4,
    // fontFamily:  'ArchivoNarrow',
    backgroundColor: 'black',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'ArchivoNarrow',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  needHelp: {
    flexDirection: 'row',
    width: 375,
    height: '7.9%',
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  needHelpText: {
    color: 'white'
  },
  needHelpButton: {
    color: 'white',
    textDecorationLine: 'underline'
  }
});
