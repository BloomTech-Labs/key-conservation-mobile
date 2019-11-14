import React from "react";
import { Button, Text, View, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';

const VerifyOrganizationScreen = (props) => {

    //PLEASE NOTE: THE "NEXT BUTTON ON HERE DOES NOT WORK..."
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Verify your organization</Text>
            <Text style={styles.obText}>How will you be receiving payments?</Text>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obOrgBtnText}>An external link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obOrgBtnText}>Bank account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obOrgBtn}>
                <Text style={styles.obOrgBtnText}>Checking account</Text>
            </TouchableOpacity>
            <View style={styles.spacer} />
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