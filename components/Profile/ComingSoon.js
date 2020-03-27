import React from 'react';
import { View, Text } from 'react-native';

import KeyIconGray from '../../assets/jsicons/KeyCon/KeyIconGray';
import styles from '../../constants/Profile/CampBlankSpace';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <KeyIconGray />
      <Text style={styles.text}>More exciting features to come!</Text>
    </View>
  );
};
export default ComingSoon;
