import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';

import * as SecureStorage from 'expo-secure-store';

import DoneButton from '../components/DoneButton';
import UploadMedia from '../components/UploadMedia';

import { editProfileData, logout, clearMedia } from '../store/actions';
import { AmpEvent } from '../components/withAmplitude';

import styles from '../constants/screens/EditSupProScreen';

class EditSupProScreen extends React.Component {
  logoutPress = async () => {
    //console.log('pressed button');
    await SecureStorage.deleteItemAsync('id', {});
    await SecureStorage.deleteItemAsync('sub', {});
    await SecureStorage.deleteItemAsync('email', {});
    await SecureStorage.deleteItemAsync('roles', {});
    await SecureStorage.deleteItemAsync('userId', {});
    await SecureStorage.deleteItemAsync('accessToken', {});
    this.props.logout();
    this.props.navigation.navigate('Loading');
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Details',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('done')}
        />
      )
    };
  };

  state = {
    sup_name: this.props.currentUserProfile.sup_name,
    username: this.props.currentUserProfile.username,
    profile_image: this.props.currentUserProfile.profile_image,
    location: this.props.currentUserProfile.location,
    mini_bio: this.props.currentUserProfile.mini_bio,
    email: this.props.currentUserProfile.email,
    facebook: this.props.currentUserProfile.facebook,
    instagram: this.props.currentUserProfile.instagram,
    twitter: this.props.currentUserProfile.twitter,
    species_and_habitats: this.props.currentUserProfile.species_and_habitats
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
    if (this.isProfileComplete(this.state) === true) {
      return AmpEvent('Profile Completed');
    }
  }

  isProfileComplete = profile => {
    for (let p in profile) {
      if (!profile[p]) return false;
    }
    return true;
  };

  done = () => {
    let changes = this.state;
    if (this.props.mediaUpload) {
      changes = {
        ...this.state,
        profile_image: this.props.mediaUpload
      };
      // console.log('CHANGES', changes);
    }
    this.props.editProfileData(this.props.currentUserProfile.id, changes);
    if (this.props.firstLogin) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={86}
        enabled
      >
        <ScrollView>
          <NavigationEvents onWillFocus={this.props.clearMedia} />
          <View style={styles.sectionContainer}>
            <View style={styles.Card} />
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Name</Text>
              <TextInput
                ref={input => {
                  this.sup_nameInput = input;
                }}
                returnKeyType='next'
                placeholder='John Doe'
                style={styles.inputContain}
                onChangeText={text => this.setState({ sup_name: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.usernameInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.sup_name}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Username</Text>
              <TextInput
                ref={input => {
                  this.usernameInput = input;
                }}
                returnKeyType='next'
                placeholder='@johndoe'
                style={styles.inputContain}
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
              />
            </View>

            <View style={styles.sections}>
              <UploadMedia circular />
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
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.location}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>About Me</Text>
              <TextInput
                ref={input => {
                  this.mini_bioInput = input;
                }}
                returnKeyType='next'
                placeholder='Tell us about yourself!'
                style={styles.inputContain}
                onChangeText={text => this.setState({ mini_bio: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.emailInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.mini_bio}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Email</Text>
              <TextInput
                ref={input => {
                  this.emailInput = input;
                }}
                returnKeyType='next'
                placeholder='youremail@gmail.com'
                keyboardType='email-address'
                style={styles.inputContain}
                onChangeText={text => this.setState({ email: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.facebookInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.email}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Facebook</Text>
              <TextInput
                ref={input => {
                  this.facebookInput = input;
                }}
                returnKeyType='next'
                placeholder='https://www.facebook.com/orgname'
                keyboardType='url'
                style={styles.inputContain}
                autoCapitalize='none'
                onChangeText={text => this.setState({ facebook: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.instagramInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
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
                keyboardType='url'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='https://www.instagram.com/orgname'
                onChangeText={text => this.setState({ instagram: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.twitterInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.instagram}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Twitter</Text>
              <TextInput
                ref={input => {
                  this.twitterInput = input;
                }}
                returnKeyType='next'
                keyboardType='url'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='https://www.twitter.com/orgname'
                onChangeText={text => this.setState({ twitter: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.species_habitatsInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.twitter}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Species & Habitats</Text>
              <TextInput
                ref={input => {
                  this.species_habitatsInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain2}
                onChangeText={text =>
                  this.setState({ species_and_habitats: text })
                }
                multiline={true}
                value={this.state.species_and_habitats}
              />
            </View>

            <View style={styles.logoutSection}>
              <TouchableOpacity
                onPress={this.logoutPress}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload
});

export default connect(
  mapStateToProps,
  { editProfileData, logout, clearMedia }
)(EditSupProScreen);
