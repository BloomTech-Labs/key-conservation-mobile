import React, { useEffect, useRef } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import useForm from './hooks/useForm';
import DropDownSelect from './formElement/DropDownSelect';
import { Feather } from '@expo/vector-icons';
import styles from '../../constants/screens/org-onboarding-styles/OrganizationSurvey';

const OrganizationSurveyScreen = props => {
  const { values, handleChange, handleSubmit } = useForm(submit);

  const backendState = props.navigation.getParam('backendState', 'defaultValue');

  function submit() {
    props.navigation.navigate("UsernameScreen", { backendState: backendState });
  }

  return (
    <SafeAreaView style={styles.container}>
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
              <Feather name="info" size={20} />
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
              onChange={handleChange}
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
              onChange={handleChange}
              value={values.mission}
              placeholder="Type here"
              type="mission"
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
              onChange={handleChange}
              value={values.facebook}
              placeholder="Enter url"
              type="url"
              name="facebook"
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Instagram</Text>
            <TextInput
              style={[styles.obTextInput, styles.textRounded]}
              onChange={handleChange}
              value={values.instagram}
              placeholder="Enter url"
              type="url"
              name="instagram"
            />
          </View>
          <View style={styles.inputBlockSm}>
            <Text style={styles.obText}>Twitter</Text>
            <TextInput
              style={[styles.obTextInput, styles.textRounded]}
              onChange={handleChange}
              value={values.twitter}
              placeholder="Enter url"
              type="url"
              name="twitter"
            />
          </View>
          <View style={[styles.inputBlockSm, styles.buttonRow]}>
            <TouchableOpacity style={[styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Finish Later</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mainButton]}>
              <Text>Preview</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrganizationSurveyScreen;
