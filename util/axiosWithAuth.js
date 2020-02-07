import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// IMPORTANT USAGE NOTES
// Usage:
/*
  axiosWithAuth(axiosInstance => {
    return axiosInstance...
  })
*/
// axiosWithAuth will take a callback function
// that gets an axios instance.
// By using that axios instance to perform a
// request that required authentication, the
// user's token will be included in the header

export default (dispatch, req) => {
  return SecureStore.getItemAsync('accessToken')
    .then(token => {
      // Create request with auth header
      const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Response interceptor to check whether or not
      // to log the user out
      instance.interceptors.response.use(
        response => response,
        error => {
          console.log(error);
          if (error.response?.data?.logout || error.response?.status === 401 || error.message.includes('401')) {
            dispatch(logout(error.response.data.msg));
          }
          return Promise.reject(error);
        }
      );

      return req(instance);
    })
    .catch(err => {
      console.log(err);
    });
};
