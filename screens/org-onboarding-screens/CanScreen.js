import React from "react";
import { Button, View, Text } from "react-native";

const CanScreen = () => {
    return (
        <View>
            <Text>What we can do to help your organization...</Text>
            <Text>
                This is a thing we can do.
            </Text>
            <Text>
                This is a thing we can do.
            </Text>
            <Text>
                This is a thing we can also do.
            </Text>
            <Button 
                title="Next"
                onPress
            />
        </View>
    );
}

export default CanScreen;