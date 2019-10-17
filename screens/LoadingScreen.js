import React from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { getProfileData, afterFirstLogin } from '../store/actions';
import { AmpEvent, AmpInit } from '../components/withAmplitude';
import styles from '../constants/screens/LoadingScreen';

class LoadingScreen extends React.Component {
  async componentDidMount() {
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    this.props.getProfileData(null, sub, true);
    setTimeout(async () => {
      console.log(sub, 'first sub check')
      console.log('profileRESET in loading', this.props.profileReset)
      if (this.props.profileReset === true) {
        console.log('we in da profile reset', this.props.profileReset)
        this.props.profileReset = false
        this.props.navigation.navigate('Login')
      } else {
        if (sub) {
          if (this.props.userId) {
            console.log(sub, 'sub in loading screen')
            await SecureStore.setItemAsync('id', `${this.props.userId}`);
            AmpInit();
            AmpEvent('Login');
            if (this.props.firstLogin) {
              console.log(this.props.firstLogin, 'firstLogin LoadingScreen')
              this.props.afterFirstLogin();
              this.props.navigation.navigate(
                roles === 'conservationist' ? 'EditPro' : 'EditSupPro'
              );
            } else {
              console.log('first else, navigation')
              console.log(this.props.userId, sub, 'userId & sub in first else')
              this.props.navigation.navigate(
                roles === 'conservationist' ? 'Conservationist' : 'Supporter'
              );
            }
          } else {
            console.log('Create Account else nav')
            this.props.navigation.navigate('CreateAccount');
          }
        } else {
          this.props.navigation.navigate('Login');
        }
      }
    }, 3000)
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
  currentUserProfile: state.currentUserProfile,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles,
  profileReset: state.profileReset
});

export default connect(
  mapStateToProps,
  { getProfileData, afterFirstLogin }
)(LoadingScreen);
