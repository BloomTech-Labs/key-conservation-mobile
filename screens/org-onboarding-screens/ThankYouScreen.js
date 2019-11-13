import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";

const ThankYouScreen = props => {
    return (
        <View>
            <Text>Thank you for subscribing!</Text>
            <View>
                <Text>
                    While you're being verified feel free to get started on your portfolio.
                    Check out how other organizations like yours are making their portfolios 
                    <Text style={{fontWeight: "bold"}}>here.</Text>
                </Text>
            </View>
            <Button />
        </View>
    )
}

export default ThankYouScreen