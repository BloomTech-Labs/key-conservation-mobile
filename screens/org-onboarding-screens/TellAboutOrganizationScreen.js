import React from "react";
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/OnboardingStyles.js';

const TellAboutOrganizationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Tell us about your organization.</Text>
            <Text style={styles.obText}>We will want to make sure we can autosave your progress. So first things first: let's get you some login credentials.</Text>
            <Text style={styles.obFieldName}>Organization Name</Text>
            <TextInput style={styles.obTextInput} />
            <Text style={styles.obFieldName}>Organization Address</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Organization Phone</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>WebsiteURL</Text>
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
 export default TellAboutOrganizationScreen;

//  const styles = StyleSheet.create({
//      inputfield: {
//         borderColor: "black",
//         borderWidth: 1
//      }
//  })