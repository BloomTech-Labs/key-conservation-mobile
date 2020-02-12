import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import Axios from 'axios';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import KeyInfoGreen from '../assets/jsicons/KeyCon/Key_Info_Green';

import styles from '../constants/screens/LoginScreen';

import {
  loginStart,
  loginError,
  loginSuccess,
  getProfileData
} from '../store/actions';
import AnimalModal from '../components/Animals/AnimalModal';

// url for heroku staging vs production server
// production
//const seturl = 'https://key-conservation.herokuapp.com/api/';
// staging
const seturl = 'https://key-conservation-staging.herokuapp.com/api/';
/*
 Converts an object to a query string to be used by the request to auth0 via the dashboard application
*/
function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
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
      if (roles === 'conservationist') {
        return toQueryString({
          //this must come from your auth0 dashboard.
          client_id: 'elyo5qK7vYReEsKAPEADW2T8LAMpIJaf',
          redirect_uri: redirectUrl,
          // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
          audience: 'https://key-conservation',
          // id_token will return a JWT token, token is access_token
          response_type: 'id_token token',
          // retrieve the user's profile and email from the openID
          scope: 'openid profile email',
          nonce: 'nonce'
        });
      } else if (roles === 'supporter') {
        return toQueryString({
          //this must come from your auth0 dashboard.
          client_id: 'DikbpYHJNM2TkSU9r9ZhRlrMpEdkyO0S',
          redirect_uri: redirectUrl,
          // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
          audience: 'https://key-conservation',
          // id_token will return a JWT token, token is access_token
          response_type: 'id_token token',
          // retrieve the user's profile and email from the openID
          scope: 'openid profile email',
          nonce: 'nonce'
        });
      }
    };

    //dynamically navigating the proper routes on the auth0 app
    // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain
    const domain = 'https://key-conservation.auth0.com';
    const authUrl = `${domain}/authorize` + queryParams();

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    // console.log("Authentication response", response);

    //if successful then it will call the next function!!!
    //this should contain the access token and the id token
    //this calls the function below, passing the tokens as parameters
    if (response.type === 'success') {
      if (response.error) {
        dispatch(loginError(response.error));
        Alert(
          'Authentication error',
          response.error_description || 'something went wrong'
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

      await SecureStore.setItemAsync('accessToken', chosenDecoded.accessToken);
      await SecureStore.setItemAsync('sub', chosenDecoded.sub);
      await SecureStore.setItemAsync('email', chosenDecoded.email);
      await SecureStore.setItemAsync(
        'roles',
        roles === 'conservationist' ? 'conservationist' : 'supporter'
      );
      dispatch(loginSuccess(chosenDecoded));

      await dispatch(getProfileData(null, chosenDecoded.sub, true));
      if (currentUser.id) {
        await SecureStore.setItemAsync('id', currentUser.id);
        console.log(currentUser.id);
      }
      getEnvVar();
      navigation.navigate('Loading');
    }
  };

  const getEnvVar = async () => {
    const key = await SecureStore.getItemAsync('airtableKey', {});
    if (key) {
      console.log('key already exists!');
      return null;
    } else {
      console.log('getEnVar activated');
      const token = await SecureStore.getItemAsync('accessToken', {});
      Axios.get(`${seturl}airtable`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(async function(response) {
          // console.log("AIRTABLE KEY: " + response.data.airtable_key);
          await SecureStore.setItemAsync(
            'airtableKey',
            response.data.airtable_key
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/images/loginscreen2.png')}
      style={styles.container}
    >
      <AnimalModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      <View style={styles.logoContainer}>
        <Image
          style={isModalVisible === false ? styles.logo : styles.Hidden}
          source={require('../assets/images/keyFullWhite.png')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.selectTitle}>JOIN THE COMMUNITY</Text>
        <Text style={styles.highlight}>EMPOWERING HOPE.</Text>
        <Text style={styles.selectText}>Select One:</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            roles = 'supporter';
            login(navigation);
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>I want to help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            roles = 'conservationist';
            login(navigation);
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>My organization needs help</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.aboutIconContainer}>
        <TouchableOpacity
          style={styles.aboutIconTouch}
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
          <KeyInfoGreen />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
