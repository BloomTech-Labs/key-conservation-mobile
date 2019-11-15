import React from "react";
import { Button, View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';

const TellAboutOrganizationScreen = (props) => {
    return (
        <View style={styles.obBody}>
            <ScrollView>
            <Text style={styles.obTitle}>Tell us about your organization.</Text>
            <Text style={styles.obText}>We will want to make sure we can autosave your progress. So first things first: let's get you some login credentials.</Text>
            <Text style={styles.obFieldName}>Organization Name</Text>
            <TextInput style={styles.obTextInput} />
            <Text style={styles.obFieldName}>Organization Address</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Organization Phone</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Website URL</Text>
            <TextInput style={styles.obTextInputBottom}/>
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("VerifyDocumentation")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
            </ScrollView>
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