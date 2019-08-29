import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { AmpEvent } from '../components/withAmplitude';
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/screens/UsernameScreen';
import { postUser, logout } from '../store/actions';

class UsernameScreen extends React.Component {
  state = {
    usernameInput: '',
    error: ''
  };

  handlePress = async () => {
    const { error } = this.props;
    const sub = await SecureStore.getItemAsync('sub', {});
    const email = await SecureStore.getItemAsync('email', {});
    const role = await SecureStore.getItemAsync('roles', {});
    const username = this.state.usernameInput;

    if (username.length > 4) {
      this.setState({
        error: ''
      });
      let user = {
        username: username,
        sub: sub,
        roles: role,
        email: email
      };
      // console.log('******click from username', user);
      await this.props.postUser(user);
      AmpEvent('Account Created')
      this.props.navigation.navigate(
        this.props.error ? 'CreateAccount' : 'Loading'
      );
    } else {
      this.setState({
        error: 'Username is required to be at least 5 characters'
      });
    }
  };

  logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    this.props.logout();
    this.props.navigation.navigate('Loading');
  };

  render() {
    //console.log(this.props);
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
        <TouchableOpacity
          onPress={this.logoutPress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Logout</Text>
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
  { postUser, logout }
)(UsernameScreen);
