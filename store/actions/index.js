import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

import { navigate } from '../../navigation/RootNavigator';
import { Alert } from 'react-native';
import JwtDecode from 'jwt-decode';

// For canceling requests
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// All our cancel functions will be stored here
// by eligible action creators
let cancellables = {};

// // This is defined here to prevent
// // any un

// // IMPORTANT USAGE NOTES
// // Usage:
// /*
//   axiosWithAuth(dispatch, axiosInstance => {
//     return axiosInstance...
//   })
// */
// // axiosWithAuth will take a callback function
// // that gets an axios instance.
// // By using that axios instance to perform a
// // request that required authentication, the
// // user's token will be included in the header
const axiosWithAuth = (dispatch, req) => {
  return SecureStore.getItemAsync('accessToken')
    .then((token) => {
      // Create request with auth header
      const instance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Response interceptor to check whether or not
      // to log the user out
      instance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.data?.logout) {
            dispatch(logout(error.response.data.message));
          }
          return Promise.reject(error);
        }
      );

      return req(instance);
    })
    .catch((err) => {
      console.log(err);
    });
};

// url for heroku staging vs production server
// comment out either server depending on testing needs
// production
export const seturl = 'https://key-conservation.herokuapp.com/api/';
// staging
// export const seturl = 'https://key-conservation-staging.herokuapp.com/api/';
// export const seturl = 'http://192.168.1.146:8000/api/';

const filterUrls = (keys, object) => {
  // If a user doesn't include http or https in their URL this function will add it.
  // If they already include it it will be ignored. and if it is capital "Https || Http" it will become lowercase.
  keys.forEach((key) => {
    if (
      object[key] &&
      object[key] !== null &&
      object[key].indexOf('http://') !== 0 &&
      object[key].indexOf('https://') !== 0
    ) {
      object[key] = object[key].toLowerCase();
      object[key] = 'https://' + object[key];
    }
  });
  return object;
};

export const [LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS] = [
  'LOGIN_START',
  'LOGIN_ERROR',
  'LOGIN_SUCCESS',
];

export const loginStart = () => ({
  type: LOGIN_START,
});
export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});
export const loginSuccess = (credentials, role) => async (dispatch) => {
  await SecureStore.setItemAsync('accessToken', credentials.idToken);

  const decoded = JwtDecode(credentials.idToken);

  await SecureStore.setItemAsync('sub', decoded.sub);
  await SecureStore.setItemAsync('email', decoded.email);
  await SecureStore.setItemAsync('roles', role);

  dispatch(getProfileData(null, decoded.sub, true))
    .then(() => {
      navigate('Loading');
      dispatch({
        type: LOGIN_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_ERROR,
      });
    });
};

export const LOGOUT = 'LOGOUT';

export const logout = (message = '') => async (dispatch) => {
  await SecureStore.deleteItemAsync('sub', {});
  await SecureStore.deleteItemAsync('email', {});
  await SecureStore.deleteItemAsync('roles', {});
  await SecureStore.deleteItemAsync('id', {});
  await SecureStore.deleteItemAsync('userId', {});
  await SecureStore.deleteItemAsync('accessToken', {});

  console.log('logging out');

  navigate('Logout');

  if (message) Alert.alert(message);

  dispatch({
    type: LOGOUT,
    payload: message,
  });
};

export const AFTER_FIRST_LOGIN = 'AFTER_FIRST_LOGIN';

export const afterFirstLogin = () => ({
  type: AFTER_FIRST_LOGIN,
});

export const getAirtableKey = () => {
  axiosWithAuth(null, (aaxios) => {
    aaxios
      .get(`${seturl}airtable`)
      .then(async (response) => {
        await SecureStore.setItemAsync(
          'airtableKey',
          response.data.airtable_key
        );
        return response.data.airtable_key;
      })
      .catch((error) => console.log(error));
  });
};

// This is used in the admin screen, report detail section
// Data comes in as a table name and an ID
// So this function allows for the dynamic request of any
// type of report
export const getCustomById = (table_name, id) => (dispatch) => {
  let url = `${seturl}`;

  switch (table_name) {
    case 'campaign_updates': {
      url += 'updates';
      break;
    }
    case 'comments': {
      url += 'comments/com';
      break;
    }
    case 'campaigns': {
      url += 'campaigns';
      break;
    }
    default: {
      console.warn(
        `Invalid table name ${table_name}: getCustomById(table_name, id) in actions`
      );
      return;
    }
  }

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios.get(`${url}/${id}`);
  });
};

// These actions are for the loading page to determine if:
// A) The user is logged in
// B) The account exists and user is not logged in
// C) The user has a sub and needs to register
// D) The user needs to make a sub and to register
export const [
  GET_AUTH_START,
  GET_AUTH_USER,
  GET_AUTH_REGISTER,
  GET_AUTH_ERROR,
] = ['GET_AUTH_START', 'GET_AUTH_USER', 'GET_AUTH_REGISTER', 'GET_AUTH_ERROR'];

export const getLoadingData = (sub) => (dispatch) => {
  let url = `${seturl}users/subcheck/${sub}`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(url)
      .then((response) => {
        let dbCheck = response.data.check.subCheck;
        if (dbCheck === true) {
          dispatch({ type: GET_AUTH_USER, payload: dbCheck });
        } else {
          dispatch({ type: GET_AUTH_REGISTER, payload: dbCheck });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_AUTH_ERROR, payload: error.message });
      });
  });
};

export const [GET_PROFILE_START, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS] = [
  'GET_PROFILE_START',
  'GET_PROFILE_ERROR',
  'GET_PROFILE_SUCCESS',
];

export const getProfileData = (
  id,
  sub,
  myProfile = false,
  noDispatch = false
) => (dispatch) => {
  {
    !noDispatch && dispatch({ type: GET_PROFILE_START });
  }

  let user, url;
  if (id) url = `${seturl}users/${id}`;
  else if (sub) url = `${seturl}users/sub/${sub}`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(url)
      .then((res) => {
        user = res.data.user;
        {
          !noDispatch &&
            dispatch({
              type: GET_PROFILE_SUCCESS,
              payload: { user, myProfile },
            });
        }
        return user;
      })
      .catch((err) => {
        if (noDispatch) {
          return err.message;
        } else {
          (dispatch) =>
            Promise.all([
              SecureStore.deleteItemAsync('sub', {}),
              SecureStore.deleteItemAsync('email', {}),
              SecureStore.deleteItemAsync('roles', {}),
              SecureStore.deleteItemAsync('id', {}),
              SecureStore.deleteItemAsync('accessToken', {}),
            ]).then(
              dispatch({ type: GET_PROFILE_ERROR, payload: err.message })
            );
        }
      });
  });
};

export const [EDIT_PROFILE_START, EDIT_PROFILE_ERROR, EDIT_PROFILE_SUCCESS] = [
  'EDIT_PROFILE_START',
  'EDIT_PROFILE_ERROR',
  'EDIT_PROFILE_SUCCESS',
];

export const editProfileData = (id, changes) => (dispatch) => {
  dispatch({ type: EDIT_PROFILE_START });

  const filteredChanges = filterUrls(
    ['facebook', 'twitter', 'instagram', 'link_url', 'call_to_action'],
    changes
  );

  let formData = new FormData();

  let keys = Object.keys(filteredChanges).filter((key) => {
    return key !== 'profile_image';
  });

  if (filteredChanges.profile_image) {
    const uri = filteredChanges.profile_image;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  keys.forEach((key) => {
    if (filteredChanges[key] !== null) {
      formData.append(key, filteredChanges[key]);
    }
  });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .put(`${seturl}users/${id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.user });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: EDIT_PROFILE_ERROR, payload: err });
      });
  });
};

export const [POST_USER_START, POST_USER_ERROR, POST_USER_SUCCESS] = [
  'POST_USER_START',
  'POST_USER_ERROR',
  'POST_USER_SUCCESS',
];

export const postUser = (user) => (dispatch) => {
  dispatch({ type: POST_USER_START });

  const filteredPost = filterUrls(
    ['facebook', 'twitter', 'instagram', 'link_url', 'call_to_action'],
    user
  );

  let formData = {};

  let keys = Object.keys(filteredPost).filter((key) => {
    return key !== 'profile_image';
  });

  if (filteredPost.profile_image) {
    const uri = filteredPost.profile_image;
    const uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    formData.photo = {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    };
  }

  keys.forEach((key) => {
    if (filteredPost[key] !== null) {
      formData = {
        ...formData,
        [key]: filteredPost[key],
      };
      console.log('formData from foreach', formData);
      return formData;
    }
  });

  console.log('formData', formData);

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(`${seturl}users`, formData)
      .then((res) => {
        dispatch({ type: POST_USER_SUCCESS, payload: res.data.user });
      })
      .catch((err) => {
        console.log(err.response, 'err in postUser');
        dispatch({ type: POST_USER_ERROR, payload: err });
      });
  });
};

export const [
  GET_FEED_START,
  EXPAND_FEED_SUCCESS,
  GET_FEED_SUCCESS,
  GET_FEED_ERROR,
] = [
  'GET_FEED_START',
  'GET_FEED_SUCCESS',
  'EXPAND_FEED_SUCCESS',
  'GET_FEED_ERROR',
];

export const getFeed = (startAt = 0, size = 8) => (dispatch) => {
  dispatch({ type: GET_FEED_START });
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}feed?startAt=${startAt}&size=${startAt + size}`)
      .then((res) => {
        dispatch({
          type: startAt > 0 ? EXPAND_FEED_SUCCESS : GET_FEED_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: GET_FEED_ERROR,
          payload:
            err.response?.data?.message ||
            'An error occurred while retrieving the feed.',
        });
      });
  });
};

export const APPEND_TO_FEED = 'APPEND_TO_FEED';

export const refreshFeed = (createdAt) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}feed?date=${createdAt}`)
      .then((res) => {
        dispatch({
          type: APPEND_TO_FEED,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_FEED_ERROR,
          payload: err.response?.data?.message || 'Failed to refresh feed',
        });
      });
  });
};

export const [GET_POST_START, GET_POST_SUCCESS, GET_POST_ERROR] = [
  'GET_POST_START',
  'GET_POST_SUCCESS',
  'GET_POST_ERROR',
];
export const getCampaignPost = (id) => (dispatch) => {
  dispatch({ type: GET_POST_START });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}posts/${id}`)
      .then((res) => {
        dispatch({ type: GET_REPORTS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_REPORTS_ERROR, payload: err.response });
      });
  });
};

export const SET_CAMPAIGN = 'SET_CAMPAIGN';

export const setCampaign = (campaign) => {
  return {
    type: SET_CAMPAIGN,
    payload: campaign,
  };
};

export const [
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_PROGRESS,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS,
  POST_CAMPAIGN_CANCEL,
] = [
  'POST_CAMPAIGN_START',
  'POST_CAMPAIGN_PROGRESS',
  'POST_CAMPAIGN_ERROR',
  'POST_CAMPAIGN_SUCCESS',
  'POST_CAMPAIGN_CANCEL',
];

export const postCampaign = (campaign) => (dispatch) => {
  const id = `${campaign.name}${Math.random() * 1000}`;

  dispatch({
    type: POST_CAMPAIGN_START,
    payload: {
      id,
      campaign,
    },
  });

  const filteredCampaign = filterUrls(['call_to_action'], campaign);

  const uri = filteredCampaign.image;

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append('call_to_action', filteredCampaign.call_to_action);
  formData.append('description', filteredCampaign.description);
  formData.append('name', filteredCampaign.name);
  formData.append('user_id', filteredCampaign.user_id);
  formData.append('urgency', filteredCampaign.urgency);

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(`${seturl}campaigns`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;

          dispatch({
            type: POST_CAMPAIGN_PROGRESS,
            payload: {
              id,
              progress: (loaded / total) * 100,
            },
          });
        },
        cancelToken: new CancelToken((c) => {
          cancellables[id] = c;
        }),
      })
      .then((res) => {
        dispatch({
          type: POST_CAMPAIGN_SUCCESS,
          payload: {
            id,
            campaign: res.data.campaignUpdate,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          dispatch({
            type: POST_CAMPAIGN_CANCEL,
            payload: id,
          });
        } else {
          dispatch({
            type: POST_CAMPAIGN_ERROR,
            payload: {
              error: err,
              id,
            },
          });
        }
      })
      .finally(() => {
        delete cancellables[id];
      });
  });
};

export const [DELETE_POST_START, DELETE_POST_ERROR, DELETE_POST_SUCCESS] = [
  'DELETE_POST_START',
  'DELETE_POST_ERROR',
  'DELETE_POST_SUCCESS',
];

export const deleteCampaignPost = (id) => (dispatch) => {
  dispatch({ type: DELETE_POST_START, payload: id });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .delete(`${seturl}posts/${id}`)
      .then((res) => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: id });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: DELETE_POST_ERROR,
          payload: {
            error: err.message,
            id,
          },
        });
        return { error: err, id };
      });
  });
};

export const [
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN_SUCCESS,
] = ['EDIT_CAMPAIGN_START', 'EDIT_CAMPAIGN_ERROR', 'EDIT_CAMPAIGN_SUCCESS'];

export const editCampaignPost = (id, changes) => (dispatch) => {
  dispatch({ type: EDIT_CAMPAIGN_START });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .put(`${seturl}posts/${id}`, changes, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        dispatch({
          type: EDIT_CAMPAIGN_SUCCESS,
          payload: res.data.campaignUpdate,
        });
      })
      .catch((err) => {
        dispatch({ type: EDIT_CAMPAIGN_ERROR, payload: err });
      });
  });
};

export const [
  POST_CAMPAIGN_UPDATE_START,
  POST_CAMPAIGN_UPDATE_PROGRESS,
  POST_CAMPAIGN_UPDATE_ERROR,
  POST_CAMPAIGN_UPDATE_SUCCESS,
  POST_CAMPAIGN_UPDATE_CANCEL,
] = [
  'POST_CAMPAIGN_UPDATE_START',
  'POST_CAMPAIGN_UPDATE_PROGRESS',
  'POST_CAMPAIGN_UPDATE_ERROR',
  'POST_CAMPAIGN_UPDATE_SUCCESS',
  'POST_CAMPAIGN_UPDATE_CANCEL',
];

export const postCampaignUpdate = (campaignUpdate) => (dispatch) => {
  const id = `${campaignUpdate.description}${Math.random() * 1000}`;

  dispatch({
    type: POST_CAMPAIGN_UPDATE_START,
    payload: {
      id,
      campaignUpdate,
    },
  });

  const uri = campaignUpdate.image;

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  formData.append('description', campaignUpdate.description);
  formData.append('user_id', campaignUpdate.user_id);

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(
        `${seturl}campaigns/update/${campaignUpdate.campaign_id}`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            dispatch({
              type: POST_CAMPAIGN_UPDATE_PROGRESS,
              payload: {
                id,
                progress: (loaded / total) * 100,
              },
            });
          },
          cancelToken: new CancelToken((c) => {
            cancellables[id] = c;
          }),
        }
      )
      .then((res) => {
        dispatch({
          type: POST_CAMPAIGN_UPDATE_SUCCESS,
          payload: {
            id,
            campaignUpdate: res.data.campaignUpdate,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          dispatch({
            type: POST_CAMPAIGN_UPDATE_CANCEL,
            payload: id,
          });
        } else {
          dispatch({
            type: POST_CAMPAIGN_UPDATE_ERROR,
            payload: {
              error: err,
              id,
            },
          });
          return err;
        }
      })
      .finally(() => {
        delete cancellables[id];
      });
  });
};

export const TOGGLE_CAMPAIGN_TEXT = 'TOGGLE_CAMPAIGN_TEXT';

export const toggleCampaignText = (id) => ({
  type: TOGGLE_CAMPAIGN_TEXT,
  payload: id,
});

export const [GET_COMMENTS_START, GET_COMMENTS_SUCCESS, GET_COMMENTS_ERROR] = [
  'GET_COMMENTS_START',
  'GET_COMMENTS_SUCCESS',
  'GET_COMMENTS_ERROR',
];

export const getCampaignComments = (id) => (dispatch) => {
  dispatch({ type: GET_COMMENTS_START });
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}comments/${id}`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: GET_COMMENTS_ERROR, payload: err.response });
      });
  });
};

export const [
  POST_COMMENT_START,
  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  REFETCH_ALL_COMMENTS,
] = ['POST_COMMENT_START', 'POST_COMMENT_ERROR', 'POST_COMMENT_SUCCESS'];

export const commentOnCampaign = (id, body) => (dispatch) => {
  dispatch({ type: POST_COMMENT_START });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(`${seturl}comments/${id}`, {
        body: body,
      })
      .then((res) => {
        console.log('res', res);
        dispatch({ type: POST_COMMENT_SUCCESS, payload: res.data.data });
        return aaxios.get(`${seturl}comments/${id}`);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: POST_COMMENT_ERROR, payload: err });
      });
  });
};

export const [
  DELETE_COMMENT_START,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
] = ['DELETE_COMMENT_START', 'DELETE_COMMENT_ERROR', 'DELETE_COMMENT_SUCCESS'];

export const deleteComment = (id) => (dispatch) => {
  dispatch({ type: DELETE_COMMENT_START });

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .delete(`${seturl}comments/com/${id}`)
      .then((res) => {
        dispatch({ type: DELETE_COMMENT_SUCCESS, payload: res.data.data });
      })
      .catch((err) => {
        dispatch({ type: DELETE_COMMENT_ERROR, payload: err });
        return err;
      });
  });
};

export const [
  GET_ORGANIZATIONS_STARTED,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATIONS_ERROR,
] = [
  'GET_ORGANIZATIONS_STARTED',
  'GET_ORGANIZATIONS_SUCCESS',
  'GET_ORGANIZATIONS_ERROR',
];

export const getOrganizations = () => (dispatch) => {
  dispatch({ type: GET_ORGANIZATIONS_STARTED });
  let url = `${seturl}maps`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(url)
      .then((response) => {
        dispatch({ type: GET_ORGANIZATIONS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: GET_ORGANIZATIONS_ERROR, payload: error.message });
      });
  });
};

export const [SET_MAP_SEARCH_QUERY] = ['SET_MAP_SEARCH_QUERY'];

export const setMapSearchQuery = (query, field) => (dispatch) => {
  dispatch({ type: SET_MAP_SEARCH_QUERY, payload: { query, field } });
};

export const [GET_REPORTS_START, GET_REPORTS_SUCCESS, GET_REPORTS_ERROR] = [
  'GET_REPORTS_START',
  'GET_REPORTS_SUCCESS',
  'GET_REPORTS_ERROR',
];

export const [
  ARCHIVE_REPORT_START,
  ARCHIVE_REPORT_SUCCESS,
  ARCHIVE_REPORT_ERROR,
] = ['ARCHIVE_REPORT_START', 'ARCHIVE_REPORT_SUCCESS', 'ARCHIVE_REPORT_ERROR'];

export const archiveReport = (id) => (dispatch) => {
  dispatch({ type: ARCHIVE_REPORT_START });
  let url = `${seturl}reports/archive/${id}`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(url)
      .then((res) => {
        dispatch({ type: ARCHIVE_REPORT_SUCCESS });
      })
      .catch((err) => {
        const error = err.error || err.message;
        console.log(error);
        dispatch({ type: ARCHIVE_REPORT_SUCCESS, payload: error });
      });
  });
};

export const getReports = (page = 0, type = 'all', archive = false) => (
  dispatch
) => {
  dispatch({ type: GET_REPORTS_START });
  let url = `${seturl}reports?page=${page}&type=${type}&archive=${archive}`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(url)
      .then((res) => {
        dispatch({ type: GET_REPORTS_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_REPORTS_ERROR, payload: err.message });
      });
  });
};

export const [GET_REPORT_START, GET_REPORT_SUCCESS, GET_REPORT_ERROR] = [
  'GET_REPORT_START',
  'GET_REPORT_SUCCESS',
  'GET_REPORT_ERROR',
];

export const CLEAR_REPORT_ERROR = 'CLEAR_REPORT_ERROR';

export const clearReportError = () => {
  return { type: CLEAR_REPORT_ERROR };
};

export const getReport = (id) => (dispatch) => {
  dispatch({ type: GET_REPORT_START });
  let url = `${seturl}reports/${id}`;

  console.log(`getting report ${id}`);

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(url)
      .then((res) => {
        dispatch({ type: GET_REPORT_SUCCESS, payload: res?.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_REPORT_ERROR, payload: err.message });
      });
  });
};

export const deactivateUser = (id) => (dispatch) => {
  let url = `${seturl}users/deactivate/${id}`;

  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(url, {})
      .then((res) => {
        console.log('Deactivated successfully');
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  });
};

export const createReport = (postType, postId, desc) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    let url = `${seturl}reports`;
    return aaxios
      .post(url, { postType, postId, desc })
      .then((res) => {
        console.log('Report Successful');
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  });
};

export const getConnections = (id) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}users/connect/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.message;
      });
  });
};

export const connectRequest = (connected_id) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    let url = `${seturl}users/connect/${connected_id}`;
    return aaxios.post(url).catch((err) => {
      return err.message;
    });
  });
};
export const editConnectStatus = (id, status) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios.put(`${seturl}users/connect/${id}`, status).catch((err) => {
      return err.message;
    });
  });
};

export const deleteConnection = (id) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios.delete(`${seturl}users/connect/${id}`).catch((err) => {
      console.log(err);
      return err.message;
    });
  });
};

export const [
  ADD_BOOKMARK_LOADING,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_ERROR,
  REMOVE_BOOKMARK_LOADING,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_ERROR,
  FETCH_BOOKMARKS_LOADING,
  FETCH_BOOKMARKS_SUCCESS,
  FETCH_BOOKMARKS_ERROR,
] = [
  'ADD_BOOKMARK_LOADING',
  'ADD_BOOKMARK_SUCCESS',
  'ADD_BOOKMARK_ERROR',
  'REMOVE_BOOKMARK_LOADING',
  'REMOVE_BOOKMARK_SUCCESS',
  'REMOVE_BOOKMARK_ERROR',
  'FETCH_BOOKMARKS_LOADING',
  'FETCH_BOOKMARKS_SUCCESS',
  'FETCH_BOOKMARKS_ERROR',
];

export const addBookmark = (campaign) => (dispatch) => {
  dispatch({ type: ADD_BOOKMARK_LOADING });
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .post(`${seturl}social/bookmark/${campaign.campaign_id}`)
      .then((res) => {
        dispatch({ type: ADD_BOOKMARK_SUCCESS, payload: campaign });
      })
      .catch((err) => {
        dispatch({
          type: ADD_BOOKMARK_ERROR,
          payload: 'Failed to save bookmark',
        });
        console.error(err);
      });
  });
};

export const removeBookmark = (campaign_id) => (dispatch) => {
  dispatch({ type: REMOVE_BOOKMARK_LOADING });
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .delete(`${seturl}social/bookmark/${campaign_id}`)
      .then(() => {
        dispatch({ type: REMOVE_BOOKMARK_SUCCESS, payload: campaign_id });
      })
      .catch((err) => {
        dispatch({
          type: REMOVE_BOOKMARK_ERROR,
          payload: 'Failed to save bookmark',
        });
        console.error(err);
      });
  });
};

export const fetchBookmarks = () => (dispatch) => {
  dispatch({ type: FETCH_BOOKMARKS_LOADING });
  console.log('getting bookmarks');
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}social/bookmark/`)
      .then((res) => {
        dispatch({
          type: FETCH_BOOKMARKS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log('failed', err);
        dispatch({
          type: FETCH_BOOKMARKS_ERROR,
          payload: 'Failed to save bookmark',
        });
      });
  });
};

// Get emoji reactions for a specific post
export const getCampaignPostReactions = (postId) => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .get(`${seturl}campaigns/${postId}/reactions`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      });
  });
};

// Post emoji reaction on a specific post
export const setCampaignPostReaction = (postId, emoji = '') => (dispatch) => {
  return axiosWithAuth(dispatch, (aaxios) => {
    return aaxios
      .put(`${seturl}campaigns/${postId}/reactions`, { emoji })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error(err.message);
      });
  });
};

export const [QUEUE_NEW_POSTS, DEQUEUE_NEW_POSTS] = [
  'QUEUE_NEW_POSTS',
  'DEQUEUE_NEW_POSTS',
];

export const queueNewPosts = (data) => (dispatch) => {
  dispatch({
    type: QUEUE_NEW_POSTS,
    payload: data,
  });
};

export const dequeueNewPosts = () => (dispatch) => {
  dispatch({
    type: DEQUEUE_NEW_POSTS,
  });
};

export const REMOVE_FROM_UPLOAD_QUEUE = 'REMOVE_FROM_UPLOAD_QUEUE';

export const cancelUploadPost = (queueId) => (dispatch) => {
  if (cancellables[queueId]) {
    cancellables[queueId]();
    delete cancellables[queueId];
  } else {
    dispatch({
      type: REMOVE_FROM_UPLOAD_QUEUE,
      payload: queueId,
    });
  }
};

export const RETRY_UPLOAD_POST = 'RETRY_UPLOAD_POST';

export const retryUploadPost = (queueId, data) => (dispatch) => {
  // If a post in the upload queue fails to upload, this is the
  // action dispatched to retry
  dispatch({
    type: RETRY_UPLOAD_POST,
    id: queueId,
  });

  if (data.is_update) {
    dispatch(postCampaignUpdate(data));
  } else {
    dispatch(postCampaign(data));
  }
};

// TODO: Add getting emoji reaction details (User names and avatars for each emoji)
