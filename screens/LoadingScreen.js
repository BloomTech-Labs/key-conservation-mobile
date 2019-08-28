import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import {
  getProfileData,
  afterFirstLogin,
  loginSuccess
} from '../store/actions';
import { withAmplitude, AmpEvent } from '../components/withAmplitude';
import * as Amplitude from 'expo-analytics-amplitude'
import styles from '../constants/screens/LoadingScreen';

class LoadingScreen extends React.Component {
  async componentDidMount() {
    // id in the auth0 database
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    const id = await SecureStore.getItemAsync('id',{});
    // console.log("**********loading screen**********", roles);
    // id in the PG database
    this.props.getProfileData(null, sub, true);
    setTimeout(async () => {
      if (sub) {
        // console.log("data is present");
        // console.log(this.props.userId);
        if (this.props.userId) {
          // console.log('yes', this.props.userRole, roles);
          //const userRole = this.props.userRole;
          //await SecureStore.setItemAsync('roles', `${userRole}`);
          //const newRole = await SecureStore.getItemAsync('roles', {});
          // console.log('yes', this.props.userRole, newRole);
          //await SecureStore.setItemAsync('id', `${this.props.userId}`);
          this.props.getProfileData(this.props.userId, null, true);
          //setAmpId(this.props.userId);
          Amplitude.setUserId(`${id}`)
          AmpEvent('Login');
          let route;
          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            this.props.navigation.navigate(
              roles === 'conservationist'
                ? 'EditPro'
                : 'EditSupPro'
            );
          } else {
            this.props.navigation.navigate(
              roles === 'conservationist'
                ? 'Conservationist'
                : 'Supporter'
            );
          }
        } else {
          // console.log("no", this.props.userId);
          this.props.navigation.navigate('CreateAccount');
        }
      } else {
        // console.log("data is not present");
        this.props.navigation.navigate('Login');
      }
    }, 3000);
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/FurBackground.png')}
        style={styles.container}
      >
        <Image
          style={styles.logo}
          source={require('../assets/images/keyFullWhite.png')}
        />
        <Text style={styles.text}>Empowering Hope</Text>
        <View style={styles.indicator}>
          <ActivityIndicator size='large' color='white' />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles
});

export default connect(
  mapStateToProps,
  { getProfileData, afterFirstLogin }
)(LoadingScreen);
