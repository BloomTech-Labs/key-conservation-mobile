import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import BackArrowHeader from '../assets/jsicons/miscIcons/BackArrowHeader';
import styles from '../constants/screens/AccountSettingsScreen';

const BackButtonHeader = props => {
  return (
    <TouchableOpacity onPress={props.pressAction} style={{ padding: 18 }}>
      <View style={styles.backArrowTouch}>
        <BackArrowHeader />
      </View>
    </TouchableOpacity>
  );
};

export default BackButtonHeader;
