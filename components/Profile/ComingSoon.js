import React from 'react';
import { View, Text } from 'react-native';

import KeyIconGray from '../../assets/jsicons/KeyCon/KeyIconGray';
import styles from '../../constants/Profile/CampaignBlankSpace';
const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <KeyIconGray />
      <Text style={styles.text}>This user has not saved any campaigns yet.</Text>
    </View>
  );
};
export default ComingSoon;
