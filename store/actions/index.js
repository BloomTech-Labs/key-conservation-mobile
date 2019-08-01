import axios from 'axios';

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

export const [LOGOUT_START, LOGOUT_SUCCESS] = [
  'LOGOUT_START',
  'LOGOUT_SUCCESS'
];

export const logoutStart = () => ({
  type: LOGOUT_START
});
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const [GET_PROFILE_START, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS] = [
  'GET_PROFILE_START',
  'GET_PROFILE_ERROR',
  'GET_PROFILE_SUCCESS'
];

export const getProfileData = (
  id,
  sub,
  myProfile = false
) => async dispatch => {
  dispatch({ type: GET_PROFILE_START });
  let user, url;
  if (id)
    url = `https://key-conservation-staging.herokuapp.com/api/users/${id}`;
  else if (sub)
    url = `https://key-conservation-staging.herokuapp.com/api/users/sub/${sub}`;
  return axios
    .get(url)
    .then(res => {
      user = res.data.user;
      dispatch({ type: GET_PROFILE_SUCCESS, payload: { user, myProfile } });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE_ERROR, payload: err });
    });
};

export const [POST_USER_START, POST_USER_ERROR, POST_USER_SUCCESS] = [
  'POST_CAMPAIGNS_START',
  'POST_CAMPAIGNS_ERROR',
  'POST_CAMPAIGNS_SUCCESS'
];

export const postUser = user => dispatch => {
  dispatch({ type: POST_USER_START });
  axios
    .post('https://key-conservation-staging.herokuapp.com/api/users', user)
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
    .get('https://key-conservation-staging.herokuapp.com/api/campaigns')
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
  dispatch({ type: POST_CAMPAIGN_START });
  axios
    .post('https://key-conservation-staging.herokuapp.com/api/campaigns', camp)
    .then(res => {
      dispatch({ type: POST_CAMPAIGN_SUCCESS, payload: res.data.newCamps });
    })
    .catch(err => {
      dispatch({ type: POST_CAMPAIGN_ERROR, payload: err });
    });
};
