import React from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles.js';

const VerifyDocumentationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Verify your organization </Text>
            <Text style={styles.obText}>To prevent fraud, we need to properly vet organization credentials.</Text>
            <Text style={styles.obSubtitle}>Proof of organization</Text>
            <Text style={styles.obText}>Please provide a clear photo of your 501c3 or other state-approved documentation.</Text>
            <Button  style={styles.UploadBtn}
                title="photo of documentation" 

            />
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("VerifyOrganization")
                }}            
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VerifyDocumentationScreen;