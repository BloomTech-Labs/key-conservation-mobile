import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import BackArrowHeader from '../assets/jsicons/miscIcons/BackArrowHeader';

const BackButtonHeader = props => {
  return (
    <TouchableOpacity onPress={props.pressAction} style={{ padding: 18 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          height: 35
        }}
      >
        <BackArrowHeader />
        {/* <Text
          style={{
            color: '#fff',
            fontSize: 17,
            fontFamily: 'Lato'
          }}
        >
          Done
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default BackButtonHeader;
