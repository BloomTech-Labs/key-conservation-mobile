import React from 'react';
import { View, Text } from 'react-native';

import PlusSignCircle from '../../assets/jsicons/PlusSignCircle';
import styles from '../../constants/Profile/CampBlankSpace';

const CampBlankSpace = props => {
  return (
    <View style={styles.container}>
      <View style={styles.plusIcon}>
        <PlusSignCircle />
        {props.role === 'supporter' ? (
          <Text style={styles.text}>
            {' '}
            This user has not saved any campaigns yet.
          </Text>
        ) : (
          <Text style={styles.text}>
            {' '}
            This organization has not posted any campaigns yet.
          </Text>
        )}
      </View>
    </View>
  );
};
export default CampBlankSpace;
