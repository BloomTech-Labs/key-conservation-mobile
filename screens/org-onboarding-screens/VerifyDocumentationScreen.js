import React from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyDocs.js';

const VerifyDocumentationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Verify your organization </Text>
            <Text style={styles.obText}>To prevent fraud, we need to properly vet organization credentials.</Text>
            <Text style={styles.obSubtitle}>Proof of organization</Text>
            <Text style={styles.obText}>Please provide a clear photo of your 501(c)(3) or other state-approved documentation.</Text>
            <TouchableOpacity style={styles.obUploadBtn}>
                <Text style={styles.obText}>
                    Photo of Documentation
                </Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
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