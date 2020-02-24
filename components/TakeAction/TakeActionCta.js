import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import styles from '../../constants/TakeAction/TakeActionCta';

const TakeActionCta = props => {
  const { profile } = props;

  return profile.org_cta && profile.org_cta !== null ? (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonTouch}
        onPress={async () => await WebBrowser.openBrowserAsync(profile.org_cta)}
      >
        <Text style={styles.text}>Donate</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default TakeActionCta;
