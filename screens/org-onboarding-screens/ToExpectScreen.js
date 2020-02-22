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

import CheckCircleDuo from '../../assets/jsicons/OnBoarding/CheckCircleDuo';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack';

const ToExpectScreen = props => {
  return (
    <View style={styles.obBody}>
      <View style={styles.arrowView}>
        <NavigateBack
          onButtonPress={() => {
            props.navigation.navigate('HeyThere');
          }}
          paddingHorozontal='15%'
        />
      </View>
      {/* <ScrollView> */}
      <Text style={styles.obTitle}>Here's what you can expect:</Text>

      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <CheckCircleDuo fill='#3b3b3b' width='25' height='25' />
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
          <CheckCircleDuo fill='#3b3b3b' width='25' height='25' />
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
          <CheckCircleDuo fill='#3b3b3b' width='25' height='25' />
        </View>
        <View style={{ width: '90%' }}>
          <Text style={styles.obSubtitle}>Get Verified</Text>
          <Text style={styles.obTextBottom}>
            Once your application has been approved, you'll receive a survey by
            email followed by a welcome kit. Once the survey is complete your
            organization will be live on the Key App and you can start adding
            connections and campaigns!
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <NavigateButton
          onButtonPress={() => {
            props.navigation.navigate('KeyConservation');
          }}
          label='Next'
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default ToExpectScreen;
