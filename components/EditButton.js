import React from 'react';
import  { TouchableOpacity, View, Text } from 'react-native';


const EditButton = props => {
  const { navigation } = props;
  return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.editRoute)
        }}
        style={{ paddingTop: 25, paddingBottom: 25, width: 250 }}
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
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: 2
            }}
          >
            Edit
          </Text>
        </View>
      </TouchableOpacity>
  )}

  export default EditButton;