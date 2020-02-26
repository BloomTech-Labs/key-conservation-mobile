import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { AmpEvent } from '../components/withAmplitude';
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/screens/UsernameScreen';
import { postUser, logout } from '../store/actions';

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keybUdphipr0RgMaa' }).base(
  'appbPeeXUSNCQWwnQ'
);

class UsernameScreen extends React.Component {
  state = {
    usernameInput: '',
    error: '',
    result: null,
    id: ''
  };

  async componentDidMount() {
    const id = await SecureStore.getItemAsync('airtableID', {});
    this.setState({ id: id });
  }

  updateAirtable = () => {
    console.log('UsernameScreen updateAirtable triggered');
    base('Table 1').update(
      [
        {
          id: this.state.id,
          fields: {
            isVetting: false
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        // this.navOverride();
        records.forEach(function(record) {
          console.log(record.getId());
        });
      }
    );
  }; // This sets the cuurent user's 'Table 1' form, field 'isVetting', to false. This will allow a new organization to sign up through the same device.

  handlePress = async () => {
    const sub = await SecureStore.getItemAsync('sub', {});
    const email = await SecureStore.getItemAsync('email', {});
    const role = await SecureStore.getItemAsync('roles', {});
    const username = this.state.usernameInput;

    if (username.length > 4) {
      console.log('sub', sub);
      this.setState({
        error: ''
      });
      let user = {
        username: username,
        sub: sub,
        roles: role,
        email: email
      };
      console.log('supporter', user);
      await this.props.postUser(user);
      AmpEvent('Account Created');
      this.state.id ? this.updateAirtable() : null; // Checks if organization with an airtable ID, if not then has to be a supporter.
      setTimeout(() => {
        this.navigate();
      }, 3000);
    } else {
      this.setState({
        error: 'Username is required to be at least 5 characters'
      });
    }
  };

  navigate = () => {
    this.props.navigation.navigate(
      this.props.error ? 'CreateAccount' : 'Loading'
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
          <View style={styles.textContainer}>
            <Text style={styles.obTitle}>
              You're in! Next step: please choose a username.
            </Text>
          </View>
          <TextInput
            returnKeyType='go'
            placeholder='BirdRescueTN'
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
            <Text style={styles.touchableText}>CONTINUE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.logout}
          style={styles.touchableButton}
        >
          <View style={styles.obFwdContainer}>
            <Text style={styles.obFwdBtnText}>LOGOUT</Text>
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

export default connect(mapStateToProps, { postUser, logout })(UsernameScreen);
