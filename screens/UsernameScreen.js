import React from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { ScrollView } from "react-navigation";
import { connect } from "react-redux";
import { AmpEvent } from "../components/withAmplitude";
import * as SecureStore from "expo-secure-store";
import styles from "../constants/screens/UsernameScreen";
import { postUser, logout } from "../store/actions";

import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

class UsernameScreen extends React.Component {
  state = {
    usernameInput: "",
    error: "",
    result: null
  };

  handlePress = async () => {
    const { error } = this.props;
    const sub = await SecureStore.getItemAsync("sub", {});
    const email = await SecureStore.getItemAsync("email", {});
    const role = await SecureStore.getItemAsync("roles", {});
    const id = await SecureStore.getItemAsync("airtableID", {});
    console.log("id: " + id);
    const username = this.state.usernameInput;

    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keybUdphipr0RgMaa" }).base(
      "appbPeeXUSNCQWwnQ"
    );
    updateAirtable = () => {
      console.log("update airtable triggered");
      base("Table 1").update(
        [
          {
            id: id,
            fields: {
              isVetting: false
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

    if (username.length > 4) {
      this.setState({
        error: null
      });
      let user = {
        username: username,
        sub: sub,
        roles: role,
        email: email
      };
      await this.props.postUser(user);
      AmpEvent("Account Created");
      updateAirtable();
      this.props.navigation.navigate(
        this.props.error ? "CreateAccount" : "Loading"
      );
    } else {
      this.setState({
        error: "Username is required to be at least 5 characters"
      });
    }
  };

  logoutPress = async () => {
    await SecureStore.deleteItemAsync("sub", {});
    await SecureStore.deleteItemAsync("email", {});
    await SecureStore.deleteItemAsync("roles", {});
    await SecureStore.deleteItemAsync("id", {});
    await SecureStore.deleteItemAsync("accessToken", {});
    this.props.logout();

    const logoutURL = "https://key-conservation.auth0.com/v2/logout?federated";

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {
        this.setState({ result });
      });
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {
        this.setState({ result });
      });
    }
    props.navigation.navigate("Logout");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.Card} />
          <View style={styles.textContainer}>
            <Text style={{ textAlign: "center" }}>Thanks for signing up!</Text>
            <Text style={{ textAlign: "center" }}>Choose a username!</Text>
          </View>
          <TextInput
            returnKeyType="go"
            placeholder="ex: Enter Username"
            style={styles.inputContain}
            onChangeText={text => this.setState({ usernameInput: text })}
            value={this.state.usernameInput}
            required
          />
        </View>
        <View style={{ height: 20, margin: 25 }}>
          {this.state.error ? (
            <Text style={{ textAlign: "center", color: "red" }}>
              {this.state.error}
            </Text>
          ) : this.props.error.config &&
            this.props.error.config.method === "get" ? (
            <Text style={{ textAlign: "center", color: "green" }}>
              Please choose a username and enter it above
            </Text>
          ) : this.props.error.message ? (
            <Text style={{ textAlign: "center", color: "red" }}>
              Failed to create user. Please try another username
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Continue</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.logoutPress}
          style={styles.touchableButton}
        >
          <View style={styles.touchableView}>
            <Text style={styles.touchableText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

UsernameScreen.navigationOptions = {
  title: "Sign Up"
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { postUser, logout })(UsernameScreen);
