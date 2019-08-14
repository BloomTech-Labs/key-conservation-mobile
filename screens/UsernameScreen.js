import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

//import { Input } from 'react-native-elements';

//import styles from '../constants/Stylesheet';

import { postUser } from '../store/actions';

class UsernameScreen extends React.Component {
  state = {
    usernameInput: '',
    error: ''
  };

  handlePress = async () => {
    const { error } = this.props;
    const sub = await SecureStore.getItemAsync('sub', {});
    const email = await SecureStore.getItemAsync('email', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    const username = this.state.usernameInput;

    if (username.length > 4) {
      this.setState({
        error: ''
      });
      let user = {
        username: username,
        sub: sub,
        roles: roles,
        email: email
      };
      // console.log('******click from username', user);
      await this.props.postUser(user);
      this.props.navigation.navigate(
        this.props.error ? 'CreateAccount' : 'Loading'
      );
    } else {
      this.setState({
        error: 'Username is required to be at least 5 characters'
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
          <View style={styles.textContainer}>
            <Text style={{ textAlign: 'center' }}>Thanks for signing up!</Text>
          </View>
          <TextInput
            returnKeyType='go'
            placeholder='ex: carribbeanturtleproject'
            style={styles.inputContain}
            onChangeText={text => this.setState({ usernameInput: text })}
            value={this.state.usernameInput}
            required
          />
        </View>
        <View style={{ height: 20, margin: 25 }}>
          {this.state.error ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {this.state.error}
            </Text>
          ) : this.props.error.config &&
            this.props.error.config.method === 'get' ? (
            <Text style={{ textAlign: 'center', color: 'green' }}>
              Please choose a username and enter it above
            </Text>
          ) : this.props.error.message ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>
              Failed to create user. Please try another username
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

UsernameScreen.navigationOptions = {
  title: 'Sign Up'
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { postUser }
)(UsernameScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 15,
    flex: 1,
    alignItems: 'center'
  },
  Card: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '100%',
    padding: 25
  },
  inputContain: {
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 3,
    fontSize: 16,
    width: 281,
    height: 38
  },
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableView: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    width: 243
  },
  touchableText: {
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },

  textContainer: {
    width: 279,
    height: 43,
    marginBottom: 33,
    fontSize: 16,
    flexWrap: 'wrap',
    letterSpacing: 2
  }
});
