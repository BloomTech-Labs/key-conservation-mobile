import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles';

const AlmostDoneScreen = props => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>You're Almost done!</Text>
            <View>
                <Text style={styles.obText}>
                    We want to know a little bit more about your organization so we can best improve
                    your experience. To finish verifying please fill out this quick survey (12 mins 
                    or less).
                </Text>
            </View>
            <TouchableOpacity  style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate('ThankYou')
                }}
                > 
                <Text style={styles.obFwdBtnText}>Survey</Text> 
                </TouchableOpacity>
        </View>
    );
}

export default AlmostDoneScreen;