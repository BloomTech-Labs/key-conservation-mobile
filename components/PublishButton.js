import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const PublishButton = props => {
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
        <Text
          style={{
            fontSize: 17,
            color: '#fff',
            fontFamily: 'Futura'
          }}
        >
          Publish
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PublishButton;
