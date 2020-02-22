import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ToExpect.js';
import CheckCircleWhite from '../../assets/jsicons/OnBoarding/CheckCircleWhite';

import NavigateButton from './formElement/NavigateButton';

const ToExpectScreen = props => {
  return (
    <View style={styles.obBody}>
      <ScrollView>
        <Text style={styles.obTitle}>Here's what you can expect:</Text>

        <View style={styles.contentWrapper}>
          <View style={styles.iconWrapper}>
            <CheckCircleWhite />
          </View>
          <View style={{ width: '90%' }}>
            <Text style={styles.obSubtitle}>Overview</Text>
            <Text style={styles.obText}>
              You already know how Key Conservation can help connect you with
              individual contributors. That's why you're here! We'll keep it
              brief.
            </Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.iconWrapper}>
            <CheckCircleWhite />
          </View>
          <View style={{ width: '90%' }}>
            <Text style={styles.obSubtitle}>Register</Text>
            <Text style={styles.obText}>
              Let's set up your account! You'll need to fill out a form, upload
              your credentials, and set up a profile on the following screens.
            </Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.iconWrapper}>
            <CheckCircleWhite />
          </View>
          <View style={{ width: '90%' }}>
            <Text style={styles.obSubtitle}>Get Verified</Text>
            <Text style={styles.obTextBottom}>
              Once your application has been approved, you'll receive a survey
              by email followed by a welcome kit. Once the survey is complete
              your organization will be live on the Key App and you can start
              adding connections and campaigns!
            </Text>
          </View>
        </View>
        {/* <NavigateButton
          onButtonPress={() => {
            props.navigation.navigate('ToExpect');
          }}
          //   color='black'
          label='Next'
          top={400}
          right={40}
        /> */}
        <TouchableOpacity
          style={styles.obFwdContainer}
          onPress={() => {
            props.navigation.navigate('KeyConservation');
          }}
        >
          <Text style={styles.obFwdBtnText}>Got It!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ToExpectScreen;
