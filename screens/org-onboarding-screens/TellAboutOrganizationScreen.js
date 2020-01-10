import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  View
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';
import * as SecureStore from 'expo-secure-store';

const TellAboutOrganizationScreen = props => {
  const [airtableKey, setAirtableKey] = useState({
    key: ''
  });
  const [airtableState, onChangeText] = useState({
    org_name: '',
    website: '',
    address: '',
    country: '',
    phone: '',
    point_of_contact: '',
    poc_position: '',
    email: ''
  }); // This state holds field data for airtable create(), and backend for later use.

  getEmail = async () => {
    const email2 = await SecureStore.getItemAsync('email', {});
    const key = await SecureStore.getItemAsync('airtableKey', {});
    onChangeText({ email: email2 });
    setAirtableKey({ key: key });
  }; // This assigns the current account's email to the new airtable form.

  useEffect(() => {
    getEmail();
  }, []);

  // var Airtable = require("airtable");
  // var base = new Airtable({ apiKey: airtableKey }).base("appbPeeXUSNCQWwnQ"); // These are the Airtable variables ^^^

  const sendAirtable = () => {
    // this creates a new Airtable form.
    // console.log("key: " + airtableKey.key);
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: airtableKey.key }).base(
      'appbPeeXUSNCQWwnQ'
    ); // These are the Airtable variables ^^^
    base('Table 1').create(
      [
        {
          fields: {
            org_name: airtableState.org_name,
            website: airtableState.website,
            phone: airtableState.phone,
            address: airtableState.address,
            country: airtableState.country,
            point_of_contact: airtableState.point_of_contact,
            poc_position: airtableState.poc_position,
            email: airtableState.email
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err + '*** test ***');
          return;
        }
        records.forEach(function(record) {
          let airtableID = record.getId();
          props.navigation.navigate('VerifyOrganization', {
            airtableID: airtableID,
            airtableState: airtableState,
            airtableKey: airtableKey.key
          }); // This passes the returned form ID and the needed fields for backend and airtable update() to the next component.
        });
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.obBody}
      behavior='height'
      keyboardVerticalOffset={86}
      enabled
    >
      <ScrollView>
        <View style={styles.obBody}>
          <Text style={styles.obTitle}>Tell us about your organization.</Text>

          <Text style={styles.obText}>
            Fill in where your main headquarters are located. You'll have a
            chance to give more details about where you work in the field on the
            next screen.
          </Text>
          <Text style={styles.obSubtitle}>Basic Information</Text>

          <TextInput
            placeholder='Organization Name'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, org_name: text })
            }
          />
          <TextInput
            placeholder='Main Address'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, address: text })
            }
            value={airtableState.address}
          />

          <TextInput
            placeholder='Country'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, country: text })
            }
            value={airtableState.country}
          />

          <TextInput
            placeholder='Point Of Contact Name'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, point_of_contact: text })
            }
            value={airtableState.point_of_contact}
          />

          <TextInput
            placeholder='Point Of Contact Position'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, poc_position: text })
            }
            value={airtableState.poc_position}
          />

          <TextInput
            placeholder='Org Phone'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, phone: text })
            }
            value={airtableState.phone}
          />

          <TextInput
            placeholder='Website Url'
            style={styles.obTextInputBottom}
            onChangeText={text =>
              onChangeText({ ...airtableState, website: text })
            }
            value={airtableState.website}
          />

          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              if (
                airtableState.org_name === undefined ||
                airtableState.website === undefined ||
                airtableState.phone === undefined ||
                airtableState.address === undefined ||
                airtableState.country === undefined ||
                airtableState.point_of_contact === undefined ||
                airtableState.poc_position === undefined ||
                airtableState.email === undefined
              ) {
                Alert.alert('Oops', 'Please fill in all sections of form', [
                  { text: 'Got it' }
                ]);
              } else {
                sendAirtable();
              }
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TellAboutOrganizationScreen;
