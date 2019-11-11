import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SettingsButton = props => {
  const { navigation } = props;
  return (
    <TouchableOpacity
    onPress={() => {
        navigation.navigate(props.editRoute);
      }}
      style={{ padding: 18,
               paddingTop: 20}}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          height: 35
        }}>
           <AntDesign
                name='setting'
                color='#fff'
                size='23'
            />
        </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;
