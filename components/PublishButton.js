import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const PublishButton = props => {
  //const { navigation } = props;
  return (
    <TouchableOpacity
      //onPress={}
      style={{ padding: 18 }}
    >
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
            color: '#fff'
          }}
        >
          Publish
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PublishButton;
