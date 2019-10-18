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
import { getLoadingData, getProfileData, afterFirstLogin } from '../store/actions';
import { AmpEvent, AmpInit } from '../components/withAmplitude';
import styles from '../constants/screens/LoadingScreen';

class LoadingScreen extends React.Component {
  async componentDidMount() {
    const sub = await SecureStore.getItemAsync('sub', {});
    const roles = await SecureStore.getItemAsync('roles', {});
    // This checks to see if the sub id is a user on the DB
    console.log('THIS IS THE SUB****', sub)
    if (!sub) {
      this.props.navigation.navigate('Login')
    } else {
      await this.props.getLoadingData(sub)
      if (this.props.userRegistered === true) {
        this.props.getProfileData(null, sub, true)
        console.log('*****LOADING STATS', sub, this.props.profileReset)
        if (this.props.userId) {
          await SecureStore.setItemAsync('id', `${this.props.userId}`);
          console.log('this.props.userId', this.props.userId)
          AmpInit();
          AmpEvent('Login');
          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            this.props.navigation.navigate(
              roles === 'conservationist' ? 'EditPro' : 'EditSupPro'
            );
          } else {
            this.props.navigation.navigate(
              roles === 'conservationist' ? 'Conservationist' : 'Supporter'
            )
          } 
      } else {
        this.props.navigation.navigate('Login')
      }
    } else {
      this.props.navigation.navigate('CreateAccount')
    }
  }

    // if (this.props.userRegistered === true) {
    //   this.props.getProfileData(null, sub, true);
    //   console.log('*****LOADING STATS', sub, this.props.profileReset)
    //   if (this.props.profileReset === true) {
    //     console.log('we hit da reset')
    //     this.props.profileReset = false
    //     this.props.navigation.navigate('Login')
    //   } else {
    //     if (sub) {
    //       console.log('IF SUB INFO')
    //       console.log('we passed sub')
    //       console.log('this.props.firstLogin', this.props.firstLogin)
    //       console.log('this.props.userId', this.props.userId)
    //       console.log('IF SUB INFO DONE')
    //       if (this.props.userId) {
    //         await SecureStore.setItemAsync('id', `${this.props.userId}`);
    //         console.log('this.props.userId', this.props.userId)
    //         AmpInit();
    //         AmpEvent('Login');
    //         if (this.props.firstLogin) {
    //           this.props.afterFirstLogin();
    //           this.props.navigation.navigate(
    //             roles === 'conservationist' ? 'EditPro' : 'EditSupPro'
    //           );
    //         } else {
    //           this.props.navigation.navigate(
    //             roles === 'conservationist' ? 'Conservationist' : 'Supporter'
    //           );
    //         }
    //       } else {
    //         this.props.navigation.navigate('Login');
    //       }
    //     } else {
    //       this.props.navigation.navigate('Login')
    //     }
    //    }}
    //     else {
    //   if (sub) {
    //     this.props.navigation.navigate('CreateAccount');
    //   } else {
    //     this.props.navigation.navigate('Login')
    //   }
    }
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
  profileReset: state.profileReset,
  userRegistered: state.userRegistered
});

export default connect(
  mapStateToProps,
  { getLoadingData, getProfileData, afterFirstLogin }
)(LoadingScreen);
