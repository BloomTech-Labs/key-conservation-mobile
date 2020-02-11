import React from 'react';
import { View, Text } from 'react-native';
import PlusSignCircle from '../../assets/jsicons/PlusSignCircle';
import style from '../../constants/Profile/CampBlankSpace';
const CampBlankSpace = () => {
  return (
    <View style={style.plusIcon}>
      <PlusSignCircle />
    </View>
  );
};
export default CampBlankSpace;
