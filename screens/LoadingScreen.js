import React from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";
import {
  getLoadingData,
  getProfileData,
  afterFirstLogin
} from "../store/actions";
import { AmpEvent, AmpInit } from "../components/withAmplitude";
import styles from "../constants/screens/LoadingScreen";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keybUdphipr0RgMaa" }).base(
  "appbPeeXUSNCQWwnQ"
); // variables for Airtable API.

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
      // isVetting: false
    };
  }

  getAirtable = () => {
    // Checks airtable form if in vetting process.
    console.log("getAirtable activated");
    base("Table 1")
      .select({
        maxRecords: 20,
        view: "Grid view",
        filterByFormula: `{email} = \'${this.state.email}\'`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log("Retrieved", record.fields);
            this.checkAirtable(record); // calls method inside componentDidMount.
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

  async componentDidMount() {
    this.getAirtable(); // Checks if user is in vetting process.
    const sub = await SecureStore.getItemAsync("sub", {});
    const roles = await SecureStore.getItemAsync("roles", {});
    const email = await SecureStore.getItemAsync("email", {});

    this.setState({ email: email });

    checkAirtable = (record, props) => {
      console.log("checkAirtable activated");
      console.log("record: " + record.isVetting);
      if (record.fields.isVetting === true) {
        this.props.navigation.navigate("Vetting");
      } else {
        // if in vetting process, sends them back to VettingCheck, otherwise component runs as usual.
        return null;
      }
    };

    // This checks to see if the sub id is a user on the DB
    if (!sub) {
      this.props.navigation.navigate("Login");
    } else {
      await this.props.getLoadingData(sub);

      if (this.props.userRegistered === true) {
        this.props.getProfileData(null, sub, true);

        if (this.props.userId) {
          await SecureStore.setItemAsync("id", `${this.props.userId}`);
          AmpInit();
          AmpEvent("Login");

          if (this.props.firstLogin) {
            this.props.afterFirstLogin();
            if (roles === "conservationist") {
              // getAirtable() === null ? // Checks vetting status.
              this.props.navigation.navigate("EditPro");
            } else {
              this.props.navigation.navigate("EditSupPro");
            }
          } else {
            this.props.navigation.navigate(
              roles === "conservationist" ? "Conservationist" : "Supporter"
            );
          }
        } else {
          this.props.navigation.navigate("Login");
        }
      } else {
        this.props.navigation.navigate(
          roles === "conservationist" ? "OrgOnboard" : "CreateAccount"
        );
      }
    }
  }

  render() {
    return (
      <>
        {/* {this.getAirtable()} */}
        <ImageBackground
          source={require("../assets/images/FurBackground.png")}
          style={styles.container}
        >
          <Image
            style={styles.logo}
            source={require("../assets/images/keyFullWhite.png")}
          />

          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  currentUserProfile: state.currentUserProfile,
  userId: state.currentUserProfile.id,
  firstLogin: state.firstLogin,
  userRole: state.currentUserProfile.roles,
  profileReset: state.profileReset,
  userRegistered: state.userRegistered
});

export default connect(mapStateToProps, {
  getLoadingData,
  getProfileData,
  afterFirstLogin
})(LoadingScreen);
