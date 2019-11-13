import React from "react";
import { Button, Text, View, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles';

const VerifyOrganizationScreen = (props) => {

    //PLEASE NOTE: THE "NEXT BUTTON ON HERE DOES NOT WORK..."
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Verify your organization</Text>
            <Text style={styles.obText}>How will you be receiving payments?</Text>
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obText}>An external link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obText}>Bank account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obText}>Checking account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("AlmostDone")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VerifyOrganizationScreen;