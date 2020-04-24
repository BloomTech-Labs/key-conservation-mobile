import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, Linking, Animated } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactBody';


const OrgSkilledImpactBody = forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainers}>
        <View style={styles.fullWidthButtonContainer}>
        <TouchableOpacity style={styles.fullWidthButton}>
          <Text style={styles.buttonText}>SEARCH FOR SKILLED HELP</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default OrgSkilledImpactBody;
