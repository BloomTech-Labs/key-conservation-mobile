import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles.js';


const KeyConservationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>
                Let's go over how Key Conservation works
            </Text>
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("Can")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default KeyConservationScreen;