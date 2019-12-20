import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/ThankYou.js';

const ThankYouScreen = props => {

    const backendState = props.navigation.getParam('backendState', 'defaultValue');

    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Thank you for subscribing!</Text>
            <View>
                <Text style={styles.obTextBottom}>
                    While you're being verified feel free to get started on your portfolio.
                    Check out how other organizations like yours are making their portfolios 
                    <Text style={{fontWeight: "bold"}}> here.</Text>
                </Text>
            </View>
            <TouchableOpacity style={styles.obFwdContainer}
                            onPress={() => {
                                props.navigation.navigate('CreateAccount', { backendState: backendState });
                            }} >
                <Text style={styles.obText}>
                    Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThankYouScreen