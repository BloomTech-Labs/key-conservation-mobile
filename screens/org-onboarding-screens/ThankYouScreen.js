import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles';

const ThankYouScreen = props => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Thank you for subscribing!</Text>
            <View>
                <Text style={styles.obText}>
                    While you're being verified feel free to get started on your portfolio.
                    Check out how other organizations like yours are making their portfolios 
                    <Text style={{fontWeight: "bold"}}>here.</Text>
                </Text>
            </View>
            <Button  style={styles.obFwdContainer}title="done"/>
        </View>
    )
}

export default ThankYouScreen