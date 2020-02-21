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
import { connect } from 'react-redux';
import { clearMedia } from '../../store/actions';
import UploadMedia from '../../components/UploadMedia';
import * as SecureStore from 'expo-secure-store';

const TellAboutOrganizationScreen = props => {
  const [airtableKey, setAirtableKey] = useState({
    key: ''
  });
  const [airtableState, onChangeText] = useState({
    username: '',
    org_name: '',
    org_url_link: '',
    profile_image: '',
    location: '',
    country: '',
    phone_number: '',
    point_of_contact_name: '',
    point_of_contact_position: '',
    email: ''
  }); // This state holds field data for airtable create(), and backend for later use.

  const getEmail = async () => {
    const email2 = await SecureStore.getItemAsync('email', {});
    const key = await SecureStore.getItemAsync('airtableKey', {});
    onChangeText({ email: email2 });
    setAirtableKey({ key: key });
  }; // This assigns the current account's email to the new airtable form.

  useEffect(() => {
    getEmail();
  }, []);

  const sendAirtable = () => {
    // this creates a new Airtable form.
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: airtableKey.key }).base(
      'appbPeeXUSNCQWwnQ'
    ); // These are the Airtable variables ^^^
    base('Table 1').create(
      [
        {
          fields: {
            org_name: airtableState.org_name,
            website: airtableState.org_link_url,
            phone: airtableState.phone_number,
            address: airtableState.location,
            country: airtableState.country,
            point_of_contact: airtableState.point_of_contact_name,
            poc_position: airtableState.point_of_contact_position,
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
          props.navigation.navigate('TellMore', {
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

          <View style={styles.sections}>
            <UploadMedia circular title='Upload your logo' />
          </View>

          <TextInput
            placeholder='Username'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, username: text })
            }
          />
          <TextInput
            placeholder='Main Address'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, location: text })
            }
            value={airtableState.location}
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
              onChangeText({ ...airtableState, point_of_contact_name: text })
            }
            value={airtableState.point_of_contact_name}
          />

          <TextInput
            placeholder='Point Of Contact Position'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({
                ...airtableState,
                point_of_contact_position: text
              })
            }
            value={airtableState.point_of_contact_position}
          />

          <TextInput
            placeholder='Org Phone'
            style={styles.obTextInput}
            onChangeText={text =>
              onChangeText({ ...airtableState, phone_number: text })
            }
            value={airtableState.phone_number}
          />

          <TextInput
            placeholder='Website Url'
            style={styles.obTextInputBottom}
            onChangeText={text =>
              onChangeText({ ...airtableState, org_link_url: text })
            }
            value={airtableState.org_link_url}
          />

          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              if (
                airtableState.org_name === undefined ||
                airtableState.org_link_url === undefined ||
                airtableState.phone_number === undefined ||
                airtableState.location === undefined ||
                airtableState.country === undefined ||
                airtableState.point_of_contact_name === undefined ||
                airtableState.point_of_contact_position === undefined ||
                airtableState.email === undefined
              ) {
                Alert.alert('Oops', 'Please fill in all sections of form', [
                  { text: 'Got it' }
                ]);
              } else {
                sendAirtable(); // This sends the airtable form and navigates. Also sends variables through navigation props.
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

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, { clearMedia })(
  TellAboutOrganizationScreen
);

// profile_image: this.props.mediaUpload;
