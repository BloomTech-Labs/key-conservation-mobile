import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Text,
  TextInput,
  Image,
  View
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';
import { connect } from 'react-redux';
import { clearMedia } from '../../store/actions';
import UploadMedia from '../../components/UploadMedia';
import * as SecureStore from 'expo-secure-store';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';
import CheckMark from '../../assets/jsicons/miscIcons/CheckMark';

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
    if (props.mediaUpload) {
      onChangeText({ profile_image: props.mediaUpload });
    }
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
          });
          // This passes the returned form ID and the needed fields for backend and airtable update() to the next component.
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrowView}>
        <NavigateBack
          onButtonPress={() => {
            props.navigation.navigate('MakeAccount');
          }}
          color='#000'
        />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='padding'
        // keyboardVerticalOffset={6}
        enabled
      >
        <ScrollView>
          <Image
            source={require('../../assets/images/onboarding/tellus.png')}
            style={styles.tellUsImage}
          />
          <View style={styles.obBody}>
            <Text style={styles.obText}>
              Fill in where your main headquarters are located. You'll have a
              chance to give more details about where you work in the field on
              the next screen.
            </Text>
            <Text style={styles.obSubtitle}>Basic Information</Text>

            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Name</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({ ...airtableState, org_name: text })
                }
                value={airtableState.org_name}
              />
              {airtableState.org_name ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>

            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Address</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({ ...airtableState, location: text })
                }
                value={airtableState.location}
              />
              {airtableState.location ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Country</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({ ...airtableState, country: text })
                }
                value={airtableState.country}
              />
              {airtableState.country ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Contact</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({
                    ...airtableState,
                    point_of_contact_name: text
                  })
                }
                value={airtableState.point_of_contact_name}
              />
              {airtableState.point_of_contact_name ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Position</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({
                    ...airtableState,
                    point_of_contact_position: text
                  })
                }
                value={airtableState.point_of_contact_position}
              />
              {airtableState.point_of_contact_position ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Phone</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text =>
                  onChangeText({ ...airtableState, phone_number: text })
                }
                value={airtableState.phone_number}
              />
              {airtableState.phone_number ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Website</Text>
              <TextInput
                style={[styles.obTextInputBottom, styles.obTextInput]}
                onChangeText={text =>
                  onChangeText({ ...airtableState, org_link_url: text })
                }
                value={airtableState.org_link_url}
              />
              {airtableState.org_link_url ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>

            <View style={styles.uploadButton}>
              <UploadMedia circular title='Upload your logo' />
            </View>

            <View style={styles.buttons}>
              {airtableState.org_name === undefined ||
              airtableState.org_link_url === undefined ||
              airtableState.phone_number === undefined ||
              airtableState.location === undefined ||
              airtableState.country === undefined ||
              airtableState.point_of_contact_name === undefined ||
              airtableState.point_of_contact_position === undefined ||
              airtableState.email === undefined ? (
                <NavigateButton
                  label='Next'
                  inactive={true}
                  onButtonPress={() => {
                    Alert.alert('Oops', 'Please fill in all sections of form', [
                      { text: 'Got it' }
                    ]);
                  }}
                />
              ) : (
                <NavigateButton
                  label='Next'
                  onButtonPress={() => {
                    sendAirtable();
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, { clearMedia })(
  TellAboutOrganizationScreen
);

// profile_image: this.props.mediaUpload;
