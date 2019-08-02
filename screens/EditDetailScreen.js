import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import { postUser } from '../store/actions';

class EditDetailScreen extends React.Component {
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

  // handlePress = async () => {
  //   const { error } = this.props;
  //   const { sub, role, email } = this.props.currentUser;
  //   let details = state
  //   await this.props.postUser(user);
  //   this.props.navigation.navigate(error ? 'CreateAccount' : 'Conservationist');
  // };

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
                  onSubmitEditing={() => { this.orgLinkUrlInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.email}
                />    
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link URL</Text>
                <TextInput
                  ref={(input) => { this.orgLinkUrlInput = input; }}
                  returnKeyType='next'
                  placeholder='Website'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ orgLinkUrl: text })}
                  onSubmitEditing={() => { this.orgLinkTextInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.orgLinkUrl}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Website Link Text</Text>
                <TextInput
                  ref={(input) => { this.orgLinkTextInput = input; }}
                  returnKeyType='next'
                  placeholder='Website Text'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ orgLinkText: text })}
                  onSubmitEditing={() => { this.orgCtaInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.orgLinkText}
                />
              </View>

              <View style={styles.sections}>  
                <Text style={styles.sectionsText}>Donation Link</Text>            
                <TextInput
                  ref={(input) => { this.orgCtaInput = input; }}
                  returnKeyType='next'
                  placeholder='Donation Link'
                  style={styles.inputContain}
                  onSubmitEditing={() => { this.facebookInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.orgCta}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Facebook</Text>
                <TextInput
                  ref={(input) => { this.facebookInput = input; }}
                  returnKeyType='next'
                  placeholder='Facebook'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ facebook: text })}
                  onSubmitEditing={() => { this.instagramInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.facebook}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Instagram</Text>
                <TextInput
                  ref={(input) => { this.instagramInput = input; }}
                  returnKeyType='next'
                  placeholder='Instagram'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ instagram: text })}
                  onSubmitEditing={() => { this.twitterInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.instagram}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Twitter</Text>
                <TextInput
                  ref={(input) => { this.twitterInput = input; }}
                  returnKeyType='next'
                  placeholder='Twitter'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ twitter: text })}
                  onSubmitEditing={() => { this.aboutUsInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.twitter}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>About Us</Text>
                <TextInput
                  ref={(input) => { this.aboutUsInput = input; }}
                  returnKeyType='next'
                  placeholder='About Us'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ aboutUs: text })}
                  onSubmitEditing={() => { this.speciesHabitatsInput.focus(); }}
                  blurOnSubmit={false}
                  multiline={true}
                  value={this.state.aboutUs}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Species & Habitats</Text>
                <TextInput
                  ref={(input) => { this.speciesHabitatsInput = input; }}
                  returnKeyType='next'
                  placeholder='Species & Habitats'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ speciesHabitats: text })}
                  onSubmitEditing={() => { this.issuesInput.focus(); }}
                  blurOnSubmit={false}
                  multiline={true}
                  value={this.state.speciesHabitats}
                />
              </View>

              <View style={styles.sections}>
                <Text style={styles.sectionsText}>Big Issues</Text>
                <TextInput
                  ref={(input) => { this.issuesInput = input; }}
                  returnKeyType='next'
                  placeholder='Big Issues'
                  style={styles.inputContain2}
                  onChangeText={text => this.setState({ issues: text })}
                  // onSubmitEditing={() => { this.supportUsInput.focus(); }}
                  // blurOnSubmit={false}
                  multiline={true}
                  value={this.state.issues}
                />
              </View>

              {/* <View style={styles.sections}>
                <Text style={styles.sectionsText}></Text>              
                <TextInput
                  ref={(input) => { this.supportUsInput = input; }}
                  returnKeyType='next'
                  placeholder='Support Us'
                  style={styles.inputContain}
                  onChangeText={text => this.setState({ supportUs: text })}
                  onSubmitEditing={() => { this.orgCtaInput.focus(); }}
                  blurOnSubmit={false}
                  value={this.state.supportUs}
                />
              </View> */}                       
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
