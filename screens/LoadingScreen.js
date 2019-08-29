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
import { AmpEvent } from '../components/withAmplitude';
import * as Amplitude from 'expo-analytics-amplitude';
import styles from '../constants/screens/LoadingScreen';

class LoadingScreen extends React.Component {
  async componentDidMount() {
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    this.props.getProfileData(null, sub, true);
    setTimeout(async () => {
      if (sub) {
        if (this.props.userId) {
          await SecureStore.setItemAsync('id', `${this.props.userId}`);
          Amplitude.setUserId(`${sub}`);
          AmpEvent('Login');
          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            this.props.navigation.navigate(
              roles === 'conservationist' ? 'EditPro' : 'EditSupPro'
            );
          } else {
            this.props.navigation.navigate(
              roles === 'conservationist' ? 'Conservationist' : 'Supporter'
            );
          }
        } else {
          this.props.navigation.navigate('CreateAccount');
        }
      } else {
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
  currentUserProfile: state.currentUserProfile,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles
});

export default connect(
  mapStateToProps,
  { getProfileData, afterFirstLogin }
)(LoadingScreen);
