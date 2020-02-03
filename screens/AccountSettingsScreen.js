import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import { ScrollView } from "react-navigation";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import * as SecureStorage from "expo-secure-store";
import DoneButton from "../components/DoneButton";

import styles from "../constants/screens/AccountSettingsScreen";
import * as WebBrowser from "expo-web-browser";

import Constants from "expo-constants";

class AccountSettingsScreen extends React.Component {
  state = {
    result: null,
    roles: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Account Settings",
      headerStyle: {
        backgroundColor: "#323338"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center"
      },
      headerRight: (
        <DoneButton
          pressAction={navigation.getParam("done")}
        />
      )
    };
  };
  getRole = async () => {
    const myRoles = await SecureStorage.getItemAsync("roles", {});
    this.setState({ roles: myRoles });
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
    this.getRole();
  }

  done = () => {
    if (this.state.roles === "conservationist") {
      this.props.navigation.navigate("MyPro");
    } else {
      this.props.navigation.navigate("MySupPro");
    }
  };
  viewReports = () => {
    this.props.navigation.navigate("AdminScreen");
  };
  logoutPress = async () => {
    await SecureStorage.deleteItemAsync("sub", {});
    await SecureStorage.deleteItemAsync("email", {});
    await SecureStorage.deleteItemAsync("roles", {});
    await SecureStorage.deleteItemAsync("id", {});
    await SecureStorage.deleteItemAsync("userId", {});
    await SecureStorage.deleteItemAsync("accessToken", {});
    // await SecureStorage.deleteItemAsync("airtableKey", {}); // for development
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
    this.props.navigation.navigate("Logout");
  };

  render() {
    console.log(this.props.currentUserProfile.admin);
    return (
      <ScrollView contentContainerStyle={styles.scrollBG}>
        <View style={styles.container}>
          {this.props.currentUserProfile.admin && (
            <View style={styles.sections}>
              <View style={styles.iconWrap}>
                <SvgUri
                  fill="#3b3b3b"
                  width="25"
                  height="25"
                  source={require("../assets/icons/user.svg")}
                />
                <Text style={styles.title}>Admin Controls</Text>
              </View>
              <TouchableOpacity
                style={styles.linkWrap}
                onPress={this.viewReports}
              >
                <Image
                  source={require("../assets/icons/logout.png")}
                  style={styles.logoutButton}
                />
                <Text style={styles.linkText}>Manage Reports</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <SvgUri
                fill="#3b3b3b"
                width="25"
                height="25"
                source={require("../assets/icons/user.svg")}
              />
              <Text style={styles.title}>Logout Of Your Profile</Text>
            </View>
            <TouchableOpacity
              style={styles.linkWrap}
              onPress={this.logoutPress}
            >
              <Image
                source={require("../assets/icons/logout.png")}
                style={styles.logoutButton}
              />
              <Text style={styles.linkText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, { logout })(AccountSettingsScreen);
