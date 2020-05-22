import React from 'react';
import { Platform, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';

import DoneButton from '../components/DoneButton';
import UploadMedia from '../components/UploadMedia';

import { editProfileData, editProfileImage, logout } from '../store/actions';
import { AmpEvent } from '../components/withAmplitude';

import styles from '../constants/screens/EditSupporterProfileScreen';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SkillSelect from '../components/SkillSelect';

class EditSupporterProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('done')}
        />
      ),
    };
  };

  state = {
    name: this.props.currentUserProfile.name,
    profile_image: this.props.currentUserProfile.profile_image,
    location: this.props.currentUserProfile.location,
    mini_bio: this.props.currentUserProfile.mini_bio,
    email: this.props.currentUserProfile.email,
    facebook: this.props.currentUserProfile.facebook,
    instagram: this.props.currentUserProfile.instagram,
    twitter: this.props.currentUserProfile.twitter,
    species_and_habitats: this.props.currentUserProfile.species_and_habitats,
    skills: this.props.currentUserProfile.skills,
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
    if (this.isProfileComplete(this.state) === true) {
      return AmpEvent('Profile Completed');
    }
  }

  isProfileComplete = (profile) => {
    for (let p in profile) {
      if (!profile[p]) return false;
    }
    return true;
  };

  done = () => {
    let changes = this.state;
    if (changes.profile_image) {
      this.props.editProfileImage(
        this.props.currentUserProfile.id,
        changes.profile_image
      );
    }
    this.props.editProfileData(this.props.currentUserProfile.id, changes);
    if (this.props.firstLogin) {
      this.props.navigation.navigate('Home');
    } else {
      if (this.props.navigation.state.params.goBack) {
        this.props.navigation.state.params.goBack();
      }
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={32}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Details</Text>
          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Name</Text>
            <TextInput
              ref={(input) => {
                this.nameInput = input;
              }}
              returnKeyType="next"
              placeholder="John Doe"
              style={styles.inputContain}
              onChangeText={(text) => this.setState({ name: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.locationInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.name}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Location</Text>
            <TextInput
              ref={(input) => {
                this.locationInput = input;
              }}
              returnKeyType="next"
              placeholder="Miami, Flordia"
              style={styles.inputContain}
              onChangeText={(text) => this.setState({ location: text })}
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
              ref={(input) => {
                this.mini_bioInput = input;
              }}
              multiline={true}
              numberOfLines={5}
              maxLength={150}
              returnKeyType="next"
              placeholder="Tell us about yourself!"
              style={styles.bioInputContain}
              onChangeText={(text) => this.setState({ mini_bio: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.emailInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.mini_bio}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Email</Text>
            <TextInput
              ref={(input) => {
                this.emailInput = input;
              }}
              returnKeyType="next"
              placeholder="youremail@gmail.com"
              keyboardType="email-address"
              style={styles.inputContain}
              onChangeText={(text) => this.setState({ email: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.facebookInput.focus();
              }}
              // blurOnSubmit={Platform.OS === 'android'}
              value={this.state.email}
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.sectionsText}>Profile Photo</Text>
            <View style={styles.imageSelectContainer}>
              <UploadMedia
                media={this.state.profile_image}
                onChangeMedia={(media) =>
                  this.setState({ profile_image: media })
                }
                size={128}
                circular
                title="Upload photo"
                removable
              />
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Skilled Impact</Text>
          <Text style={styles.sectionsText}>
            Select the skills you currently have and want to use to help
            conservationists.
          </Text>
          <Text style={styles.sectionSubText}>
            You can add more details later
          </Text>
          <SkillSelect
            skills={this.state.skills}
            enableOtherSkills={true}
            onSkillsChanged={(skills) => this.setState({ skills: skills })}
          />
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
              placeholder="https://www.facebook.com/orgname"
              keyboardType="default"
              style={styles.inputContain}
              autoCapitalize="none"
              onChangeText={(text) => this.setState({ facebook: text })}
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
              ref={(input) => {
                this.instagramInput = input;
              }}
              returnKeyType="next"
              keyboardType="default"
              style={styles.inputContain}
              autoCapitalize="none"
              placeholder="https://www.instagram.com/orgname"
              onChangeText={(text) => this.setState({ instagram: text })}
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
              ref={(input) => {
                this.twitterInput = input;
              }}
              returnKeyType="done"
              keyboardType="default"
              style={styles.inputContain}
              autoCapitalize="none"
              placeholder="https://www.twitter.com/orgname"
              onChangeText={(text) => this.setState({ twitter: text })}
              // blurOnSubmit={true}
              value={this.state.twitter}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {
  editProfileData,
  editProfileImage,
  logout,
})(EditSupporterProfileScreen);
