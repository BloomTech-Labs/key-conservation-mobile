import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { AuthSession } from "expo";
import jwtDecode from "jwt-decode";

import {
  loginStart,
  loginError,
  loginSuccess,
  getProfileData
} from "../store/actions";

import * as SecureStore from "expo-secure-store";
/*
 Converts an object to a query string to be used by the request to auth0 via the dashboard application
*/
function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

export default LoginScreen = props => {
  navigationOptions = () => {
    return {
      header: null
    };
  };
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector(state => state);
  const { navigation } = props;
  let roles;

  const login = async navigation => {
    dispatch(loginStart());
    const redirectUrl = AuthSession.getRedirectUrl();
    // console.log('CURRENTUSER', currentUser)

    //you will need to uncomment out this consolelog to find your callback url to add into auth0 allowed callback urls to be able to hit the auth0 endpoint.
    // console.log(
    //   `***************Redirect URL---place inside of Auth0 dashboard for callback url: ${redirectUrl}`
    // );

    //this variable structures a query param for the /authorize API call to the auth0 API
    const queryParams = () => {
      if (roles === "conservationist") {
        return toQueryString({
          //this must come from your auth0 dashboard.
          client_id: "elyo5qK7vYReEsKAPEADW2T8LAMpIJaf",
          redirect_uri: redirectUrl,
          // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
          audience: "https://key-conservation",
          // id_token will return a JWT token, token is access_token
          response_type: "id_token token",
          // retrieve the user's profile and email from the openID
          scope: "openid profile email",
          nonce: "nonce"
        });
      } else if (roles === "supporter") {
        return toQueryString({
          //this must come from your auth0 dashboard.
          client_id: "DikbpYHJNM2TkSU9r9ZhRlrMpEdkyO0S",
          redirect_uri: redirectUrl,
          // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
          audience: "https://key-conservation",
          // id_token will return a JWT token, token is access_token
          response_type: "id_token token",
          // retrieve the user's profile and email from the openID
          scope: "openid profile email",
          nonce: "nonce"
        });
      }
    };

    //dynamicly navigating the proper routes on the auth0 app
    // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain
    const domain = "https://key-conservation.auth0.com";
    const authUrl = `${domain}/authorize` + queryParams();

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    // console.log("Authentication response", response);

    //if successful then it will call the next function!!!
    //this should contain the access token and the id token
    //this calls the function below, passing the tokens as parameters
    if (response.type === "success") {
      if (response.error) {
        dispatch(loginError(response.error));
        Alert(
          "Authentication error",
          response.error_description || "something went wrong"
        );
        return;
      }

      //set the access token to be assigned to state for later use
      const access_token = response.params.access_token;

      // console.log('************* access token', access_token);

      // Retrieve the JWT token and decode it using the jwtToken imported above
      const jwtToken = response.params.id_token;
      //decodes the token so we can access the available attributes of the users Auth0 profile

      const decoded = jwtDecode(jwtToken);
      // console.log("*******************", decoded);
      const chosenDecoded = {
        accessToken: access_token,
        email: decoded.email,
        sub: decoded.sub
      };

      await SecureStore.setItemAsync("accessToken", chosenDecoded.accessToken);
      await SecureStore.setItemAsync("sub", chosenDecoded.sub);
      await SecureStore.setItemAsync("email", chosenDecoded.email);
      await SecureStore.setItemAsync(
        "roles",
        roles === "conservationist" ? "conservationist" : "supporter"
      );
      dispatch(loginSuccess(chosenDecoded));

      await dispatch(getProfileData(null, chosenDecoded.sub, true));
      if (currentUser.id) {
        await SecureStore.setItemAsync("id", currentUser.id);
        console.log(currentUser.id);
      }
      navigation.navigate("Loading");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/furHQ.png")}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.selectTitle}>Enable <Text style={styles.highlight}>real-time</Text> conservation support.</Text>
        
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/keyFullWhite.png")}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            roles = "supporter";
            login(navigation);
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            roles = "conservationist";
            login(navigation);
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Organization</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.selectText}>Join the Community!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.alreadyText}>Already registered? </Text><Text style={styles.link}>Sign In</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    height: 189,
    width: 189
  },
  logoContainer: {
    flex: 1,
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50
  },
  selectText: {
    fontSize: 27,
    flexWrap: 'wrap',
    fontFamily: "OpenSans-SemiBold",
    color: "white",
    marginBottom: '5%'
  },
  alreadyText: {
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    color: "white",
    marginBottom: '5%'
  },
  link: {
    color: '#00FF9D',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    marginBottom: '5%'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center"
  },
  selectTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 36,
    fontFamily: "OpenSans-SemiBold",
    color: "white",
    marginTop: '9%'
  },
  highlight: {
    backgroundColor: "#00ff9d"
},
  buttons: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: '15%'
  },
  buttonContainer: {
    width: "70%",
    height: 50,
    marginBottom: 18,
    borderRadius: 25,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "#00FF9D",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "OpenSans-Bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20
  },
  needHelp: {
    flexDirection: "row",
    width: 375,
    height: "7.9%",
    opacity: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  spacer: {
    height: '10%'
  } 
});
