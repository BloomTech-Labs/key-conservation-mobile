import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const DoneButton = props => {
  // console.log(props);
  const handlePress = () => {
    if (props.override) {
      props.navigation.navigate("override");
    } else if (props.popToTop) {
      props.navigation.popToTop();
    } else if (props.fromMap) {
      props.navigation.navigate("MapHome");
    } else {
      props.navigation.goBack(null);
    }
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
            fontFamily: "Futura"
          }}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoneButton;
