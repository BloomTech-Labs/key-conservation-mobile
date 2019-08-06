import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { getProfileData } from "../store/actions";

class LoadingScreen extends React.Component {
  async componentDidMount() {
    // id in the auth0 database
    const sub = await SecureStore.getItemAsync("sub", {});
    console.log("**********loading screen**********", sub);
    // id in the PG database
    this.props.getProfileData(null, sub, true);
    setTimeout(() => {
      if (sub) {
        console.log("data is present");
        console.log(this.props.userId);
        if (this.props.userId) {
          this.props.getProfileData(this.props.userId, null, true)
          console.log("yes", this.props.userId);
          this.props.navigation.navigate("Conservationist");
        } else {
          console.log("no", this.props.userId);
          this.props.navigation.navigate("CreateAccount");
        }
      } else {
        console.log("data is not present");
        this.props.navigation.navigate("Login");
      }
    }, 3000);
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/FurBackground.png")}
        style={styles.container}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/keyFullWhite.png")}
        />
        <Text style={styles.text}>Empowering Hope</Text>
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  userId: state.currentUser.accountInfo.id
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(LoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  logo: {
    width: 189,
    height: 189
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    color: "white"
  },
  indicator: {
    marginTop: 50
  }
});
