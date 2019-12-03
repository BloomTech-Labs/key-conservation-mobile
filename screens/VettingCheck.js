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
    setEmail({ email: email });

    updateAirtable();
    await SecureStore.setItemAsync("isVetting", "true");
    await SecureStore.setItemAsync("vettingEmail", email);
    // await SecureStore.deleteItemAsync("vettingEmail", {});
    // await SecureStore.deleteItemAsync("isVetting", {});
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
  };

  getAirtable = () => {
    // updateAirtable();
    console.log("getAirtable activated");
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
  };

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
  };

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

      <View style={{ height: 20, margin: 25 }}>
        {/* {state.error ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {state.error}
            </Text>
          ) : props.error.config &&
            props.error.config.method === 'get' ? (
            <Text style={{ textAlign: 'center', color: 'green' }}>
              Please choose a username and enter it above
            </Text>
          ) : props.error.message ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>
              Failed to create user. Please try another username
            </Text>
          ) : null} */}
      </View>
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
