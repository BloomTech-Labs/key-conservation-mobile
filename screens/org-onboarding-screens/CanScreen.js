import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../../constants/screens/org-onboarding-styles/CanScreen.js';

import CheckMark from '../../assets/jsicons/miscIcons/CheckMark';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';

const CanScreen = (props) => {
  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.arrowView}>
            <NavigateBack
              onButtonPress={() => {
                props.navigation.navigate('KeyConservation');
              }}
              color="#000"
            />
          </View>
          <View style={styles.obBody}>
            <Text style={styles.obTitle}>
              What we <Text style={styles.highlight}> can </Text> do to help
              your organization...
            </Text>
            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <CheckMark height="27" width="27" />
              </View>

              <Text style={styles.obText}>
                Help you tackle projects that need specialized skills by
                connecting your organization with professionals who want to make
                a difference.
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <CheckMark height="27" width="27" />
              </View>
              <Text style={styles.obText}>
                Gain global funding support for unplanned expenses and for your
                short and long term goals to help you achieve your overall
                mission.
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <CheckMark height="27" width="27" />
              </View>
              <Text style={styles.obText}>
                Provide a way to connect with your local community and visitors
                about real-time events and ways to get involved.
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <NavigateButton
              onButtonPress={() => {
                props.navigation.navigate('Cant');
              }}
              label="Next"
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default CanScreen;
