import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/VerifyDocs.js';

import * as WebBrowser from 'expo-web-browser';
import SmallPlus from '../../assets/jsicons/OnBoarding/SmallPlusSign';
import NavigateButton from './formElement/NavigateButton.js';
import NavigateBack from './formElement/NavigateBack.js';
import ProgressBar from './formElement/ProgressBar';
import Lock from '../../assets/jsicons/OnBoarding/Lock';

export default VerifyDocumentationScreen = props => {
  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  getState = async () => {
    const airtableState = props.navigation.getParam(
      'airtableStateAdd',
      'defaultValue'
    );
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
    } catch (error) {
      console.log(error);
    }
  }; // This opens up the in-app browser for 'Table 2' submission. This is required because the Airtable API doesnt allow for non-URL image uploads.

  navigate = () => {
    const airtableState = props.navigation.getParam(
      'airtableStateAdd',
      'defaultValue'
    );
    props.navigation.navigate('Vetting', {
      airtableState: airtableState,
      airtableKey: key
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <NavigateBack
            onButtonPress={() => {
              props.navigation.navigate('AccountScreen');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={75}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>75% Complete</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.obBody}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/onboarding/pinkcircle.png')}
            />
            <Text style={styles.obTitle}>Verify your {'\n'}organization </Text>
          </View>

          <Text style={styles.obText}>
            To prevent fraud in our community, we need to verify all
            organizations' credentials.
          </Text>

          <View style={styles.borderContainer}>
            <TouchableOpacity
              style={styles.obUploadBtn}
              onPress={() => _handlePressButtonAsync()}
            >
              <SmallPlus fill='#CBCBCB' />
            </TouchableOpacity>
            <Text style={styles.obText}>
              By clicking the button, you’ll be taken to an external link to
              upload your current official documentation for your NGO,
              non-profit or charity.
            </Text>
          </View>
          <View style={styles.noBorderContainer}>
            <View>
              <Lock fill='#CBCBCB' />
            </View>
            <View>
              <Text style={styles.obSubtitle}>Privacy</Text>
              <Text style={[styles.obText, { marginTop: 0 }]}>
                All documentation is stored off of the KeyApp in a secure
                location.
              </Text>
            </View>
          </View>

          {/* <NavigateButton
            label='Next'
            onButtonPress={() => {
              navigate();
            }}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};
