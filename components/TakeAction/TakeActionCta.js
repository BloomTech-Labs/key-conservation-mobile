import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import styles from '../../constants/TakeAction/TakeActionCta';

const TakeActionCta = props => {
  const { donate } = props;

  return (
    <React.Fragment>
      {donate.camp_cta ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              props.style
                ? [styles.buttonTouch, { ...props.style }]
                : styles.buttonTouch
            }
            onPress={async () =>
              await WebBrowser.openBrowserAsync(donate.camp_cta)
            }
          >
            <Text style={styles.text}>donate</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default TakeActionCta;
