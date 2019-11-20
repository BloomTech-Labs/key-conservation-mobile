import React, { useState, useEffect } from "react";
import { Button, View, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';
import * as SecureStore from "expo-secure-store";

const TellAboutOrganizationScreen = (props) => {

    const [airtableState, onChangeText] = useState({
        org_name: '',
        website: '',
        address: '',
        country: '',
        point_of_contact: '',
        poc_poition: '',
        email: ''
    });

    const [backendState, onChangeBE] = useState({
        phone: ''
    })

    getEmail = async () => {
        const email2 = await SecureStore.getItemAsync('email', {});
        onChangeText({ email: email2 });
    };

    useEffect(() => {
        getEmail();
    }, []);

    var Airtable = require('airtable');
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keybUdphipr0RgMaa' // store in enviornment variables before production.
    });
  
    var base = new Airtable({apiKey: 'keybUdphipr0RgMaa'}).base('appbPeeXUSNCQWwnQ');

    const sendAirtable = () => {
    base('Table 1').create([
        { 
          'fields': {
            "org_name": airtableState.org_name,
            "website": airtableState.website,
            "address": airtableState.address,
            "country": airtableState.country,
            "point_of_contact": airtableState.point_of_contact,
            "poc_position": airtableState.poc_position,
            "email": airtableState.email
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err + "*** test ***");
          return;
        }
        records.forEach(function (record) {
          // console.log(record.getId());
          let airtableID = record.getId();
          props.navigation.navigate("VerifyOrganization", { airtableID: airtableID }); // maybe store inside SecureStore in case session is interrupted?
        });
      });
    };

    return (
        <KeyboardAvoidingView style={styles.obBody} behavior="height" keyboardVerticalOffset={86} enabled>

            <ScrollView>
            <Text style={styles.obTitle}>Tell us about your organization.</Text>

            <Text style={styles.obText}>We will want to make sure we can autosave your progress. So first things first: let's get you some login credentials.</Text>

            <Text style={styles.obFieldName}>Organization Name</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, org_name: text })}
            value={airtableState.org_name} />

            <Text style={styles.obFieldName}>Organization Address</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, address: text })}
            value={airtableState.address} />

            <Text style={styles.obFieldName}>Organization Country</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, country: text })}
            value={airtableState.country} />

            <Text style={styles.obFieldName}>Point of Contact Name</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, point_of_contact: text })}
            value={airtableState.point_of_contact} />

            <Text style={styles.obFieldName}>Point of Contact Position</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeText({ ...airtableState, poc_position: text })}
            value={airtableState.poc_position} />

            {/* backend */}
            <Text style={styles.obFieldName}>Organization Phone</Text>
            <TextInput 
            style={styles.obTextInput}
            onChangeText={text => onChangeBE({ ...backendState, phone: text })}
            value={backendState.phone} />
            {/* backend */}

            <Text style={styles.obFieldName}>Website URL</Text>
            <TextInput 
            style={styles.obTextInputBottom}
            onChangeText={text => onChangeText({ ...airtableState, website: text })}
            value={airtableState.website} />
            
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    sendAirtable();
                    // props.navigation.navigate("VerifyOrganization");
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
 export default TellAboutOrganizationScreen;

//  const styles = StyleSheet.create({
//      inputfield: {
//         borderColor: "black",
//         borderWidth: 1
//      }
//  })