import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/AlmostDone.js';

const AlmostDoneScreen = props => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Review your info</Text>
            <View>
                <Text style={styles.obTextBottom}>
                    Check that everything looks good and tap submit, or go back and edit.
                </Text>
            </View>
            <TouchableOpacity  style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate('ThankYou')
                }}
                > 
                <Text style={styles.obFwdBtnText}>Submit</Text> 
                </TouchableOpacity>
        </View>
    );
}

export default AlmostDoneScreen;