import React, { useState } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

const DoneButton = (props) => {
  const [submitting, setSubmitting] = useState(false);

  const onPress = async () => {
    if (!submitting) {
      setSubmitting(true);
      const success = await props.pressAction();
      if (!success) {
        setSubmitting(false);
      } else props.navigation?.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 18 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          height: 35,
        }}
      >
        {submitting ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              fontFamily: 'Lato',
            }}
          >
            Done
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DoneButton;
