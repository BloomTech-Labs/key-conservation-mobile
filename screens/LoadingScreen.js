import React from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import {
  getLoadingData,
  getProfileData,
  afterFirstLogin,
  logout
} from '../store/actions';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { AmpEvent, AmpInit } from '../components/withAmplitude';
import styles from '../constants/screens/LoadingScreen';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  logoutPress = async props => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    this.props.logout();

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    }
    this.props.navigation.navigate('Logout');
  };

  getAirtable = key => {
    if (!key) {
      console.log('NO KEY!');
      return null;
    } else {
      console.log('LoadingScreen getAirtable activated.');
      var Airtable = require('airtable');
      var base = new Airtable({ apiKey: key }).base('appbPeeXUSNCQWwnQ'); // variables for Airtable API.

      // Checks airtable form if conservationist is in vetting process.
      base('Table 1')
        .select({
          maxRecords: 20,
          view: 'Grid view',
          filterByFormula: `{email} = \'${this.state.email}\'`
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function(record) {
              // console.log("Retrieved", record.fields);
              this.checkAirtable(record); // calls method inside componentDidMount and passes in record.
            });
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
    }
  };

  async componentDidMount() {
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    const email = await SecureStore.getItemAsync('email', {});
    const isVetting = await SecureStore.getItemAsync('isVetting', {});
    const email2 = await SecureStore.getItemAsync('vettingEmail', {});
    const key = await SecureStore.getItemAsync('airtableKey', {});
    // await SecureStore.deleteItemAsync('isVetting', {});
    // await SecureStore.deleteItemAsync('vettingEmail', {});

    this.setState({ email: email });

    roles === 'conservationist' ? this.getAirtable(key) : null;

    checkAirtable = (record, props) => {
      // console.log("record: " + record.isVetting);
      console.log('LoadingScreen checkAirtable activated.');
      if (record.fields.isVetting === true) {
        this.props.navigation.navigate('Vetting');
      } else {
        // if in vetting process, sends them back to VettingCheck, otherwise component runs as usual.
        return null;
      }
    };

    if (
      isVetting === 'true' &&
      roles === 'conservationist' &&
      email !== email2
    ) {
      Alert.alert(
        'Oops',
        'Previous account still awaiting approval. Please log in with pending organization account',
        [{ text: 'Got it' }]
      );
      await this.logoutPress();
    } // This checks if another conservationist is already in vetting process.

    // This checks to see if the sub id is a user on the DB
    if (!sub) {
      console.log('No sub, navigating to Login');
      this.props.navigation.navigate('Login');
    } else {
      await this.props.getLoadingData(sub);

      if (this.props.userRegistered === true) {
        this.props.getProfileData(null, sub, true);

        if (this.props.userId /* && isVetting !== "true"*/) {
          await SecureStore.setItemAsync('id', `${this.props.userId}`);
          AmpInit();
          AmpEvent('Login');

          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            if (roles === 'conservationist') {
              this.props.navigation.navigate('EditPro');
            } else {
              this.props.navigation.navigate('EditSupPro');
            }
          } else {
            this.props.navigation.navigate(
              roles === 'conservationist' ? 'Conservationist' : 'Supporter'
            );
          }
        } else {
          console.log('No userId, navigating to login');
          this.props.navigation.navigate('Login');
        }
      } else {
        this.props.navigation.navigate(
          roles === 'conservationist' ? 'OrgOnboard' : 'CreateAccount'
        );
      }
    }
  }

  render() {
    return (
      <>
        {/* {this.getAirtable()} */}
        <ImageBackground
          source={require('../assets/images/FurBackground.png')}
          style={styles.container}
        >
          <Image
            style={styles.logo}
            source={require('../assets/images/keyFullWhite.png')}
          />

          <View style={styles.indicator}>
            <ActivityIndicator size='large' color='white' />
          </View>
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  currentUserProfile: state.currentUserProfile,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles,
  profileReset: state.profileReset,
  userRegistered: state.userRegistered
});

export default connect(mapStateToProps, {
  getLoadingData,
  getProfileData,
  afterFirstLogin,
  logout
})(LoadingScreen);
