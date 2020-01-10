import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import styles from '../../constants/screens/org-onboarding-styles/ToExpectNext.js';
import SvgUri from 'react-native-svg-uri';
import NavigateButton from './formElement/NavigateButton.js';

const ToExpectNextCreateProfileScreen = props => {
  const airtableStateAdd = props.navigation.getParam(
    'airtableStateAdd',
    'defaultValue'
  ); // Catches backend state.
  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  return (
    <View style={styles.obBody}>
      <ScrollView>
        <View>
          <Text style={styles.obTitle}>Here's what you can expect next:</Text>
        </View>
        <View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <SvgUri
                style={styles.svg}
                source={require('./../../assets/icons/onboarding/check_mark.svg')}
              />
            </View>
            <View>
              <View style={{ width: '90%' }}>
                <Text style={styles.obSubtitle}>Overview</Text>
                <Text style={styles.obText}>
                  You already know how we can help connect your organization
                  with individual contributors. That's why you're here! We'll
                  keep it brief.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <SvgUri
                style={styles.svg}
                source={require('./../../assets/icons/onboarding/check_mark.svg')}
              />
            </View>
            <View style={{ width: '90%' }}>
              <Text style={styles.obSubtitle}>Register</Text>
              <Text style={styles.obText}>
                Let's set up your account! You'll need to fill out a form,
                upload your credentials, and set up a profile on the following
                screens.
              </Text>
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <SvgUri
                style={styles.svg}
                source={require('./../../assets/icons/onboarding/check_mark.svg')}
              />
            </View>
            <View style={{ width: '90%' }}>
              <Text style={styles.obSubtitle}>Create Your Profile</Text>
              <Text style={styles.obTextBottom}>
                Complete your base profile where we verify your organization.
                Once approved, you'll receive a survey by email, followed by a
                welcome kit.{' '}
                <Text style={styles.span}>
                  Now you can go visible! Start adding connections and
                  campaigns!
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <NavigateButton
            label='Next'
            onButtonPress={() => {
              props.navigation.navigate('OrganizationSurvey', {
                airtableStateAdd: airtableStateAdd,
                airtableKey: key
              });
            }} // Passes backend state.
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ToExpectNextCreateProfileScreen;
