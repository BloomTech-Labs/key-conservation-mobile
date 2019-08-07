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

import DoneButton from '../components/DoneButton';

import { postUser, editProfileData } from '../store/actions';

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
      headerRight: <DoneButton navigation={navigation} pressAction={navigation.getParam('done')} />
    };
  }

  state = {
    email: this.props.currentUserProfile.email,
    org_link_url: this.props.currentUserProfile.org_link_url,
    org_link_text: this.props.currentUserProfile.org_link_text,
    facebook: this.props.currentUserProfile.facebook,
    instagram: this.props.currentUserProfile.instagram,
    twitter: this.props.currentUserProfile.twitter,
    about_us: this.props.currentUserProfile.about_us,
    species_habitats: this.props.currentUserProfile.species_and_habitats,
    issues: this.props.currentUserProfile.issues,
    // supportUs: this.props.currentUserProfile.support_us,
    org_cta: this.props.currentUserProfile.org_cta
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
  }

  done = () => {
    this.props.editProfileData(this.props.currentUserProfile.id, this.state);
    this.props.navigation.goBack(); 
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
                <Text style={styles.sectionsText}>Email</Text>
                <TextInput
                  ref={(input) => { this.emailInput = input; }}
                  returnKeyType='next'
                  keyboardType='email-address'
                  placeholder='Email'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.org_link_urlInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.email}
                />    
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link URL</Text>
                <TextInput
                  ref={(input) => { this.org_link_urlInput = input; }}
                  returnKeyType='next'     
                  keyboardType='url'       
                  style={styles.inputContain}
                  autoCapitalize='none'
                  placeholder='Please include full URL'
                  onChangeText={text => this.setState({ org_link_url: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.org_link_textInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.org_link_url}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link Text</Text>
                <TextInput
                  ref={(input) => { this.orgLinkTextInput = input; }}
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
                  ref={(input) => { this.org_ctaInput = input; }}
                  returnKeyType='next'
                  keyboardType='url'
                  style={styles.inputContain}
                  autoCapitalize='none'
                  placeholder='Please include full URL'
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.facebookInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.org_cta}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Facebook</Text>
                <TextInput
                  ref={(input) => { this.facebookInput = input; }}
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
                  ref={(input) => { this.instagramInput = input; }}
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
                  ref={(input) => { this.twitterInput = input; }}
                  returnKeyType='next'
                  keyboardType='url'
                  style={styles.inputContain}
                  autoCapitalize='none'
                  placeholder='Please include full URL'
                  onChangeText={text => this.setState({ twitter: text })}
                  onSubmitEditing={() => {
                    if (Platform.OS === 'android') return;
                    this.about_usInput.focus();
                  }}
                  blurOnSubmit={Platform.OS === 'android'}
                  value={this.state.twitter}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>About Us</Text>
                <TextInput
                  ref={(input) => { this.about_usInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ about_us: text })}
                  multiline={true}
                  value={this.state.about_us}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Species & Habitats</Text>
                <TextInput
                  ref={(input) => { this.species_habitatsInput = input; }}
                  returnKeyType='next'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ species_habitats: text })}
                  multiline={true}
                  value={this.state.species_habitats}
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
  currentUserProfile: state.currentUserProfile,
});

export default connect(
  mapStateToProps,
  { postUser, editProfileData }
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
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20, 
    marginBottom: 5,
  },
});
