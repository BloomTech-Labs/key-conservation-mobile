import React from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
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
    return (
      <ScrollView>
                <View>
            <Text>Hey There!</Text>
            <Text>We can't wait to get your organization on board.</Text>
            <Text>After just a brief overview of our process, you'll be on your way to creating a custom page for your organization.</Text>
            <Button 
                title="Next"
                onPress={() => {
                    this.props.navigation.navigate("ToExpect");
                }}
            />
        </View>

        {/* <TouchableOpacity
          onPress={this.logoutPress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Logout</Text>
          </View>
        </TouchableOpacity> */}
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
