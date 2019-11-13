import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";


const KeyConservationScreen = (props) => {
    return (
        <View>
            <Text>
                Let's go over how Key Conservation works
            </Text>
            <TouchableOpacity 
                onPress={() => {
                    props.navigation.navigate("Can")
                }}
            >
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default KeyConservationScreen;