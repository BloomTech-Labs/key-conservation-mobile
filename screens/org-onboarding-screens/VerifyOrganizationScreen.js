import React from "react";
import { Button, Text, View} from "react-native";

const VerifyOrganizationScreen = () => {
    return (
        <View>
            <Text>Verify your organization</Text>
            <Text>How will you be receiving payments?</Text>
            <Text>An external link</Text>
            <Text>Bank account</Text>
            <Text>Checking account</Text>
            <Button title="next"/>
        </View>
    );
}

export default VerifyOrganizationScreen;