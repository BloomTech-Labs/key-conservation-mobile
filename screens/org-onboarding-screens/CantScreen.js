import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../../constants/screens/org-onboarding-styles/CantScreen.js';

import Circle from '../../assets/jsicons/OnBoarding/FilledCircle';

import NavigateButton from './formElement/NavigateButton';
import NavigateBack from './formElement/NavigateBack.js';

const CantScreen = (props) => {
  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.arrowView}>
            <NavigateBack
              onButtonPress={() => {
                props.navigation.navigate('Can');
              }}
              color="#000"
            />
          </View>
          <View style={styles.obBody}>
            <Text style={styles.obTitle}>
              What we <Text style={styles.highlight}> cannot </Text> do...
            </Text>

            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <Circle height="27" width="27" />
              </View>
              {/* <View style={styles.textBox}> */}
              <Text style={styles.obText}>
                Guarantee that all of your requests will get support and
                funding.
              </Text>
              {/* </View> */}
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <Circle height="27" width="27" />
              </View>
              {/* <View style={styles.textBox}> */}
              <Text style={styles.obText}>
                Provide your organization with internet access.
              </Text>
              {/* </View> */}
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.iconWrapper}>
                <Circle height="27" width="27" />
              </View>
              {/* <View style={styles.textBox}> */}
              <Text style={[styles.obText, styles.obTextBottom]}>
                Oversee work completed by skilled professionals.
              </Text>
              {/* </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <NavigateButton
          onButtonPress={() => {
            props.navigation.navigate('MakeAccount');
          }}
          label="Next"
        />
      </View>
    </React.Fragment>
  );
};

export default CantScreen;
