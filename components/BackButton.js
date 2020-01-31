import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const DoneButton = props => {
  // console.log(props);
  const handlePress = () => {
    props.navigation.goBack(null);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 18 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          height: 35
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontFamily: "Lato"
          }}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoneButton;
