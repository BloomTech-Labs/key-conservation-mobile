import React from 'react';
import { Platform, Text, View, TextInput } from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';
import * as SecureStore from 'expo-secure-store';
import DoneButton from '../components/DoneButton';
import UploadMedia from '../components/UploadMedia';

import { editProfileData, logout, clearMedia } from '../store/actions';
import { AmpEvent } from '../components/withAmplitude';
import LocationIQ from 'react-native-locationiq';

import styles from '../constants/screens/EditProScreen';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EditProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Profile',
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

  state = {
    org_name: this.props.currentUserProfile.name,
    profile_image: this.props.currentUserProfile.profile_image,
    location: this.props.currentUserProfile.location,
    mini_bio: this.props.currentUserProfile.mini_bio,
    email: this.props.currentUserProfile.email,
    org_link_url: this.props.currentUserProfile.org_link_url,
    org_link_text: this.props.currentUserProfile.org_link_text,
    facebook: this.props.currentUserProfile.facebook,
    instagram: this.props.currentUserProfile.instagram,
    twitter: this.props.currentUserProfile.twitter,
    about_us: this.props.currentUserProfile.about_us,
    species_and_habitats: this.props.currentUserProfile.species_and_habitats,
    phone_number: this.props.currentUserProfile.phone_number,
    org_cta: this.props.currentUserProfile.org_cta,
    longitude: this.props.currentUserProfile.longitude,
    latitude: this.props.currentUserProfile.latitude
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.setCoords });
    if (this.isProfileComplete(this.state) === true) {
      return AmpEvent('Profile Completed');
    }
    this.getBackend();
    this.resetVettingVars();
  }

  getBackend = async () => {
    const state = await SecureStore.getItemAsync('stateBE', {});
    const parseBE = JSON.parse(state);
    parseBE
      ? this.setState({
          org_name: parseBE.org_name,
          phone_number: parseBE.phone,
          mini_bio: parseBE.mini_bio,
          about_us: parseBE.about_us,
          facebook: parseBE.facebook,
          instagram: parseBE.instagram,
          twitter: parseBE.twitter,
          org_link_url: parseBE.website,
          location: parseBE.address + ', ' + parseBE.country
        })
      : null;
    await SecureStore.deleteItemAsync('stateBE', {});
  }; // Retrieves state object from SecureStore that was created in the onboarding process. Repopulates fields in this component.

  resetVettingVars = async () => {
    await SecureStore.deleteItemAsync('airtableID', {});
    await SecureStore.deleteItemAsync('vettingEmail', {});
    await SecureStore.deleteItemAsync('isVetting', {});
    console.log('resetting vetting variables!');
  }; // Also deletes vetting variables in case NameScreen isn't executed before starting a new organization onboarding process.

  isProfileComplete = profile => {
    for (let p in profile) {
      if (!profile[p]) return false;
    }
    return true;
  };

  setCoords = () => {
    LocationIQ.init('pk.21494f179d6ad0c272404a3614275418');
    LocationIQ.search(`${this.state.location}`)
      .then(json => {
        var lat = json[0].lat;
        var lon = json[0].lon;
        this.setState({
          longitude: parseFloat(lon),
          latitude: parseFloat(lat)
        });
        this.done();
      })
      .catch(error => console.warn(error));
  }; // Converts concatenated location into coordinates, sets coords to state then continues with rest of backend functions.

  done = () => {
    let changes = this.state;
    if (this.props.mediaUpload) {
      changes = {
        ...this.state,
        profile_image: this.props.mediaUpload
      };
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
      <KeyboardAwareScrollView>
        <ScrollView>
          <NavigationEvents onWillFocus={this.props.clearMedia} />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Details</Text>
            <View style={styles.Card} />
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Organization Name</Text>
              <TextInput
                ref={input => {
                  this.nameInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain}
                onChangeText={text => this.setState({ org_name: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.locationInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.org_name}
                placeholder='Carribbean Sea Turtle Project'
              />
            </View>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Location</Text>
              <TextInput
                ref={input => {
                  this.locationInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain}
                onChangeText={text => this.setState({ location: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.mini_bioInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.location}
                placeholder='St. George’s, Grenada'
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Bio</Text>
              <TextInput
                ref={input => {
                  this.mini_bioInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain2}
                onChangeText={text => this.setState({ mini_bio: text })}
                multiline={true}
                value={this.state.mini_bio}
                placeholder='We have been working to conserve the sea turtles that visit our shores and surrounding ocean for the past 30 years.'
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Email</Text>
              <TextInput
                ref={input => {
                  this.emailInput = input;
                }}
                returnKeyType='next'
                placeholder='Email'
                keyboardType='email-address'
                style={styles.inputContain}
                onChangeText={text => this.setState({ email: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgLinkUrlInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.email}
                placeholder='hello@carribbeanseaturtle.org'
              />
            </View>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Organization Logo</Text>
              <View style={styles.logoSelectContainer}>
                <UploadMedia
                  media={this.state.profile_image}
                  size={128}
                  circular
                  title='Upload a logo'
                />
              </View>
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>About Us</Text>
              <TextInput
                ref={input => {
                  this.about_usInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain2}
                onChangeText={text => this.setState({ about_us: text })}
                multiline={true}
                value={this.state.about_us}
                placeholder='The Caribbean Sea Turtle Project is based in St. George, Grenada but we work all over the island. We have been working to conserve sea turtles that visit our shores... '
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Contact Information</Text>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Website Link URL</Text>
              <TextInput
                ref={input => {
                  this.org_link_urlInput = input;
                }}
                returnKeyType='next'
                keyboardType='default'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ org_link_url: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgLinkTextInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.org_link_url}
                placeholder='https://www.carribbbeanseaturtle.org'
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Website Link Text</Text>
              <TextInput
                ref={input => {
                  this.orgLinkTextInput = input;
                }}
                returnKeyType='next'
                placeholder='How you wish your website to appear'
                style={styles.inputContain}
                onChangeText={text => this.setState({ org_link_text: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgCtaInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.org_link_text}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Donation Link</Text>
              <TextInput
                ref={input => {
                  this.org_ctaInput = input;
                }}
                returnKeyType='next'
                keyboardType='default'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ org_cta: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.facebookInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.org_cta}
                placeholder='https://www.carribbbeanseaturtle.org/donate'
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Phone Number</Text>
              <TextInput
                ref={input => {
                  this.phoneInput = input;
                }}
                returnKeyType='next'
                keyboardType='default'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ phone_number: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.facebookInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.phone_number}
                placeholder='9998884747'
              />
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
                keyboardType='default'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ facebook: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.instagramInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.facebook}
                placeholder='www.facebook.com/CSTP'
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
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ instagram: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.twitterInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.instagram}
                placeholder='www.instagram.com/CSTP'
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
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ twitter: text })}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.twitter}
                placeholder='www.twitter.com/CSTP'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {
  editProfileData,
  logout,
  clearMedia
})(EditProScreen);
