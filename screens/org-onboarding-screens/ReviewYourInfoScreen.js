import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';

const ReviewYourInfoScreen = props => {
  const backendState = props.navigation.getParam(
    'backendState',
    'defaultValue'
  );

  return (
    <View style={styles.obBody}>
      <ScrollView>
        <View>
          <Text style={styles.obTitle}>Review your info</Text>
        </View>
        <View>
          <View>
            <Text style={styles.obText}>
              Check that everything looks good and tap submit, or go back and
              edit
            </Text>
          </View>
          <View>
            <Text style={styles.obText}>Account Administrator</Text>
          </View>
          <View>
            <Text style={styles.obTextBottom}>Contact & Credentials</Text>
          </View>
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
    </View>
  );
};

export default ReviewYourInfoScreen;
