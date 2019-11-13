import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

const HeyThereScreen = props => {
    return (
        <View>
            <Text>Hey There!</Text>
            <Text>We can't wait to get your organization on board.</Text>
            <Text>After just a brief overview of our process, you'll be on your way to creating a custom page for your organization.</Text>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("ToExpect");
                }}
            >
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HeyThereScreen;