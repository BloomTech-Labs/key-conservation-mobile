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
  error
});
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
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

export const getProfileData = id => async dispatch => {
  dispatch({ type: GET_PROFILE_START });
  let user;
  await axios
    .get(`https://key-conservation-staging.herokuapp.com/api/users/${id}`)
    .then(res => {
      user = res.data.user;
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE_ERROR, payload: err });
    });
  axios
    .get(
      `https://key-conservation-staging.herokuapp.com/api/campaigns/camp/${id}`
    )
    .then(res => {
      user.campaigns = res.data.camp;
      dispatch({ type: GET_PROFILE_SUCCESS, payload: user });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE_ERROR, payload: err });
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
