import React from 'react';
import  { TouchableOpacity, View, Text } from 'react-native';


const EditButton = props => {
  const { navigation } = props;
  return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.editRoute)
        }}
        style={{ padding: 18 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            height: 35
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 17
            }}
          >
            Edit
          </Text>
        </View>
      </TouchableOpacity>
  )}

  export default EditButton;