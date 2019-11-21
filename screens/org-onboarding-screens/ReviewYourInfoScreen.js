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

const ReviewYourInfoScreen = props => {
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
        <View style={[styles.inputBlockSm, styles.buttonRow]}>
          <TouchableOpacity style={[styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>Finish Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mainButton]}
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('OrganizationSurvey', { backendState: backendState });
            }}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewYourInfoScreen;
