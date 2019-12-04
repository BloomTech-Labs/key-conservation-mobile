import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-navigation";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import styles from "../constants/screens/UsernameScreen";
import { logout } from "../store/actions";

import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

function VettingCheck(props) {
  useEffect(() => {
    getAirtableId();
  }, []);

  const [email, setEmail] = useState({
    email: ""
  });
  const [id, setId] = useState({
    id: ""
  });

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: "keybUdphipr0RgMaa" }).base(
    "appbPeeXUSNCQWwnQ"
  );

  getAirtableId = async () => {
    const id = await SecureStore.getItemAsync("airtableID", {});
    const email = await SecureStore.getItemAsync("email", {});
    setId({ id: id });
    setEmail({ email: email }); // This sets the current Airtable ID for the updateAirtable() and user email for checkAirtable();

    updateAirtable();
    await SecureStore.setItemAsync("isVetting", "true");
    await SecureStore.setItemAsync("vettingEmail", email);
    // This sets vetting variables to be checked by 'LoadingScreen'.
  };

  const checkAirtable = record => {
    console.log("checkAirtable activated");
    if (record.fields.accepted === true) {
      props.navigation.navigate("CreateAccount"); // UsernameScreen
      console.log("You're good to go!");
    } else {
      console.log("not vetted yet!");
      Alert.alert("Oops", "You're not vetted yet", [{ text: "Got it" }]);
    }
  }; // This Checks airtable 'Table 2' for 'accepted' field before allowig organization to access app.

  getAirtable = () => {
    // console.log("getAirtable activated");
    base("Table 2")
      .select({
        maxRecords: 20,
        view: "Grid view",
        filterByFormula: `{email} = \'${email.email}\'`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            // console.log('Retrieved', record.fields);
            checkAirtable(record);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }; // Checks 'Table 2' for 'accepted' field.

  updateAirtable = async () => {
    await base("Table 1").update(
      [
        {
          id: id.id,
          fields: {
            isVetting: true
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log(record.getId());
        });
      }
    );
  }; // Updates 'isVetting' field in 'Table 1' based on airtable ID.

  logoutPress = async () => {
    await SecureStore.deleteItemAsync("sub", {});
    await SecureStore.deleteItemAsync("email", {});
    await SecureStore.deleteItemAsync("roles", {});
    await SecureStore.deleteItemAsync("id", {});
    await SecureStore.deleteItemAsync("accessToken", {});
    logout();

    const logoutURL = "https://key-conservation.auth0.com/v2/logout?federated";

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {
        // this.setState({result})
      });
    }
    props.navigation.navigate("Logout");
  };

  return (
    <View style={styles.obBody}>
      <Text style={styles.obTitle}>Thanks for signing up!</Text>
      <Text style={styles.obText}>
        You will get an email once your organization has been approved.
      </Text>

      <View style={{ height: 20, margin: 25 }}></View>
      <TouchableOpacity onPress={getAirtable} style={styles.touchableButton}>
        <View style={styles.touchableView}>
          <Text style={styles.touchableText}>Check Vetting Status</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutPress} style={styles.touchableButton}>
        <View style={styles.touchableView}>
          <Text style={styles.touchableText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default VettingCheck;
