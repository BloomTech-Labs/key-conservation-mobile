import React from 'react';
import { Platform, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import UploadMedia from '../../components/UploadMedia';

import styles from '../../constants/EditProfileScreen/OrganizationForm';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class OrganizationForm extends React.Component {

  mounted = false;

  state = {
    name: this.props.data.name,
    profile_image: this.props.data.profile_image,
    location: this.props.data.location,
    mini_bio: this.props.data.mini_bio,
    email: this.props.data.email,
    link_url: this.props.data.link_url,
    link_text: this.props.data.link_text,
    facebook: this.props.data.facebook,
    instagram: this.props.data.instagram,
    twitter: this.props.data.twitter,
    about_us: this.props.data.about_us,
    species_and_habitats: this.props.data.species_and_habitats,
    phone_number: this.props.data.phone_number,
    call_to_action: this.props.data.call_to_action,
    longitude: this.props.data.longitude,
    latitude: this.props.data.latitude,
  };

  componentDidMount() {
    this.mounted = true;
    this.props.navigation.setParams({ done: this.done });

    this.getBackend();
    this.resetVettingVars();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getBackend = async () => {
    const state = await SecureStore.getItemAsync('stateBE', {});
    if (!this.mounted) return;
    const parseBE = JSON.parse(state);
    parseBE
      ? this.setState({
          name: parseBE.name,
          phone_number: parseBE.phone,
          mini_bio: parseBE.mini_bio,
          about_us: parseBE.about_us,
          facebook: parseBE.facebook,
          instagram: parseBE.instagram,
          twitter: parseBE.twitter,
          link_url: parseBE.website,
          location: parseBE.address + ', ' + parseBE.country,
        })
      : null;
    await SecureStore.deleteItemAsync('stateBE', {});
  }; // Retrieves state object from SecureStore that was created in the onboarding process. Repopulates fields in this component.

  resetVettingVars = async () => {
    await SecureStore.deleteItemAsync('airtableID', {});
    await SecureStore.deleteItemAsync('vettingEmail', {});
    await SecureStore.deleteItemAsync('isVetting', {});
  }; // Also deletes vetting variables in case NameScreen isn't executed before starting a new organization onboarding process.


  done = () => {   
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={32}>
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Details</Text>
            <View style={styles.Card} />
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Organization Name</Text>
              <TextInput
                ref={(input) => {
                  this.nameInput = input;
                }}
                returnKeyType="next"
                style={styles.inputContain}
                onChangeText={(text) => this.setState({ name: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.locationInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.name}
                placeholder="Carribbean Sea Turtle Project"
              />
            </View>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Location</Text>
              <TextInput
                ref={(input) => {
                  this.locationInput = input;
                }}
                returnKeyType="next"
                style={styles.inputContain}
                onChangeText={(text) => this.setState({ location: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.mini_bioInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.location}
                placeholder="St. George’s, Grenada"
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Bio</Text>
              <TextInput
                ref={(input) => {
                  this.mini_bioInput = input;
                }}
                returnKeyType="next"
                style={styles.inputContain2}
                onChangeText={(text) => this.setState({ mini_bio: text })}
                multiline={true}
                value={this.state.mini_bio}
                placeholder="We have been working to conserve the sea turtles that visit our shores and surrounding ocean for the past 30 years."
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Email</Text>
              <TextInput
                ref={(input) => {
                  this.emailInput = input;
                }}
                returnKeyType="next"
                placeholder="Email"
                keyboardType="email-address"
                style={styles.inputContain}
                onChangeText={(text) => this.setState({ email: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgLinkUrlInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.email}
                placeholder="hello@carribbeanseaturtle.org"
              />
            </View>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>About Us</Text>
              <TextInput
                ref={(input) => {
                  this.about_usInput = input;
                }}
                returnKeyType="next"
                style={styles.inputContain2}
                onChangeText={(text) => this.setState({ about_us: text })}
                multiline={true}
                value={this.state.about_us}
                placeholder="The Caribbean Sea Turtle Project is based in St. George, Grenada but we work all over the island. We have been working to conserve sea turtles that visit our shores... "
              />
            </View>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Organization Logo</Text>
              <View style={styles.logoSelectContainer}>
                <UploadMedia
                  media={this.state.profile_image}
                  size={128}
                  mediaType='Images'
                  circular
                  title="Upload a logo"
                  removable
                  onChangeMedia={(media) =>
                    this.setState({ profile_image: media })
                  }
                />
              </View>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Contact Information</Text>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Website Link URL</Text>
              <TextInput
                ref={(input) => {
                  this.link_urlInput = input;
                }}
                returnKeyType="next"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ link_url: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgLinkTextInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.link_url}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Website Link Text</Text>
              <TextInput
                ref={(input) => {
                  this.orgLinkTextInput = input;
                }}
                returnKeyType="next"
                placeholder="How you wish your website to appear"
                style={styles.inputContain}
                onChangeText={(text) => this.setState({ link_text: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.orgCtaInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.link_text}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Donation Link</Text>
              <TextInput
                ref={(input) => {
                  this.callToActionInput = input;
                }}
                returnKeyType="next"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ call_to_action: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.facebookInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.call_to_action}
                placeholder="https://www.carribbbeanseaturtle.org/donate"
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Phone Number</Text>
              <TextInput
                ref={(input) => {
                  this.phoneInput = input;
                }}
                returnKeyType="next"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ phone_number: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.facebookInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.phone_number}
                placeholder="9998884747"
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Linked Accounts</Text>
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Facebook</Text>
              <TextInput
                ref={(input) => {
                  this.facebookInput = input;
                }}
                returnKeyType="next"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ facebook: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.instagramInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.facebook}
                placeholder="www.facebook.com/CSTP"
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Instagram</Text>
              <TextInput
                ref={(input) => {
                  this.instagramInput = input;
                }}
                returnKeyType="next"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ instagram: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.twitterInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.instagram}
                placeholder="www.instagram.com/CSTP"
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Twitter</Text>
              <TextInput
                ref={(input) => {
                  this.twitterInput = input;
                }}
                returnKeyType="done"
                keyboardType="default"
                style={styles.inputContain}
                autoCapitalize="none"
                placeholder="Please include full URL"
                onChangeText={(text) => this.setState({ twitter: text })}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.twitter}
                placeholder="www.twitter.com/CSTP"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

export default OrganizationForm;
