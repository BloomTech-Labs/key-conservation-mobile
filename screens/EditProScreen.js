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

class EditProScreen extends React.Component {
  state = {
    usernameInput: ''
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
                <Text style={styles.sectionsText}>Organization Name</Text>
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
              <Text style={styles.sectionsText}>Username</Text>
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
              <Text style={styles.sectionsText}>Location</Text>
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
              <Text style={styles.sectionsText}>Bio</Text>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { postUser }
)(EditProScreen);

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
