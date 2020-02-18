import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/VerifyDocs.js';

import * as WebBrowser from 'expo-web-browser';
import SmallPlus from '../../assets/jsicons/OnBoarding/SmallPlusSign';
import NavigateButton from './formElement/NavigateButton.js';
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
      alert(error);
    }
  }; // This opens up the in-app browser for 'Table 2' submission. This is required because the Airtable API doesnt allow for non-URL image uploads.

  getAirtable = () => {
    return null;
    // var Airtable = require("airtable");
    // var base = new Airtable({ apiKey: key }).base("appbPeeXUSNCQWwnQ");
    // console.log("VerifyDocumentation getAirtable activated");
    // base("Table 2")
    //   .select({
    //     maxRecords: 20,
    //     view: "Grid view",
    //     filterByFormula: `{email} = \'${state.email}\'`
    //   })
    //   .eachPage(
    //     function page(records) {
    //       records[0] === undefined
    //         ? Alert.alert(
    //             "Oops",
    //             "Please make sure the email provided in the document form matches the one you signed up with",
    //             [{ text: "Got it" }]
    //           )
    //         : records.forEach(function(record) {
    //             navigate(record); // Calls function and passes state via Navigation Parameters.
    //           });
    //     },
    //     function done(err) {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //     }
    //   );
  }; // This checks the 'Table 2' form for correct email, then checks for document upload.

  navigate = () => {
    const airtableState = props.navigation.getParam(
      'airtableStateAdd',
      'defaultValue'
    );
    props.navigation.navigate('ReviewYourInfo', {
      airtableStateAdd: airtableState,
      airtableKey: key
    });
  };

  return (
    <View style={styles.obBody}>
      <Text style={styles.obTitle}>Verify your organization </Text>
      <Text style={styles.obText}>
        To prevent fraud, we need to properly vet organization credentials.
      </Text>

      <View style={styles.borderContainer}>
        <TouchableOpacity
          style={styles.obUploadBtn}
          onPress={() => _handlePressButtonAsync()}
        >
          <SmallPlus />
        </TouchableOpacity>
        <Text style={styles.obText}>
          By clicking the button, you’ll be taken to an Airtable link to upload
          your official documentation.
        </Text>
      </View>
      <View style={styles.noBorderConatiner}>
        <View>
          <Lock />
        </View>
        <View>
          <Text style={styles.obSubtitle}>Privacy</Text>
          <Text style={[styles.obText, { marginTop: 0 }]}>
            Airtable is a secure platform
          </Text>
        </View>
      </View>

      <View style={styles.spacer} />
      <NavigateButton
        label='Next'
        onButtonPress={() => {
          navigate();
        }}
      />
    </View>
  );
};
