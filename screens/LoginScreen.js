import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

import {
  loginStart,
  loginError,
  loginSuccess,
  getProfileData
} from '../store/actions';

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

export default (LoginScreen = props => {
  navigationOptions = () => {
    return {
      header: null
    };
  };

  const dispatch = useDispatch();
  const { currentUser, error } = useSelector(state => state);
  const { navigation } = props;

  const login = async navigation => {
    dispatch(loginStart());
    const redirectUrl = AuthSession.getRedirectUrl();
    // console.log(
    //   `***************Redirect URL---place inside of Auth0 dashboard for callback url: ${redirectUrl}`
    // );

    //this variable structures a query param for the /authorize API call to the auth0 API
    const queryParams = toQueryString({
      //this must come from your auth0 dashboard.
      client_id: '0otCu1tlz708JNQ06YDUhRyKwXstKj55',
      redirect_uri: redirectUrl,
      // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
      audience: 'https://burner-react-native/',
      // id_token will return a JWT token, token is access_token
      response_type: 'id_token token',
      // retrieve the user's profile and email from the openID
      scope: 'openid profile email',
      nonce: 'nonce'
    });

    //dynamicly navigating the proper routes on the auth0 app
    // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain
    const domain = 'https://dev-pdro3tql.auth0.com';
    const authUrl = `${domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log('Authentication response', response);

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
      console.log('************* access token', access_token);
      let role = jwtDecode(access_token);
      if (role.permissions.length > 0) {
        role.permissions[0].replace('role:', '');
      }
      console.log('role *****', role);
      // Retrieve the JWT token and decode it using the jwtToken imported above
      const jwtToken = response.params.id_token;
      //decodes the token so we can access the available attributes of the users Auth0 profile

      const decoded = jwtDecode(jwtToken);
      console.log('*******************', decoded);
      const chosenDecoded = {
        name: decoded.name,
        accessToken: access_token,
        sub: decoded.sub
      };

      dispatch(loginSuccess(chosenDecoded));
      await dispatch(getProfileData(false, decoded.sub, 'myProfile'));
      navigation.navigate(error ? 'CreateAccount' : 'Conservationist');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/keyFullBlack.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.SelectText}>Select one:</Text>
      </View>
      <View style={styles.buttons}>
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity
          onPress={() => login(navigation)}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>CONSERVATION ORGANIZATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Supporter')}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>GLOBAL SUPPORTER</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.needHelp}>
        <Text style={styles.needHelpText}>Not sure which one to pick?</Text>
        <Button
          title='Click Here'
          style={styles.needHelpText}
          onPress={() => {
            null;
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    // height: 667,
    // width: 375
  },
  button: {
    // margin: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    // marginTop: 50,
    height: 189,
    width: 189
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    // marginTop: 20,
    // marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SelectText: {
    fontSize: 27,
    fontFamily: 'Lato'
    // marginTop: 64
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '2.5%',
    // marginBottom: 50,
    // marginTop: 50,
    width: '90%'
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    marginBottom: 18,
    borderRadius: 4,
    // fontFamily:  'ArchivoNarrow',
    backgroundColor: 'black',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'ArchivoNarrow',
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  needHelp: {
    flexDirection: 'row',
    width: 375,
    height: '7.9%',
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  needHelpText: {
    color: 'white'
  },
  needHelpButton: {
    color: 'white',
    textDecorationLine: 'underline'
  }
});
