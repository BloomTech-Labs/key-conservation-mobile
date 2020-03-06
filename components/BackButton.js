import React from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import styles from '../constants/Buttons/Back';
import LongArrowLeft from '../assets/jsicons/miscIcons/LongArrowLeft';

// Optional props:

// confirm - A confirmation message that makes sure the user wants to go back,
// if not present, BackButton will go back immediately
// content - Text or a React component to replace the default arrow icon

const BackButton = props => {
  // console.log(props);
  const handlePress = () => {
    if (props.confirm) {
      Alert.alert('Confirm', props.confirm, [
        { text: 'Okay', onPress: goBack, style: 'default' },
        { text: 'Cancel', style: 'cancel' }
      ]);
    } else goBack();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={{
        fontFamily: 'Lato',
        color: 'white',
        fontSize: 16
      }}>{props.content || <LongArrowLeft style={styles.outline} />}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
