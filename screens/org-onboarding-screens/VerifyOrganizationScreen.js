import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/VerifyOrg.js';

const VerifyOrganizationScreen = (props) => {

    const [airtableState, onChangeText] = useState({
        other_countries: '',
        multiple_projects: '',
        affiliations_partnerships: '',
        conservation_optimism: '',
        smartphone_access: '',
        smartphone_type: ''
    });

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keybUdphipr0RgMaa'}).base('appbPeeXUSNCQWwnQ');

    const airtableID = props.navigation.getParam('airtableID', 'defaultValue');
    const backendState = props.navigation.getParam('backendState', 'defaultValue')

    const updateAirtable = () => {
        base('Table 1').update([
            {
              "id": airtableID,
              "fields": {
                "other_countries": airtableState.other_countries,
                "affiliations_partnerships": airtableState.affiliations_partnerships,
                "conservation_optimism": airtableState.conservation_optimism,
                "multiple_projects": airtableState.multiple_projects,
                "smartphone_access": airtableState.smartphone_access,
                "smartphone_type": airtableState.smartphone_type
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function(record) {
              // console.log(record.getId());
            });
          });
    }
    
    return (
        <View style={styles.obBody}>
            <Text style={styles.obTitle}>Tell us more about your organization</Text>

            <Text style={styles.obFieldName}>In what countries does your organization work?</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, other_countries: text })}
            value={airtableState.other_countries} />

            <Text style={styles.obFieldName}>Projects your organization is working on:</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, multiple_projects: text })}
            value={airtableState.multiple_projects} />

            <Text style={styles.obFieldName}>Current partnerships and affiliations:</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, affiliations_partnerships: text })}
            value={airtableState.affiliations_partnerships} />

            <Text>Will you join us in Conservation Optimism?</Text>
            <Switch 
                value={airtableState.conservation_optimism}
                onValueChange={newValue => onChangeText({ ...airtableState, conservation_optimism: newValue})}
            />

            <Text>Does your organization have access to a smartphone?</Text>
            <Switch 
                value={airtableState.smartphone_access}
                onValueChange={newValue => onChangeText({...airtableState, smartphone_access: newValue })}
            />

            <Text style={styles.obFieldName}>If so what kind of smartphone? (Apple or Android)</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, smartphone_type: text })}
            value={airtableState.smartphone_type} />

            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    updateAirtable();
                    props.navigation.navigate("VerifyDocumentation", { backendState: backendState })
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VerifyOrganizationScreen;
