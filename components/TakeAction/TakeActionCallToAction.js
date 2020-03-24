import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import styles from '../../constants/TakeAction/TakeActionCallToAction';

const TakeActionCallToAction = props => {
  const { donate } = props;

  return (
    <React.Fragment>
      {donate.call_to_action ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              props.style
                ? [styles.buttonTouch, { ...props.style }]
                : styles.buttonTouch
            }
            onPress={async () =>
              await WebBrowser.openBrowserAsync(donate.call_to_action)
            }
          >
            <Text style={styles.text}>donate</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default TakeActionCallToAction;
