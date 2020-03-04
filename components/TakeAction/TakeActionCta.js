import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import styles from '../../constants/TakeAction/TakeActionCta';

const TakeActionCta = props => {
  const { donate } = props;

  return donate.camp_cta && donate.camp_cta !== null ? (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonTouch}
        onPress={async () => await WebBrowser.openBrowserAsync(donate.camp_cta)}
      >
        <Text style={styles.text}>donate</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default TakeActionCta;
