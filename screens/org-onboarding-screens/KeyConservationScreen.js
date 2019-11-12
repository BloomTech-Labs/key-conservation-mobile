import React from "react";
import {Text, Button, View} from "react-native";

const KeyConservationScreen = (props) => {
    return (
        <View>
            <Text>
                Let's go over how Key Conservation works
            </Text>
            <Button 
                title="Next"
                onPress={() => {
                    props.navigation.navigate("Can")
                }}
            />
        </View>
    );
}

export default KeyConservationScreen;