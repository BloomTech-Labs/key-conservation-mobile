import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/VerifyDocs.js';

import { Ionicons, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import NavigateButton from './formElement/NavigateButton.js';

export default class VerifyDocumentationScreen extends Component {
  state = {
    result: null
  };

  _handlePressButtonAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        'https://airtable.com/shrkK93NtoOkfnMP8'
      );
      let redirectData;
      if (result.url) {
        redirectData = 'https://airtable.com/shrkK93NtoOkfnMP8';
      }
      this.setState({ result, redirectData });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { navigation } = this.props;

    const backendState = navigation.getParam('backendState', 'defaultValue');
    console.log(
      'backendState',
      navigation.getParam('backendState')
    );
    return (
      <View style={styles.obBody}>
        <Text style={styles.obTitle}>Verify your organization </Text>
        <Text style={styles.obText}>
          To prevent fraud, we need to properly vet organization credentials.
        </Text>

        <View style={styles.borderContainer}>
          <TouchableOpacity
            style={styles.obUploadBtn}
            onPress={() => this._handlePressButtonAsync()}
          >
            <Feather name="plus" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.obText}>
            By clicking the button, you’ll be taken to an external link to
            upload your official documentation.
          </Text>
        </View>
        <View style={styles.noBorderConatiner}>
          <View>
            <Ionicons name="ios-lock" size={36} color="#00FF9D" />
          </View>
          <View>
            <Text style={styles.obSubtitle}>Privacy</Text>
            <Text style={[styles.obText, { marginTop: 0 }]}>
              Something about privacy goes right here
            </Text>
          </View>
        </View>

        <View style={styles.spacer} />
        <NavigateButton
          label="Next"
          onButtonPress={() => {
            navigation.navigate('ReviewYourInfo', {
              backendState: backendState
            });
          }}
        />
      </View>
    );
  }
}
