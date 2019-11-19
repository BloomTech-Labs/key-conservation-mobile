import React from "react";
import { Button, Text, TextInput, View, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';

const VerifyOrganizationScreen = (props) => {

    //PLEASE NOTE: THE "NEXT BUTTON ON HERE DOES NOT WORK..."
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Tell us more about your organization</Text>
            <Text style={styles.obFieldName}>In what countries does your organization work?</Text>
            <TextInput style={styles.obTextInput} />
            <Text style={styles.obFieldName}>Projects your organization is working on:</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Current partnerships and affiliations:</Text>
            <TextInput style={styles.obTextInput}/>


            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("VerifyDocumentation")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VerifyOrganizationScreen;