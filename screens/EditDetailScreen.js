import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import DoneButton from '../components/DoneButton';

import { postUser } from '../store/actions';

class EditDetailScreen extends React.Component {
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
      headerRight: <DoneButton navigation={navigation} changes={this.state} />
    };
  }

  state = {
    email: this.props.currentUserProfile.email,
    orgLinkUrl: this.props.currentUserProfile.org_link_url,
    orgLinkText: this.props.currentUserProfile.org_link_text,
    facebook: this.props.currentUserProfile.facebook,
    instagram: this.props.currentUserProfile.instagram,
    twitter: this.props.currentUserProfile.twitter,
    aboutUs: this.props.currentUserProfile.about_us,
    speciesHabitats: this.props.currentUserProfile.species_and_habitats,
    issues: this.props.currentUserProfile.issues,
    // supportUs: this.props.currentUserProfile.support_us,
    orgCta: this.props.currentUserProfile.org_cta
  };

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
                <Text style={styles.sectionsText}>Email</Text>
                <TextInput
                  ref={(input) => { this.emailInput = input; }}
                  returnKeyType='next'
                  placeholder='Email'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.orgLinkUrlInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.email}
                />    
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link URL</Text>
                <TextInput
                  ref={(input) => { this.orgLinkUrlInput = input; }}
                  returnKeyType='next'            
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ orgLinkUrl: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.orgLinkTextInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.orgLinkUrl}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link Text</Text>
                <TextInput
                  ref={(input) => { this.orgLinkTextInput = input; }}
                  returnKeyType='next'
                  placeholder='enter how you wish your website to appear'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ orgLinkText: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.orgCtaInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.orgLinkText}
                />
              </View>

              <View style={styles.sections}>  
                <Text style={styles.sectionsText}>Donation Link</Text>            
                <TextInput
                  ref={(input) => { this.orgCtaInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.facebookInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.orgCta}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Facebook</Text>
                <TextInput
                  ref={(input) => { this.facebookInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain}
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
                  ref={(input) => { this.instagramInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain}
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
                  ref={(input) => { this.twitterInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain}
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
                <Text style={styles.sectionsText}>About Us</Text>
                <TextInput
                  ref={(input) => { this.aboutUsInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ aboutUs: text })}
                  multiline={true}
                  value={this.state.aboutUs}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Species & Habitats</Text>
                <TextInput
                  ref={(input) => { this.speciesHabitatsInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ speciesHabitats: text })}
                  multiline={true}
                  value={this.state.speciesHabitats}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Big Issues</Text>
                <TextInput
                  ref={(input) => { this.issuesInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ issues: text })}
                  multiline={true}
                  value={this.state.issues}
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
  currentUser: state.currentUser,
  currentUserProfile: state.currentUserProfile,
});

export default connect(
  mapStateToProps,
  { postUser }
)(EditDetailScreen);

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 15, 
    marginRight: 15,
  },
  Card: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '100%',
    height: 20,
  },
  inputContain: {
    height: 48,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    marginBottom: 25,
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
    width: '100%',    
  },
  sectionsText: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
