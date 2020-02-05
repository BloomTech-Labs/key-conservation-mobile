import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../constants/Buttons/Back';

const DoneButton = props => {
  // console.log(props);
  const handlePress = () => {
    props.navigation.goBack(null);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text>
        <FontAwesome name='long-arrow-left' style={styles.outline} />
      </Text>
    </TouchableOpacity>
  );
};

export default DoneButton;
