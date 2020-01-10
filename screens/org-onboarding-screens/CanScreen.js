import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/CanScreen.js';
import SvgUri from 'react-native-svg-uri';

const CanScreen = props => {
  return (
    <View style={styles.obBody}>
      <ScrollView>
        <View>
          <Text style={styles.obTitle}>
            What we <Text style={styles.highlight}> can </Text> do to help your
            organization...
          </Text>
        </View>
        <View>
          <View style={styles.contentWrapper}>
            <View style={styles.iconWrapper}>
              <SvgUri
                style={styles.svg}
                source={require('./../../assets/icons/onboarding/check_mark.svg')}
              />
            </View>
            <View style={styles.textBox}>
              <Text style={styles.obText}>
                Help you tackle projects that need specialized skills by
                connecting your organization with professionals who want to make
                a difference.
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
            <View style={styles.textBox}>
              <Text style={styles.obText}>
                Gain global funding support for unplanned expenses and for your
                short and long term goals to help you achieve your overall
                mission.
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
            <View style={styles.textBox}>
              <Text style={styles.obText}>
                Provide a way to connect with your local community and visitors
                about real-time events and ways to get involved.
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.obFwdContainer}
            onPress={() => {
              props.navigation.navigate('Cant');
            }}
          >
            <Text style={styles.obFwdBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CanScreen;
