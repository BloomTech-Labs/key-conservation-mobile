import React from 'react';
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ellipse from '../assets/jsicons/Ellipse';

const AlertExample = () => {
  const showAlert = () => {
    Alert.alert(
      'Report',
      'Are you sure you want to report this user?',
      [
        {
          text: 'Report User',
          onPress: () =>
            Alert.alert(
              'Report',
              'Why are you reporting this user?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: "It's Inappropriate" },
                { text: "It's Spam" }
              ],
              { cancelable: true }
            )
        },
        { text: 'Deactivate User', style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity onPress={showAlert}>
      <Ellipse />
    </TouchableOpacity>
  );
};
export default AlertExample;
