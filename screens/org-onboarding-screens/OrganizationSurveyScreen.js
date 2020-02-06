import React, { useState, useRef } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import useForm from './hooks/useForm';
import DropDownSelect from './formElement/DropDownSelect';
import { Feather } from '@expo/vector-icons';
import styles from '../../constants/screens/org-onboarding-styles/OrganizationSurvey';
import NavigateButton from './formElement/NavigateButton.js';
import UploadMedia from '../../components/UploadMedia';
import { connect } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

const OrganizationSurveyScreen = props => {
  const [values, handleChange] = useState({
    mission: '',
    issues: '',
    species: '',
    facebook: '',
    instagram: '',
    twitter: '',
    profile_image: '',
    org_cta: ''
  });
  const airtableStateAdd = props.navigation.getParam(
    'airtableStateAdd',
    'defaultValue'
  );
  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  var today = new Date();
  var date =
    today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear();

  handleSubmit = async () => {
    airtableStateAdd2 = {
      ...airtableStateAdd,
      ...values,
      profile_image: props.mediaUpload
    }; // Updates state for backend with new fields.
    stringBE = JSON.stringify(airtableStateAdd2);
    await SecureStore.setItemAsync('stateBE', stringBE); // Finally stores data object in SecureStore to be opened in 'EditPro' after user is vetted.
    await SecureStore.setItemAsync('vetting', 'true');
    // Sets variables to be checked in 'LoadingScreen' to determine whether current user is in vetting process.
    props.navigation.navigate('Vetting', {});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='height'
      keyboardVerticalOffset={86}
      enabled
    >
      <ScrollView style={styles.scrollView}>
        <View style={[styles.container]}>
          <View style={[styles.buttonRow, styles.greenBg]}>
            <View>
              <Text style={[styles.h5Text, { fontWeight: '600' }]}>
                Application Status: Processing
              </Text>
              <Text style={styles.h5Text}> Uploaded {date}</Text>
            </View>
            <View>
              <Feather name='info' size={20} />
            </View>
          </View>
          <View>
            <Text style={[styles.obTitle, { marginBottom: 24 }]}>
              Let Supporters {'\n'}Know About You!
            </Text>
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              In a brief statement, what is your organization’s mission?
            </Text>
            <TextInput
              style={[styles.textArea]}
              multiline
              onChangeText={text => handleChange({ ...values, mission: text })}
              value={values.mission}
              placeholder='Type here'
              type='mission'
              name='mission'
              required
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              Which species and habitats does your organization’s work focus on?
            </Text>
            <TextInput
              style={[styles.textArea]}
              multiline
              onChangeText={text => handleChange({ ...values, species: text })}
              value={values.species}
              placeholder='Type here'
              type='species'
              name='species'
              required
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              What big issues are your organization dealing with?
            </Text>
            <TextInput
              style={[styles.textArea]}
              multiline
              onChangeText={text => handleChange({ ...values, issues: text })}
              value={values.issues}
              placeholder='Type here'
              type='issues'
              name='issues'
              required
            />
          </View>
          <View>
            <Text style={[styles.obSubtitle, { fontSize: 18 }]}>
              Upload your organization's logo:
            </Text>
            <View>
              <UploadMedia circular />
            </View>
          </View>
          <View>
            <Text style={[styles.obSubtitle, { fontSize: 18 }]}>
              Donation Link
            </Text>
            <TextInput
              style={[styles.textRounded, { marginBottom: '7%' }]}
              autoCapitalize='none'
              onChangeText={text => handleChange({ ...values, org_cta: text })}
              value={values.org_cta}
              placeholder='Enter url'
              type='url'
              name='org_cta'
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={[styles.obSubtitle, { fontSize: 18 }]}>
              Connect to your social media sites:
            </Text>
            <Text style={styles.obText}>Facebook</Text>
            <TextInput
              style={[styles.textRounded]}
              autoCapitalize='none'
              onChangeText={text => handleChange({ ...values, facebook: text })}
              placeholder='Enter url'
              type='url'
              name='facebook'
              value={values.facebook}
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Instagram</Text>
            <TextInput
              style={[styles.textRounded]}
              autoCapitalize='none'
              onChangeText={text =>
                handleChange({ ...values, instagram: text })
              }
              value={values.instagram}
              placeholder='Enter url'
              type='url'
              name='instagram'
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Twitter</Text>
            <TextInput
              style={[styles.textRounded, { marginBottom: '7%' }]}
              autoCapitalize='none'
              onChangeText={text => handleChange({ ...values, twitter: text })}
              value={values.twitter}
              placeholder='Enter url'
              type='url'
              name='twitter'
            />
          </View>
          <NavigateButton label='Submit' onButtonPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {})(OrganizationSurveyScreen);
