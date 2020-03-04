import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';

import styles from '../../constants/TakeAction/TakeActionCta';

const TakeActionCta = props => {
  const { donate } = props;
  const role = props.currentUserProfile.roles;
  // console.log(role);

  if (!role || role === 'supporter') {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            props.style
              ? [styles.buttonContainer, { ...props.style }]
              : styles.buttonContainer
          }
          onPress={async () =>
            await WebBrowser.openBrowserAsync(donate.camp_cta)
          }
        >
          <Text style={styles.text}>donate</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (!donate.camp_cta || donate.camp_cta === null) {
    return null;
  } else {
    return null;
  }

  //   return !role && role !== 'supporter' ? (
  //     !donate.camp_cta || donate.camp_cta === null ? null : (
  //       <View
  //         style={
  //           props.style
  //             ? [styles.buttonContainer, { ...color }]
  //             : styles.buttonContainer
  //         }
  //       >
  //         <TouchableOpacity
  //           style={styles.buttonTouch}
  //           onPress={async () =>
  //             await WebBrowser.openBrowserAsync(donate.camp_cta)
  //           }
  //         >
  //           <Text style={styles.text}>donate</Text>
  //         </TouchableOpacity>
  //       </View>
  //     )
  //   ) : null;
};

const mapStateToProps = state => ({
  //   state: state
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps)(TakeActionCta);
