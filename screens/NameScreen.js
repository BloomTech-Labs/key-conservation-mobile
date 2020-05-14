import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { AmpEvent } from '../components/withAmplitude';
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/screens/NameScreen';
import { postUser, logout } from '../store/actions';

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keybUdphipr0RgMaa' }).base(
  'appbPeeXUSNCQWwnQ'
);

class NameScreen extends React.Component {
  state = {
    nameInput: '',
    error: '',
    result: null,
    id: '',
  };

  async componentDidMount() {
    const id = await SecureStore.getItemAsync('airtableID', {});
    this.setState({ id: id });
  }

  updateAirtable = () => {
    console.log('NameScreen updateAirtable triggered');
    base('Table 1').update(
      [
        {
          id: this.state.id,
          fields: {
            isVetting: false,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        // this.navOverride();
        records.forEach(function (record) {
          console.log(record.getId());
        });
      }
    );
  }; // This sets the cuurent user's 'Table 1' form, field 'isVetting', to false. This will allow a new organization to sign up through the same device.

  handlePress = async () => {
    const sub = await SecureStore.getItemAsync('sub', {});
    const email = await SecureStore.getItemAsync('email', {});
    const role = await SecureStore.getItemAsync('roles', {});
    const name = this.state.nameInput;

    console.log(name);

    if (name.length > 4) {
      console.log('sub', sub);
      this.setState({
        error: '',
      });
      let user = {
        name: name,
        sub: sub,
        roles: role,
        email: email,
      };
      console.log('supporter', user);
      await this.props.postUser(user);
      AmpEvent('Account Created');
      this.state.id ? this.updateAirtable() : null; // Checks if organization with an airtable ID, if not then has to be a supporter.
      setTimeout(() => {
        this.navigate();
      }, 1500);
    } else {
      this.setState({
        error: 'Name is required to be at least 5 characters',
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
          <View style={styles.Card}>
            <View style={styles.textContainer}>
              <Text style={styles.obTitle}>You're in!</Text>
              <Text style={styles.obSubTitle}>
                Tell us your name to get started.
              </Text>
            </View>
            <View style={styles.inputContain}>
              <TextInput
                returnKeyType="go"
                placeholder="Bird Rescue Tennessee"
                style={styles.inputText}
                onChangeText={(text) => this.setState({ nameInput: text })}
                value={this.state.nameInput}
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
                  Please choose a name and enter it above
                </Text>
              ) : this.props.error.message ? (
                <Text style={{ textAlign: 'center', color: 'red' }}>
                  Failed to submit data
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
          </View>
        </View>
      </ScrollView>
    );
  }
}

NameScreen.navigationOptions = {
  title: 'Sign Up',
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { postUser, logout })(NameScreen);
