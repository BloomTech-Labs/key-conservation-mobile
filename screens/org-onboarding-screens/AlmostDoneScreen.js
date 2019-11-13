import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";

const AlmostDoneScreen = props => {
    return (
        <View>
            <Text>You're Almost done!</Text>
            <View>
                <Text>
                    We want to know a little bit more about your organization so we can best improve
                    your experience. To finish verifying please fill out this quick survey (12 mins 
                    or less).
                </Text>
            </View>
            <TouchableOpacity 
                onPress={() => {}}
                > 
                <Text>Survey</Text> 
                </TouchableOpacity>
        </View>
    );
}

export default AlmostDoneScreen;