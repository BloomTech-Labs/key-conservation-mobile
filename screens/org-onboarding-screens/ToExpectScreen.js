import React from "react";
import { View, Text, Button } from "react-native";

const ToExpectScreen = () => {
    return (
        <View>
            <Text>Here's what you can expect:</Text>
            <Text>Overview</Text>
            <Text>You already know how Key Conservation can help connect you with individual contributors.</Text>
            <Text>Create your Page</Text>
            <Text>
            We'll set up your account and ask you to upload your organization's credentials. You can set up your profile page while you wait for us to verify.
            </Text>
            <Text>Go Visible!</Text>
            <Text>Once we verify your organization, you're all set up to go visible and start adding campaigns.</Text>
            <Button 
                title="next"
                onPress={() => {}}
            />
        </View>
    );
}

export default ToExpectScreen;