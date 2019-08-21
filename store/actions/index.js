import axios from 'axios';

const filterUrls = (keys, object) => {
  // If a user doesn't include http or https in there URL this function will add it.
  // If they already include it it will be ignored. and if its capital "Https || Http" it will become lowercase.
  keys.forEach(key => {
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
  if (id) url = `https://key-conservation-staging.herokuapp.com/api/users/${id}`;
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

  const filteredChanges = filterUrls(
    ['facebook', 'twitter', 'instagram', 'org_link_url', 'org_cta'],
    changes
  );

  let formData = new FormData();

  let keys = Object.keys(filteredChanges).filter(key => {
    return key !== 'profile_image';
  });

  if (filteredChanges.profile_image) {
    const uri = filteredChanges.profile_image;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
  }

  keys.forEach(key => {
    if (filteredChanges[key] !== null) {
      formData.append(key, filteredChanges[key]);
    }
  });

  return axios
    .put(`https://key-conservation.herokuapp.com/api/users/${id}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
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

export const [GET_CAMPAIGN_START, GET_CAMPAIGN_ERROR, GET_CAMPAIGN_SUCCESS] = [
  'GET_CAMPAIGN_START',
  'GET_CAMPAIGN_ERROR',
  'GET_CAMPAIGN_SUCCESS'
];

export const getCampaign = id => dispatch => {
  dispatch({ type: GET_CAMPAIGN_START });
  axios
    .get(`https://key-conservation.herokuapp.com/api/campaigns/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_CAMPAIGN_SUCCESS, payload: res.data.camp });
    })
    .catch(err => {
      dispatch({ type: GET_CAMPAIGN_ERROR, payload: err });
    });
};

export const SET_CAMPAIGN = 'SET_CAMPAIGN';

export const setCampaign = camp => {
  return {
    type: SET_CAMPAIGN,
    payload: camp
  };
};

export const [
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS
] = ['POST_CAMPAIGNS_START', 'POST_CAMPAIGNS_ERROR', 'POST_CAMPAIGNS_SUCCESS'];

export const postCampaign = camp => dispatch => {
  console.log('posting campign************************');
  dispatch({ type: POST_CAMPAIGN_START });

  const filteredCamp = filterUrls(['camp_cta'], camp);

  const uri = filteredCamp.camp_img;

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });
  formData.append('camp_cta', filteredCamp.camp_cta);
  formData.append('camp_desc', filteredCamp.camp_desc);
  formData.append('camp_name', filteredCamp.camp_name);
  formData.append('users_id', filteredCamp.users_id);

  axios
    .post('https://key-conservation.herokuapp.com/api/campaigns', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
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

export const [
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN_SUCCESS
] = ['EDIT_CAMPAIGN_START', 'EDIT_CAMPAIGN_ERROR', 'EDIT_CAMPAIGN_SUCCESS'];

export const editCampaign = (id, changes) => dispatch => {
  dispatch({ type: EDIT_CAMPAIGN_START });

  let formData = new FormData();

  let keys = Object.keys(changes).filter(key => {
    return key !== 'camp_img';
  });

  if (changes.camp_img) {
    const uri = changes.camp_img;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
  }

  keys.forEach(key => {
    formData.append(key, changes[key]);
  });

  console.log('FORMDATA', formData);

  axios
    .put(
      `https://key-conservation.herokuapp.com/api/campaigns/${id}`,
      formData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then(res => {
      console.log('RES', res.data.editCamp);
      dispatch({ type: EDIT_CAMPAIGN_SUCCESS, payload: res.data.editCamp });
    })
    .catch(err => {
      console.log('ERR', err);
      dispatch({ type: EDIT_CAMPAIGN_ERROR, payload: err });
    });
};

export const TOGGLE_CAMPAIGN_TEXT = 'TOGGLE_CAMPAIGN_TEXT';

export const toggleCampaignText = id => ({
  type: TOGGLE_CAMPAIGN_TEXT,
  payload: id
});

export const MEDIA_UPLOAD = 'MEDIA_UPLOAD';

export const setMedia = media => {
  return {
    type: MEDIA_UPLOAD,
    payload: media
  };
};

export const MEDIA_CLEAR = 'MEDIA_CLEAR';

export const clearMedia = () => {
  return {
    type: MEDIA_CLEAR
  };
};
