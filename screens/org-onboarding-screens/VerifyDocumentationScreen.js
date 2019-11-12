import React from "react";
import { Button, Text, View } from "react-native";

const VerifyDocumentationScreen = () => {
    return (
        <View>
            <Text>Verify your organization </Text>
            <Text>To prevent fraud, we need to properly vet organization credentials.</Text>
            <Text>Proof of organization</Text>
            <Text>Please provide a clear photo of your 501c3 or other state-approved documentation.</Text>
            <Button title="Photo of documentation" />
            <Button>Next</Button>
        </View>
    );
}

export default VerifyDocumentationScreen;