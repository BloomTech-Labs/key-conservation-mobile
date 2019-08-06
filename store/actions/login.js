// import { AuthSession } from 'expo';
// import jwtDecode from 'jwt-decode';
// import store from '../configureStore.js';

// import { loginStart, loginError, loginSuccess } from './index.js';

// /*
//  Converts an object to a query string to be used by the request to auth0 via the dashboard application
// */
// function toQueryString(params) {
//   return (
//     '?' +
//     Object.entries(params)
//       .map(
//         ([key, value]) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//       )
//       .join('&')
//   );
// }

// export const login = async navigation => {
//   store.dispatch(loginStart());
//   const redirectUrl = AuthSession.getRedirectUrl();
//   console.log(
//     `***************Redirect URL---place inside of Auth0 dashboard for callback url: ${redirectUrl}`
//   );

//   //this variable structures a query param for the /authorize API call to the auth0 API
//   const queryParams = toQueryString({
//     //this must come from your auth0 dashboard.
//     client_id: '0otCu1tlz708JNQ06YDUhRyKwXstKj55',
//     redirect_uri: redirectUrl,
//     // this is the API that should be built in relation to this app. This address is found in the Auth0 dashboard at API's -> select API -> settings -> identifier
//     audience: 'https://auth0-example',
//     // id_token will return a JWT token, token is access_token
//     response_type: 'id_token token',
//     // retrieve the user's profile and email from the openID
//     scope: 'openid profile email',
//     nonce: 'nonce'
//   });

//   //dynamicly navigating the proper routes on the auth0 app
//   // the domain url is found in the Auth0 dashboard at applications -> select App -> settings -> Domain
//   const domain = 'https:dev-pdro3tql.auth0.com';
//   const authUrl = `${domain}/authorize` + queryParams;

//   // Perform the authentication
//   const response = await AuthSession.startAsync({ authUrl });
//   console.log('Authentication response', response);

//   //if successful then it will call the next function!!!
//   //this should contain the access token and the id token
//   //this calls the function below, passing the tokens as parameters
//   if (response.type === 'success') {
//     if (response.error) {
//       store.dispatch(loginError(response.error));
//       Alert(
//         'Authentication error',
//         response.error_description || 'something went wrong'
//       );
//       return;
//     }
//     //set the access token to be assigned to state for later use
//     const access_token = response.params.access_token;
//     // Retrieve the JWT token and decode it using the jwtToken imported above
//     const jwtToken = response.params.id_token;
//     //decodes the token so we can access the available attributes of the users Auth0 profile
//     const decoded = jwtDecode(jwtToken);
//     //   console.log("*******************", decoded);
//     const chosenDecoded = {
//       name: decoded.name,
//       accessToken: access_token
//     };

//     store.dispatch(loginSuccess(chosenDecoded));
//     navigation.navigate('Conservationist');
//   }
// };

// export const editProfile = async (updatedInfo, navigation) => {
//   store.dispatch(editProfileStart());
//   try {
//     console.log(updatedInfo);
//     if (
//       updatedInfo &&
//       updatedInfo.orgName &&
//       updatedInfo.orgLocation &&
//       updatedInfo.orgEmail
//     ) {
//       store.dispatch(editProfileSuccess(updatedInfo));
//       navigation.navigate('OrgApp');
//     } else {
//       throw 'Must contain all items in order to complete profile';
//     }
//   } catch (error) {
//     store.dispatch(editProfileError(error));
//   }
// };

// export const logout = navigation => {
//   store.dispatch(logoutStart());
//   store.dispatch(logoutSuccess());
//   navigation.navigate('Auth');
// };
