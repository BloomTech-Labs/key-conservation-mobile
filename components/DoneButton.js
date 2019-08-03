import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';

import { editProfileData } from '../store/actions';

const DoneButton = props => {
  const { id } = useSelector(state => state.currentUser);
  const { navigation } = props;
  const dispatch = useDispatch();
  const changes = props.changes;
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(editProfileData(id, changes));
        navigation.goBack();
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
            color: '#fff',
            fontSize: 17
          }}
        >
          Done
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoneButton;
