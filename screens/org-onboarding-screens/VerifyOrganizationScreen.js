import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';


const VerifyOrganizationScreen = (props) => {



    const [consOptimism, setConsOptimism] = useState(false);
    const [smartPhone, setSmartPhone] = useState(false);
    
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Tell us more about your organization</Text>
            <Text style={styles.obFieldName}>In what countries does your organization work?</Text>
            <TextInput style={styles.obTextInput} />
            <Text style={styles.obFieldName}>Projects your organization is working on:</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Current partnerships and affiliations:</Text>
            <TextInput style={styles.obTextInput}/>
            <Text>Will you join us in Conservation Optimism?</Text>
            <Switch 
                value={consOptimism}
                onValueChange={newValue => setConsOptimism(newValue)}
            />
            <Text>Does your organization have access to a smartphone?</Text>
            <Switch 
                value={smartPhone}
                onValueChange={newValue => setSmartPhone(newValue)}
            />

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
