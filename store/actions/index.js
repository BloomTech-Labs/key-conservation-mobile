import axios from 'axios';

import * as Amplitude from 'expo-analytics-amplitude';

export const [LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS] = [
  'LOGIN_START',
  'LOGIN_ERROR',
  'LOGIN_SUCCESS'
];

export const loginStart = () => ({
  type: LOGIN_START
});
export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
});
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const LOGOUT = 'LOGOUT';

export const logout = () => ({
  type: LOGOUT
});

export const AFTER_FIRST_LOGIN = 'AFTER_FIRST_LOGIN';

export const afterFirstLogin = () => ({
  type: AFTER_FIRST_LOGIN
});

export const [GET_PROFILE_START, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS] = [
  'GET_PROFILE_START',
  'GET_PROFILE_ERROR',
  'GET_PROFILE_SUCCESS'
];

export const getProfileData = (
  id,
  sub,
  myProfile = false,
  noDispatch = false
) => async dispatch => {
  {
    !noDispatch && dispatch({ type: GET_PROFILE_START });
  }
  let user, url;
  if (id) url = `https://key-conservation.herokuapp.com/api/users/${id}`;
  else if (sub)
    url = `https://key-conservation.herokuapp.com/api/users/sub/${sub}`;
  return axios
    .get(url)
    .then(res => {
      user = res.data.user;
      if (noDispatch) {
        return user;
      }
      {
        !noDispatch &&
          dispatch({ type: GET_PROFILE_SUCCESS, payload: { user, myProfile } });
      }
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE_ERROR, payload: err });
    });
};

export const [EDIT_PROFILE_START, EDIT_PROFILE_ERROR, EDIT_PROFILE_SUCCESS] = [
  'EDIT_PROFILE_START',
  'EDIT_PROFILE_ERROR',
  'EDIT_PROFILE_SUCCESS'
];

export const editProfileData = (id, changes) => async dispatch => {
  dispatch({ type: EDIT_PROFILE_START });

  if (
    changes.facebook &&
    changes.facebook !== null &&
    changes.facebook.indexOf('http://') !== 0 &&
    changes.facebook.indexOf('https://') !== 0
  ) {
    changes.facebook = changes.facebook.toLowerCase();
    let facebook = 'https://' + changes.facebook;
    changes.facebook = facebook;
  }
  if (
    changes.twitter &&
    changes.twitter !== null &&
    changes.twitter.indexOf('http://') !== 0 &&
    changes.twitter.indexOf('https://') !== 0
  ) {
    changes.twitter = changes.twitter.toLowerCase();
    let twitter = 'https://' + changes.twitter;
    changes.twitter = twitter;
  }
  if (
    changes.instagram &&
    changes.instagram !== null &&
    changes.instagram.indexOf('http://') !== 0 &&
    changes.instagram.indexOf('https://') !== 0
  ) {
    changes.instagram = changes.instagram.toLowerCase();
    let instagram = 'https://' + changes.instagram;
    changes.instagram = instagram;
  }
  if (
    changes.org_link_url &&
    changes.org_link_url !== null &&
    changes.org_link_url.indexOf('http://') !== 0 &&
    changes.org_link_url.indexOf('https://') !== 0
  ) {
    changes.org_link_url = changes.org_link_url.toLowerCase();
    let org_link_url = 'https://' + changes.org_link_url;
    changes.org_link_url = org_link_url;
  }
  if (
    changes.org_cta &&
    changes.org_cta !== null &&
    changes.org_cta.indexOf('http://') !== 0 &&
    changes.org_cta.indexOf('https://') !== 0
  ) {
    changes.org_cta = changes.org_cta.toLowerCase();
    let orgDonate = 'https://' + changes.org_cta;
    changes.org_cta = orgDonate;
  }

  return axios
    .put(`https://key-conservation.herokuapp.com/api/users/${id}`, changes)
    .then(res => {
      dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.editUser });
    })
    .catch(err => {
      dispatch({ type: EDIT_PROFILE_ERROR, payload: err });
    });
};

export const [POST_USER_START, POST_USER_ERROR, POST_USER_SUCCESS] = [
  'POST_USER_START',
  'POST_USER_ERROR',
  'POST_USER_SUCCESS'
];

export const postUser = user => dispatch => {
  dispatch({ type: POST_USER_START });
  axios
    .post('https://key-conservation.herokuapp.com/api/users', user)
    .then(res => {
      dispatch({ type: POST_USER_SUCCESS, payload: res.data.newUser });
    })
    .catch(err => {
      dispatch({ type: POST_USER_ERROR, payload: err });
    });
};

export const [
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_ERROR,
  GET_CAMPAIGNS_SUCCESS
] = ['GET_CAMPAIGNS_START', 'GET_CAMPAIGNS_ERROR', 'GET_CAMPAIGNS_SUCCESS'];

export const getCampaigns = () => dispatch => {
  dispatch({ type: GET_CAMPAIGNS_START });
  axios
    .get('https://key-conservation.herokuapp.com/api/campaigns')
    .then(res => {
      dispatch({ type: GET_CAMPAIGNS_SUCCESS, payload: res.data.camp });
    })
    .catch(err => {
      dispatch({ type: GET_CAMPAIGNS_ERROR, payload: err });
    });
};

export const [
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS
] = ['POST_CAMPAIGNS_START', 'POST_CAMPAIGNS_ERROR', 'POST_CAMPAIGNS_SUCCESS'];

export const postCampaign = camp => dispatch => {
  console.log('posting campign************************');
  dispatch({ type: POST_CAMPAIGN_START });
  // If a user doesn't include http or https in there URL this function will add it.
  // If they already include it it will be ignored. and if its capital "Https || Http" it will become lowercase.
  if (
    camp.camp_cta &&
    camp.camp_cta !== null &&
    camp.camp_cta.indexOf('http://') !== 0 &&
    camp.camp_cta.indexOf('https://') !== 0
  ) {
    camp.camp_cta = camp.camp_cta.toLowerCase();
    let donate = 'https://' + camp.camp_cta;
    camp.camp_cta = donate;
  }
  axios
    .post('https://key-conservation.herokuapp.com/api/campaigns', camp)
    .then(res => {
      dispatch({ type: POST_CAMPAIGN_SUCCESS, payload: res.data.newCamps });
    })
    .catch(err => {
      dispatch({ type: POST_CAMPAIGN_ERROR, payload: err });
    });
};

export const [
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_SUCCESS
] = [
  'DELETE_CAMPAIGNS_START',
  'DELETE_CAMPAIGNS_ERROR',
  'DELETE_CAMPAIGNS_SUCCESS'
];

export const deleteCampaign = id => dispatch => {
  dispatch({ type: DELETE_CAMPAIGN_START });
  axios
    .delete(`https://key-conservation.herokuapp.com/api/campaigns/${id}`)
    .then(res => {
      dispatch({ type: DELETE_CAMPAIGN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DELETE_CAMPAIGN_ERROR, payload: err });
    });
};
