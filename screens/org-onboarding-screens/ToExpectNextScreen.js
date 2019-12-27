import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../constants/screens/org-onboarding-styles/ToExpectNext.js';

const ToExpectNextScreen = props => {
  return (
    <View style={styles.obBody}>
      <ScrollView>
        <View>
          <Text style={styles.obTitle}>Up next: Register.</Text>
        </View>
        <View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('../../assets/images/onboarding/gcheck.png')}
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
              <AntDesign name='checkcircleo' size={24} />
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
              <AntDesign name='checkcircleo' size={24} />
            </View>
            <View style={{ width: '90%' }}>
              <Text style={styles.obSubtitle}>Create Your Profile</Text>
              <Text style={styles.obTextBottom}>
                Complete your base profile where we verify your organization.
                Once approved, you'll receive a survey by email, followed by a
                welcome kit. Now you can go visible! Start adding connections
                and campaigns!
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('MakeAccount');
            }}
          >
            <Text style={styles.obFwdBtnText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ToExpectNextScreen;
