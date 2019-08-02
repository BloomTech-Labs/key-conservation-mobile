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

export default class LoggedInView extends React.Component {
  async componentDidMount() {
    const savedUser = await SecureStore.getItemAsync("sub", {});
    console.log("**********loading screen**********", savedUser);
    setTimeout(() => {
      if (savedUser) {
        console.log("data is present");
        this.props.navigation.navigate("Conservationist");
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
