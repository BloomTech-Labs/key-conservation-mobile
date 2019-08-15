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

import DoneButton from '../components/DoneButton';

import { postUser, editProfileData } from '../store/actions';

class EditProScreen extends React.Component {
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
      headerRight: <DoneButton navigation={navigation} pressAction={navigation.getParam('done')} />
    };
  };

  state = {
    org_name: this.props.currentUserProfile.org_name,
    profile_image: this.props.currentUserProfile.profile_image,
    username: this.props.currentUserProfile.username,
    location: this.props.currentUserProfile.location,
    mini_bio: this.props.currentUserProfile.mini_bio
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
              <Text style={styles.sectionsText}>Organization Name</Text>
              <TextInput
                ref={input => {
                  this.org_nameInput = input;
                }}
                returnKeyType='next'
                style={styles.inputContain}
                onChangeText={text => this.setState({ org_name: text })}
                onSubmitEditing={() => {
                  if (Platform.OS === 'android') return;
                  this.usernameInput.focus();
                }}
                blurOnSubmit={Platform.OS === 'android'}
                value={this.state.org_name}
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
              />
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
  { postUser, editProfileData }
)(EditProScreen);

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
  }
});
