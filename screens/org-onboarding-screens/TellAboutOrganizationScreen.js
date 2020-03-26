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
import * as SecureStore from 'expo-secure-store';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';
import CheckMark from '../../assets/jsicons/miscIcons/CheckMark';
import ProgressBar from './formElement/ProgressBar';
import UploadMedia from '../../components/UploadMedia';

const TellAboutOrganizationScreen = props => {
  const [airtableKey, setAirtableKey] = useState({
    key: ''
  });
  const [state, setState] = useState({
    name: '',
    link_url: '',
    profile_image:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
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
    setState({ email: email2 });
    setAirtableKey({ key: key });
    // console.log('email2', email2, state.email, 'state.email');
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
            name: state.name,
            website: state.link_url,
            phone: state.phone_number,
            address: state.location,
            country: state.country,
            point_of_contact: state.point_of_contact_name,
            poc_position: state.point_of_contact_position,
            email: state.email,
            profile_image: state.profile_image
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
            airtableState: state,
            airtableKey: airtableKey.key
          });
          // This passes the returned form ID and the needed fields for backend and airtable update() to the next component.
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <NavigateBack
            onButtonPress={() => {
              props.navigation.navigate('MakeAccount');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={30}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>15% Complete</Text>
        </View>
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
                onChangeText={text => setState({ ...state, name: text })}
                value={state.name}
              />
              {state.name ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>

            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Address</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text => setState({ ...state, location: text })}
                value={state.location}
              />
              {state.location ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.aroundInput}>
              <Text style={styles.placeholderText}>Country</Text>
              <TextInput
                style={styles.obTextInput}
                onChangeText={text => setState({ ...state, country: text })}
                value={state.country}
              />
              {state.country ? (
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
                  setState({
                    ...state,
                    point_of_contact_name: text
                  })
                }
                value={state.point_of_contact_name}
              />
              {state.point_of_contact_name ? (
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
                  setState({
                    ...state,
                    point_of_contact_position: text
                  })
                }
                value={state.point_of_contact_position}
              />
              {state.point_of_contact_position ? (
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
                  setState({ ...state, phone_number: text })
                }
                value={state.phone_number}
              />
              {state.phone_number ? (
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
                  setState({ ...state, link_url: text })
                }
                value={state.link_url}
              />
              {state.link_url ? (
                <View style={styles.aroundIcon}>
                  <CheckMark />
                </View>
              ) : null}
            </View>
            <View style={styles.uploadButton}>
              <UploadMedia
                media={state.profile_image}
                onChangeMedia={media =>
                  setState({ ...state, profile_image: media })
                }
                circular
                title='Upload your logo'
              />
            </View>

            <View style={styles.buttons}>
              {state.name === undefined ||
              state.link_url === undefined ||
              state.phone_number === undefined ||
              state.location === undefined ||
              state.country === undefined ||
              state.point_of_contact_name === undefined ||
              state.point_of_contact_position === undefined ||
              state.email === undefined ||
              state.profile_image === undefined ? (
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

export default TellAboutOrganizationScreen;
