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
import { ScrollView } from "react-navigation";
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';
import * as SecureStorage from "expo-secure-store";
import DoneButton from '../components/DoneButton';

import { editProfileData, logout } from '../store/actions';

class EditSupProScreen extends React.Component {
  logoutPress = async () => {
    await SecureStorage.deleteItemAsync("sub", {});
    await SecureStorage.deleteItemAsync("email", {});
    await SecureStorage.deleteItemAsync("roles", {});
    await SecureStorage.deleteItemAsync("userId", {});
    this.props.logout();
    this.props.navigation.navigate("Loading");
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: (
        <BackButton
          navigation={navigation} 
        />
      ),
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
    species_and_habitats: this.props.currentUserProfile.species_and_habitats,
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
  }

  done = () => {
    this.props.editProfileData(this.props.currentUserProfile.id, this.state);
    if (this.props.firstLogin) {
      this.props.navigation.navigate('Home');   
    } else {
      this.props.navigation.goBack(); 
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior='height'
        keyboardVerticalOffset={86}
        enabled
      >
        <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Name</Text>
              <TextInput
                ref={input => {
                  this.sup_nameInput = input;
                }}
                returnKeyType='next'
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
                style={styles.inputContain}
                onChangeText={text => this.setState({ username: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.profileImageInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.username}
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>Profile Image URL</Text>
              <TextInput
                ref={input => {
                  this.profileImageInput = input;
                }}
                returnKeyType='next'
                keyboardType='url'
                style={styles.inputContain}
                autoCapitalize='none'
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ profile_image: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.locationInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.profile_image}
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
              />
            </View>

            <View style={styles.sections}>
              <Text style={styles.sectionsText}>About Me</Text>
              <TextInput
                ref={input => {
                  this.mini_bioInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain2}
                onChangeText={text => this.setState({ mini_bio: text })}
                multiline={true}
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
                placeholder='Email'
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
                keyboardType='url'
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
                placeholder='Please include full URL'
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
                placeholder='Please include full URL'
                onChangeText={text => this.setState({ twitter: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.aboutUsInput.focus();
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
                onChangeText={text => this.setState({ species_and_habitats: text })}
                multiline={true}
                value={this.state.species_and_habitats}
              />
            </View>

            <View style={styles.logoutSection}>
              <Text style={styles.accountSettingsText}>Account Settings:</Text>
              <TouchableOpacity
              onPress = {this.logoutPress}
              style = {styles.logoutButton}
              >
                <Text style = {styles.buttonText}>Logout</Text>
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
  currentUserProfile: state.currentUserProfile
});

export default connect(
  mapStateToProps,
  { editProfileData, logout }
)(EditSupProScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 15,
    marginRight: 15
  },
  Card: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 20
  },
  inputContain: {
    height: 48,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25
  },
  inputContain2: {
    height: 140,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25,
    textAlignVertical: 'top'
  },

  touchableView: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  touchableText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  sections: {
    // marginTop: 20,
    backgroundColor: '#fff',
    width: '100%'
  },
  sectionsText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    marginBottom: 5
  },
  logoutButton: {
    fontSize: 20,
    alignItems: "flex-start",
    backgroundColor: 'white',
    marginBottom: 10
  },
  buttonText: {
    color: 'blue',
    fontSize: 20
  }
});