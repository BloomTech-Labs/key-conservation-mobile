import React, {Component} from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyDocs.js';


import * as WebBrowser from 'expo-web-browser';

export default class VerifyDocumentationScreen extends Component {
    state = {
		result: null
    };
    
    _handlePressButtonAsync = async () => {
        try {
        let result = await WebBrowser.openAuthSessionAsync('https://airtable.com/shrkK93NtoOkfnMP8');
        let redirectData;
        if (result.url) {
            redirectData = "https://airtable.com/shrkK93NtoOkfnMP8"
        }
        this.setState({ result, redirectData });
    } catch (error) {
        alert(error);
    }
    };

    render() {
        const { navigation } = this.props;

    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Verify your organization </Text>
            <Text style={styles.obText}>To prevent fraud, we need to properly vet organization credentials.</Text>
            <Text style={styles.obSubtitle}>Proof of organization</Text>
            <Text style={styles.obTextBottom}>Please provide a clear photo of your 501(c)(3) or other state-approved documentation.</Text>
            <TouchableOpacity  style={styles.obUploadBtn} onPress={this._handlePressButtonAsync}>
                <Text style={styles.obText}>Photo of Documentation</Text>
            </TouchableOpacity>
        <View style={styles.spacer} />
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    navigation.navigate("VerifyOrganization")
                }}            
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}
}
