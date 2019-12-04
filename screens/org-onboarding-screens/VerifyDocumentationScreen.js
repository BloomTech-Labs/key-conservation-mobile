import React, { Component } from "react";
import { Button, Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "../../constants/screens/org-onboarding-styles/VerifyDocs.js";

import { Ionicons, Feather } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

import NavigateButton from "./formElement/NavigateButton.js";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keybUdphipr0RgMaa" }).base(
  "appbPeeXUSNCQWwnQ"
);

export default class VerifyDocumentationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      result: null
    };
  }

  async componentDidMount() {
    const email = await SecureStore.getItemAsync("email", {});
    await this.setState({ email: email });

    checkAirtableDoc = record => {
      const airtableStateAdd = this.props.navigation.getParam(
        "airtableStateAdd",
        "defaultValue"
      );
      // console.log("checkAirtableDoc activated");
      record.fields.attachments
        ? this.props.navigation.navigate("ReviewYourInfo", {
            airtableStateAdd: airtableStateAdd
          })
        : Alert.alert("Oops", "Image required inside form sumbission.", [
            { text: "Got it" }
          ]);
    }; // This checks if the user uploaded an image to the form before allowing progress.
  }

  _handlePressButtonAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        "https://airtable.com/shrkK93NtoOkfnMP8"
      );
      let redirectData;
      if (result.url) {
        redirectData = "https://airtable.com/shrkK93NtoOkfnMP8";
      }
      this.setState({ result, redirectData });
    } catch (error) {
      alert(error);
    }
  }; // This opens up the in-app browser for 'Table 2' submission. This is required because the Airtable API doesnt allow for non-URL image uploads.

  getAirtable = () => {
    console.log(this.state.email);
    console.log("getAirtable activated");
    base("Table 2")
      .select({
        maxRecords: 20,
        view: "Grid view",
        filterByFormula: `{email} = \'${this.state.email}\'`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log("Retrieved", record.fields);
            this.checkAirtableDoc(record);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }; // This checks the 'Table 2' form for correct email, then checks for document upload.

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.obBody}>
        <Text style={styles.obTitle}>Verify your organization </Text>
        <Text style={styles.obText}>
          To prevent fraud, we need to properly vet organization credentials.
        </Text>

        <View style={styles.borderContainer}>
          <TouchableOpacity
            style={styles.obUploadBtn}
            onPress={() => this._handlePressButtonAsync()}
          >
            <Feather name="plus" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.obText}>
            By clicking the button, you’ll be taken to an Airtable link to
            upload your official documentation.
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
            this.getAirtable();
          }}
        />
      </View>
    );
  }
}
