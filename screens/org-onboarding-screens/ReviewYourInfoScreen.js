import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';

const ReviewYourInfoScreen = props => {
  const backendState = props.navigation.getParam(
    'backendState',
    'defaultValue'
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={86}
      enabled
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.obBody}>
          <Text style={styles.obTitle}>Review your info</Text>
        </View>
        <View>
          <View>
            <Text style={styles.obText}>
              Check that everything looks good and tap submit, or go back and
              edit
            </Text>
          </View>
          <View style={styles.borderContainer}>
            <Text style={styles.opaqueHeader}>Account Administrator</Text>
            <Text style={styles.obText}>Alice Kellan</Text>
            <Text style={styles.obText}>Director of Operations</Text>
            <Text style={styles.obText}>akellan@conservation.org</Text>
          </View>
          <View style={styles.borderContainer}>
            <Text style={styles.opaqueHeader}>Contact & Credentials</Text>
            <Text style={styles.obSubtitle}>Conservation Organization</Text>
            <Text style={styles.obText}>www.conservation.org</Text>
            <View style={styles.row}>
              <Text style={styles.obSubtitle}>Tel:</Text>
              <Text style={styles.obText}>001 458 123 4567</Text>
            </View>
            <View>
              <Text style={styles.obSubtitle}>Address:</Text>
              <Text style={styles.obText}>
                1234 5th Street Eugene, OR 98765 USA{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.obSubtitle}>Credentials uploaded:</Text>
              <Text style={styles.obText}>
                ConservOrg_501c3.pdf ConservOrg_NGO.pdf
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.opaqueHeader}>Organization Activity</Text>
          <Text style={styles.obSubtitle}>Countries of Operation:</Text>
          <Text style={styles.obText}>Algeria, Belgium, USA</Text>
          <View>
            <Text style={styles.obSubtitle}>Project 1</Text>
            <Text style={styles.obText}>Project info goes here</Text>
          </View>
          <View>
            <Text style={styles.obSubtitle}>Project 2</Text>
            <Text style={styles.obText}>Project info goes here</Text>
          </View>
          <View>
            <Text style={styles.obSubtitle}>Project 3</Text>
            <Text style={styles.obText}>Project info goes here</Text>
          </View>
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.opaqueHeader}>Partnerships & Affiliations</Text>
          <Text style={styles.obText}>Oregon State University</Text>
          <Text style={styles.obText}>World Wildlife Fund</Text>
          <Text style={styles.obText}>GreenPeace</Text>
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.opaqueHeader}>Miscellaneous Items</Text>
          <Text style={styles.obText}>
            OWe will join Key Conservation in practicing Conservation Optimism.
          </Text>
          <Text style={styles.obText}>
            Our Organization does use smartphones.
          </Text>
        </View>
        <NavigateButton
          label="Next"
          onButtonPress={() => {
            props.navigation.navigate('OrganizationSurvey', {
              backendState: backendState
            });
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewYourInfoScreen;
