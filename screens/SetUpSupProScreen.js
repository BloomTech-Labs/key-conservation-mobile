import React from 'react';
import { Platform, Text, View, TextInput, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';
import UploadMedia from '../components/UploadMedia';

import { postUser, logout, clearMedia } from '../store/actions';
import { AmpEvent } from '../components/withAmplitude';

import styles from '../constants/screens/EditSupProScreen';
import { Avatar } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SetUpSupProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Set up your profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />,
      headerRight: () => (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('done')}
        />
      )
    };
  };

  componentDidMount() {
    // console.log('profile_image', this.state.profile_image);
    this.props.navigation.setParams({ done: this.done });
  }

  done = async () => {
    const sub = await SecureStore.getItemAsync('sub', {});
    const email = await SecureStore.getItemAsync('email', {});
    const role = await SecureStore.getItemAsync('roles', {});
    console.log('sub', sub);

    let newUserInputs = this.state;
    if (this.props.mediaUpload) {
      newUserInputs = {
        ...this.state,
        profile_image: this.props.mediaUpload,
        sub: sub,
        roles: role,
        email: email,
        name: this.state.sup_name
      };
    } else {
      newUserInputs = {
        ...this.state,
        sub: sub,
        roles: role,
        email: email,
        name: this.state.sup_name
      };
    }
    console.log('supporter', newUserInputs);
    this.props.postUser(newUserInputs);
    this.props.navigation.navigate('Home');
  };

  state = {
    name: '',
    sup_name: '',
    profile_image:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    location: '',
    mini_bio: '',
    facebook: '',
    instagram: '',
    twitter: ''
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={32}>
        <NavigationEvents onWillFocus={this.props.clearMedia} />
        <View style={styles.sectionContainer}>
          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Name</Text>
            <TextInput
              ref={input => {
                this.nameInput = input;
              }}
              returnKeyType='next'
              placeholder='John Doe'
              style={styles.inputContain}
              onChangeText={text => this.setState({ sup_name: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.locationInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.sup_name}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Location</Text>
            <TextInput
              ref={input => {
                this.locationInput = input;
              }}
              returnKeyType='next'
              placeholder='Miami, Flordia'
              style={styles.inputContain}
              onChangeText={text => this.setState({ location: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.mini_bioInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.location}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Bio (150 characters max)</Text>
            <TextInput
              ref={input => {
                this.mini_bioInput = input;
              }}
              maxLength={150}
              returnKeyType='next'
              placeholder='Tell us about yourself!'
              style={styles.inputContain}
              onChangeText={text => this.setState({ mini_bio: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.emailInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.mini_bio}
            />
          </View>
          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Profile Photo</Text>
            <Avatar
              containerStyle={{
                alignSelf: 'center',
                marginTop: 24
              }}
              source={{ uri: this.state.profile_image || undefined }}
              rounded
              size={128}
            />
            <UploadMedia circular title='Change' />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Linked Accounts</Text>
          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Facebook</Text>
            <TextInput
              ref={input => {
                this.facebookInput = input;
              }}
              returnKeyType='next'
              placeholder='https://www.facebook.com/name'
              keyboardType='default'
              style={styles.inputContain}
              autoCapitalize='none'
              onChangeText={text => this.setState({ facebook: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.instagramInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.facebook}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Instagram</Text>
            <TextInput
              ref={input => {
                this.instagramInput = input;
              }}
              returnKeyType='next'
              keyboardType='default'
              style={styles.inputContain}
              autoCapitalize='none'
              placeholder='https://www.instagram.com/name'
              onChangeText={text => this.setState({ instagram: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.twitterInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.instagram}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Twitter</Text>
            <TextInput
              ref={input => {
                this.twitterInput = input;
              }}
              returnKeyType='done'
              keyboardType='default'
              style={styles.inputContain}
              autoCapitalize='none'
              placeholder='https://www.twitter.com/name'
              onChangeText={text => this.setState({ twitter: text })}
              // blurOnSubmit={true}
              value={this.state.twitter}
            />
          </View>
          <View style={{ height: 15, margin: 25 }}></View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {
  postUser,
  logout,
  clearMedia
})(SetUpSupProScreen);
