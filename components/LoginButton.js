import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const LoginButton = props => {
  const { navigation } = props;

  if (!props.roles || props.roles !== 'conservationist') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.loginRoute);
        }}
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
              color: '#fff',
              fontFamily: 'Futura'
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default LoginButton;
