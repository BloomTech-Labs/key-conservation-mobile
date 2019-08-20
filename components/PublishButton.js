import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const PublishButton = props => {
  // ampPressAction = () => {
  //   console.log('publish button clicked');
  //   props.pressAction;
  //   AmpEvent('Campaign Created');
  // };

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
            fontFamily: 'OpenSans-Regular'
          }}
        >
          Publish
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PublishButton;
