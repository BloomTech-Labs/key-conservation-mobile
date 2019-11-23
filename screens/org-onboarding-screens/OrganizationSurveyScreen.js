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

import * as SecureStore from 'expo-secure-store';

const OrganizationSurveyScreen = props => {
  const [values, handleChange] = useState({
    mission: 'Loren',
    issues: 'Loren',
    species: 'Loren',
    facebook: 'Loren',
    instagram: 'Loren',
    twitter: 'Loren'
  });

  const airtableStateAdd = props.navigation.getParam(
    'airtableStateAdd',
    'defaultValue'
  );

  handleSubmit = async () => {
    airtableStateAdd2 = Object.assign({ ...airtableStateAdd, ...values });
    // console.log(airtableStateAdd2)
    stringBE = JSON.stringify(airtableStateAdd2);
    await SecureStore.setItemAsync('stateBE', stringBE);
    props.navigation.navigate('Vetting'); // ('CreateAccount') goes to UsernameScreen
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
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
              <Text style={styles.h5Text}> Uploaded Sep 23 2019</Text>
            </View>
            <View>
              <Feather name="info" size={40} />
            </View>
          </View>
          <View>
            <Text style={[styles.obTitle, { marginBottom: 24 }]}>
              Let Supporters {'\n'}Know about you!
            </Text>
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              In a brief statement, what is your organization’s mission?
            </Text>
            <TextInput
              style={[styles.obTextInput, styles.textArea]}
              multiline
              onChangeText={(text) => handleChange({ ...values, mission: text})}
              value={values.mission}
              placeholder="Type here"
              type="mission"
              name="email"
              required
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              Which species and habitats does your organization’s work focus on?
            </Text>
            <DropDownSelect style={styles.dropDown} />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.obText}>
              What big issues are your organization dealing with?
            </Text>
            <TextInput
              style={[styles.obTextInput, styles.textArea]}
              multiline
              onChangeText={(text) => handleChange({ ...values, issues: text})}
              value={values.issues}
              placeholder="Type here"
              type="issues"
              name="email"
              required
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={[styles.obSubtitle, { fontSize: 18 }]}>
              Connect to your social media sites:
            </Text>
            <Text style={styles.obText}>Facebook</Text>
            <TextInput
              style={[styles.obTextInput, styles.textRounded]}
              onChangeText={(text) => handleChange({ ...values, facebook: text})}
              placeholder="Enter url"
              type="url"
              name="facebook"
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Instagram</Text>
            <TextInput
              style={[styles.obTextInput, styles.textRounded]}
              onChangeText={(text) => handleChange({ ...values, instagram: text})}
              value={values.instagram}
              placeholder="Enter url"
              type="url"
              name="instagram"
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Twitter</Text>
            <TextInput
              style={[styles.obTextInput, styles.textRounded, {marginBottom:'7%'}]}
              onChangeText={(text) => handleChange({ ...values, twitter: text})}
              value={values.twitter}
              placeholder="Enter url"
              type="url"
              name="twitter"
            />
          </View>
           <NavigateButton label="Preview" onButtonPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrganizationSurveyScreen;