import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles.js';

const HeyThereScreen = props => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Hey There!</Text>
            <Text style={styles.obSubtitle}>We can't wait to get your organization on board.</Text>
            <Text style={styles.obText}>After just a brief overview of our process, you'll be on your way to creating a custom page for your organization.</Text>
            <TouchableOpacity 
                style={styles.obBackContainer}
                onPress={() => {
                    props.navigation.navigate("ToExpect");
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HeyThereScreen;