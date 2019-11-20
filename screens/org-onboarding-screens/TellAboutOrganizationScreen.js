import React, { useState, useEffect } from 'react';
import {
	Button,
	View,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';
import * as SecureStore from 'expo-secure-store';

import { connect } from "react-redux";
import { editProfileData, logout, clearMedia } from "../../store/actions/index";


const TellAboutOrganizationScreen = (props) => {

    const [airtableState, onChangeText] = useState({
        org_name: '',
        website: '',
        address: '',
        country: '',
        phone: '',
        point_of_contact: '',
        poc_poition: '',
        email: ''
    });

    const [backendState, onChangeBE] = useState({
        org_name: airtableState.org_name,
        org_link_url: airtableState.website,
        point_of_contact_name: airtableState.point_of_contact,
        country: airtableState.country
    });

    // const [currentSub, setCurrentSub] = useState({
    //   sub: ''
    // });

    getEmail = async () => {
        const email2 = await SecureStore.getItemAsync('email', {});
        console.log("email from SecureStore: " + email2);
        onChangeText({ email: email2 });
    };

    // getSub = async () => {
    //   const sub = await SecureStore.getItemAsync('sub', {});
    //   console.log("sub from SecureStore: " + sub);
    //   setCurrentId({ sub: sub });
    // }

    useEffect(() => {
        getEmail();
        // getSub();
    }, []);

    var Airtable = require('airtable');
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keybUdphipr0RgMaa' // store in enviornment variables before production.
    });
  
    var base = new Airtable({apiKey: 'keybUdphipr0RgMaa'}).base('appbPeeXUSNCQWwnQ');

    // const sendBackend = () => {
    //   console.log("ID from state should be here: " + currentId.id);
    //   editProfileData(currentId, backendState);
    // }

    const sendAirtable = () => {
    base('Table 1').create([
        { 
          'fields': {
            "org_name": airtableState.org_name,
            "website": airtableState.website,
            "phone": airtableState.phone,
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
          props.navigation.navigate("VerifyOrganization", { airtableID: airtableID,
          backendState: backendState }); // maybe store inside SecureStore in case session is interrupted?
        });
      });
    };

    return (
        <KeyboardAvoidingView style={styles.obBody} behavior="height" keyboardVerticalOffset={86} enabled>

            <ScrollView>
             {/* <View style={styles.obTextTopContainer}>
                <Text style={styles.obTextTop}>1 of 4</Text>
                </View> */}
				<Text style={styles.obTitle}>Tell us about your organization.</Text>
				<Text style={styles.obText}>
					Tell us about your main branch or headquarters. You'll have a chance to give more details on the 
                    next screen.
				</Text>
                <Text style={styles.obSubtitle}>
                    Your Organization
                </Text>

				{/* <Text style={styles.obFieldName}>Organization Name</Text> */}
				<TextInput
					placeholder="Org Name"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeText({ ...airtableState, org_name: text })}
					value={airtableState.org_name}
				/>

				{/* <Text style={styles.obFieldName}>Organization Address</Text> */}
				<TextInput
					placeholder="Main Address"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeText({ ...airtableState, address: text })}
					value={airtableState.address}
				/>

				{/* <Text style={styles.obFieldName}>Organization Country</Text> */}
				<TextInput
					placeholder="Country"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeText({ ...airtableState, country: text })}
					value={airtableState.country}
				/>

				{/* <Text style={styles.obFieldName}>Point of Contact Name</Text> */}
				<TextInput
					placeholder="Point Of Contact Name"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeText({ ...airtableState, point_of_contact: text })}
					value={airtableState.point_of_contact}
				/>

				{/* <Text style={styles.obFieldName}>Point of Contact Position</Text> */}
				<TextInput
					placeholder="Point Of Contact Position"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeText({ ...airtableState, poc_position: text })}
					value={airtableState.poc_position}
				/>

				{/* backend */}
				{/* <Text style={styles.obFieldName}>Organization Phone</Text> */}
				<TextInput
					placeholder="Org Phone"
					style={styles.obTextInput}
					onChangeText={(text) => onChangeBE({ ...backendState, phone: text })}
					value={backendState.phone}
				/>
				{/* backend */}

				{/* <Text style={styles.obFieldName}>Website URL</Text> */}
				<TextInput
					placeholder="Website Url"
					style={styles.obTextInputBottom}
					onChangeText={(text) => onChangeText({ ...airtableState, website: text })}
					value={airtableState.website}
				/>

				<TouchableOpacity
					style={styles.obFwdContainer}
					onPress={() => {
						sendAirtable();
                    // sendBackend();
                    // props.navigation.navigate("VerifyOrganization");
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {
  editProfileData,
  logout,
  clearMedia
})(TellAboutOrganizationScreen);
