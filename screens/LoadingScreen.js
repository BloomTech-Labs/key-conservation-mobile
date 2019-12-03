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
);

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isVetted: false
    };
    // this.getAirtable = this.getAirtable.bind(this);
  }

  getAirtable = () => {
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
            this.checkAirtable(record);
            // console.log("checkAirtable activated");
            // if (record.fields.isVetting === true) {
            // props.navigation.navigate("Vetting");
            // this.setState({ isVetting: true });
            // } else {
            // return null;
            // }
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

  async componentDidMount(props) {
    const sub = await SecureStore.getItemAsync("sub", {});
    const roles = await SecureStore.getItemAsync("roles", {});
    const email = await SecureStore.getItemAsync("email", {});
    // const id = await SecureStore.getItemAsync("airtableID", {});
    // console.log("id2: " + id);

    this.setState({ email: email });

    // updateAirtable = () => {
    //   console.log("update airtable triggered")
    //   base("Table 1").update(
    //     [
    //       {
    //         id: id,
    //         fields: {
    //           isVetting: false
    //         }
    //       }
    //     ],
    //     function(err, records) {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       records.forEach(function(record) {
    //         console.log(record.getId());
    //       });
    //     }
    //   );
    // };

    checkAirtable = (record, props) => {
      console.log("checkAirtable activated");
      if (record.fields.isVetting === true) {
        // updateAirtable();
        this.props.navigation.navigate("Vetting");
        // this.setState({ isVetted: true })
      } else {
        return null;
      }
    };

    this.getAirtable();

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
        // this.props.navigation.navigate('CreateAccount')
        // if (this.state.isVetted === false) {
        //   his.props.navigation.navigate(
        //     roles === "conservationist" ? "Vetting" : "CreateAccount"
        //   );
        // } else {
        this.props.navigation.navigate(
          roles === "conservationist" ? "OrgOnboard" : "CreateAccount"
        ); // after vetting success, user is navigated back to OrgOnboard because after logging in at least one additional instance to check vetting status, logging in again is no longer afterFirstLogin.
        // }
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
