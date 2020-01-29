import React, { Component, useState, useEffect } from "react";
import { Button, Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "../../constants/screens/org-onboarding-styles/VerifyDocs.js";

import { Ionicons, Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

import NavigateButton from "./formElement/NavigateButton.js";

export default VerifyDocumentationScreen = props => {
  const [state, setState] = useState({
    // email: null,
    result: null,
    airtableState: null,
    checked: false
  });

  useEffect(() => {
    getState();
  }, []);

  const key = props.navigation.getParam("airtableKey", "defaultValue");

  getState = async () => {
    // const email = await SecureStore.getItemAsync("email", {});
    // console.log(email);
    const airtableState = props.navigation.getParam(
      "airtableStateAdd",
      "defaultValue"
    );
    setState({
      ...state,
      airtableState: airtableState
      // email: email
    });
  };

  _handlePressButtonAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        "https://airtable.com/shrkK93NtoOkfnMP8"
      );
      let redirectData;
      if (result.url) {
        redirectData = "https://airtable.com/shrkK93NtoOkfnMP8";
      }
      setState({ result, redirectData });
    } catch (error) {
      alert(error);
    }
  }; // This opens up the in-app browser for 'Table 2' submission. This is required because the Airtable API doesnt allow for non-URL image uploads.

  // getAirtable = () => {
  //   // console.log(key);
  //   var Airtable = require("airtable");
  //   var base = new Airtable({ apiKey: key }).base("appbPeeXUSNCQWwnQ");
  //   console.log("VerifyDocumentation getAirtable activated");
  //   base("Table 2")
  //     .select({
  //       maxRecords: 20,
  //       view: "Grid view",
  //       filterByFormula: `{email} = \'${state.email}\'`
  //     })
  //     .eachPage(
  //       function page(records) {
  //         // console.log(records[0]);
  //         records[0] === undefined
  //           ? Alert.alert(
  //               "Oops",
  //               "Please make sure the email provided in the document form matches the one you signed up with",
  //               [{ text: "Got it" }]
  //             )
  //           : records.forEach(function(record) {
  //               navigate(record); // Calls function and passes state via Navigation Parameters.
  //             });
  //       },
  //       function done(err) {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }
  //       }
  //     );
  // }; // This checks the 'Table 2' form for correct email, then checks for document upload.

  navigate = () => {
    props.navigation.navigate("ReviewYourInfo", {
      airtableStateAdd: state.airtableState,
      airtableKey: key
    });
  };

  return (
    <View style={styles.obBody}>
      <Text style={styles.obTitle}>Verify your organization </Text>
      <Text style={styles.obText}>
        To prevent fraud, we need to properly vet organization credentials.
      </Text>

      <View style={styles.borderContainer}>
        <TouchableOpacity
          style={styles.obUploadBtn}
          onPress={() => _handlePressButtonAsync()}
        >
          <Feather name="plus" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.obText}>
          By clicking the button, you’ll be taken to an Airtable link to upload
          your official documentation.
        </Text>
      </View>
      <View style={styles.noBorderConatiner}>
        <View>
          <Ionicons name="ios-lock" size={36} color="#00FF9D" />
        </View>
        <View>
          <Text style={styles.obSubtitle}>Privacy</Text>
          <Text style={[styles.obText, { marginTop: 0 }]}>
            Airtable is a secure platform
          </Text>
        </View>
      </View>

      <View style={styles.spacer} />
      <NavigateButton
        label="Next"
        onButtonPress={() => {
          navigate();
        }}
      />
    </View>
  );
};
