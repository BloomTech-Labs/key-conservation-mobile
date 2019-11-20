import axios from 'axios'

import * as SecureStore from 'expo-secure-store'

// url for heroku staging vs production server
const seturl = 'https://key-conservation.herokuapp.com/api/'

const filterUrls = (keys, object) => {
  // If a user doesn't include http or https in their URL this function will add it.
  // If they already include it it will be ignored. and if it is capital "Https || Http" it will become lowercase.
  keys.forEach(key => {
    if (
      object[key] &&
      object[key] !== null &&
      object[key].indexOf('http://') !== 0 &&
      object[key].indexOf('https://') !== 0
    ) {
      object[key] = object[key].toLowerCase()
      object[key] = 'https://' + object[key]
    }
  })
  return object
}

export const [LOGIN_START, LOGIN_ERROR, LOGIN_SUCCESS] = [
  'LOGIN_START',
  'LOGIN_ERROR',
  'LOGIN_SUCCESS'
]

export const loginStart = () => ({
  type: LOGIN_START
})
export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error
})
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const LOGOUT = 'LOGOUT'

export const logout = () => ({
  type: LOGOUT
})

export const AFTER_FIRST_LOGIN = 'AFTER_FIRST_LOGIN'

export const afterFirstLogin = () => ({
  type: AFTER_FIRST_LOGIN
})

//// These actions are for the loading page to determine if:
// A) The user is logged in
// B) The account exists and user is not logged in
// C) The user has a sub and needs to register
// D) The user needs to make a sub and to register
export const [
  GET_AUTH_START,
  GET_AUTH_USER,
  GET_AUTH_REGISTER,
  GET_AUTH_ERROR
] = ['GET_AUTH_START', 'GET_AUTH_USER', 'GET_AUTH_REGISTER', 'GET_AUTH_ERROR']

export const getLoadingData = sub => async dispatch => {
  let url = `${seturl}users/subcheck/${sub}`

  let token = await SecureStore.getItemAsync('accessToken')
  return axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      let dbCheck = response.data.check
      if (dbCheck === true) {
        dispatch({ type: GET_AUTH_USER, payload: dbCheck })
      } else {
        dispatch({ type: GET_AUTH_REGISTER, payload: dbCheck })
      }
    })
    .catch(error => {
      dispatch({ type: GET_AUTH_ERROR, payload: error.message })
    })
}

export const [GET_PROFILE_START, GET_PROFILE_ERROR, GET_PROFILE_SUCCESS] = [
  'GET_PROFILE_START',
  'GET_PROFILE_ERROR',
  'GET_PROFILE_SUCCESS'
]

export const getProfileData = (
  id,
  sub,
  myProfile = false,
  noDispatch = false
) => async dispatch => {
  {
    !noDispatch && dispatch({ type: GET_PROFILE_START })
  }

  let user, url
  if (id) url = `${seturl}users/${id}`
  else if (sub) url = `${seturl}users/sub/${sub}`

  let token = await SecureStore.getItemAsync('accessToken')

  return axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      user = res.data.user
      if (noDispatch) {
        return user
      }
      {
        !noDispatch &&
          dispatch({ type: GET_PROFILE_SUCCESS, payload: { user, myProfile } })
      }
    })
    .catch(err => {
      dispatch =>
        Promise.all([
          SecureStore.deleteItemAsync('sub', {}),
          SecureStore.deleteItemAsync('email', {}),
          SecureStore.deleteItemAsync('roles', {}),
          SecureStore.deleteItemAsync('id', {}),
          SecureStore.deleteItemAsync('accessToken', {})
        ])
      dispatch({ type: GET_PROFILE_ERROR, payload: err.message })
    })
}

export const [EDIT_PROFILE_START, EDIT_PROFILE_ERROR, EDIT_PROFILE_SUCCESS] = [
  'EDIT_PROFILE_START',
  'EDIT_PROFILE_ERROR',
  'EDIT_PROFILE_SUCCESS'
]

export const editProfileData = (id, changes) => async dispatch => {
  dispatch({ type: EDIT_PROFILE_START })

  const filteredChanges = filterUrls(
    ['facebook', 'twitter', 'instagram', 'org_link_url', 'org_cta'],
    changes
  )

  let formData = new FormData()

  let keys = Object.keys(filteredChanges).filter(key => {
    return key !== 'profile_image'
  })

  if (filteredChanges.profile_image) {
    const uri = filteredChanges.profile_image

    let uriParts = uri.split('.')
    let fileType = uriParts[uriParts.length - 1]

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })
  }

  keys.forEach(key => {
    if (filteredChanges[key] !== null) {
      formData.append(key, filteredChanges[key])
    }
  })
  let token = await SecureStore.getItemAsync('accessToken')
  return axios
    .put(`${seturl}users/${id}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.editUser });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: EDIT_PROFILE_ERROR, payload: err })
    })
}

export const [POST_USER_START, POST_USER_ERROR, POST_USER_SUCCESS] = [
  'POST_USER_START',
  'POST_USER_ERROR',
  'POST_USER_SUCCESS'
]

export const postUser = user => async dispatch => {
  dispatch({ type: POST_USER_START })
  // console.log('we in postUser')
  let token = await SecureStore.getItemAsync('accessToken')
  // console.log(user, token, 'USER TOKEN in postUSER *****')
  axios
    .post(`${seturl}users`, user, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      dispatch({ type: POST_USER_SUCCESS, payload: res.data.newUser })
    })
    .catch(err => {
      // console.log(err, 'err in postUser')
      dispatch({ type: POST_USER_ERROR, payload: err })
    })
}

export const [
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_ERROR,
  GET_CAMPAIGNS_SUCCESS
] = ['GET_CAMPAIGNS_START', 'GET_CAMPAIGNS_ERROR', 'GET_CAMPAIGNS_SUCCESS']

export const getCampaigns = () => async dispatch => {
  dispatch({ type: GET_CAMPAIGNS_START })
  let campaigns
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .get(`${seturl}campaigns`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      campaigns = res.data.camp
      axios
        .get(`${seturl}updates`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          campaigns = campaigns.concat(res.data.campUpdate)
          dispatch({
            type: GET_CAMPAIGNS_SUCCESS,
            payload: campaigns,
            token: token
          })
        })
        .catch(err => {
          dispatch({ type: GET_CAMPAIGNS_ERROR, payload: err })
        })
    })
    .catch(err => {
      dispatch({ type: GET_CAMPAIGNS_ERROR, payload: err })
    })
}

export const [GET_CAMPAIGN_START, GET_CAMPAIGN_ERROR, GET_CAMPAIGN_SUCCESS] = [
  'GET_CAMPAIGN_START',
  'GET_CAMPAIGN_ERROR',
  'GET_CAMPAIGN_SUCCESS'
]

export const getCampaign = id => async dispatch => {
  dispatch({ type: GET_CAMPAIGN_START })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .get(`${seturl}campaigns/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      // console.log(res.data);
      dispatch({ type: GET_CAMPAIGN_SUCCESS, payload: res.data.camp })
    })
    .catch(err => {
      dispatch({ type: GET_CAMPAIGN_ERROR, payload: err })
    })
}

export const SET_CAMPAIGN = 'SET_CAMPAIGN'

export const setCampaign = camp => {
  return {
    type: SET_CAMPAIGN,
    payload: camp
  }
}

export const [
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS
] = ['POST_CAMPAIGN_START', 'POST_CAMPAIGN_ERROR', 'POST_CAMPAIGN_SUCCESS']

export const postCampaign = camp => async dispatch => {
  dispatch({ type: POST_CAMPAIGN_START })

  const filteredCamp = filterUrls(['camp_cta'], camp)

  const uri = filteredCamp.camp_img

  let uriParts = uri.split('.')
  let fileType = uriParts[uriParts.length - 1]

  let formData = new FormData()
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  })
  formData.append('camp_cta', filteredCamp.camp_cta)
  formData.append('camp_desc', filteredCamp.camp_desc)
  formData.append('camp_name', filteredCamp.camp_name)
  formData.append('users_id', filteredCamp.users_id)
  formData.append('urgency', filteredCamp.urgency)

  let token = await SecureStore.getItemAsync('accessToken')

  axios
    .post(`${seturl}campaigns`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch({ type: POST_CAMPAIGN_SUCCESS, payload: res.data.newCamps })
    })
    .catch(err => {
      dispatch({ type: POST_CAMPAIGN_ERROR, payload: err })
    })
}

export const [
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_SUCCESS
] = [
  'DELETE_CAMPAIGN_START',
  'DELETE_CAMPAIGN_ERROR',
  'DELETE_CAMPAIGN_SUCCESS'
]

export const deleteCampaign = id => async dispatch => {
  dispatch({ type: DELETE_CAMPAIGN_START })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .delete(`${seturl}campaigns/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      dispatch({ type: DELETE_CAMPAIGN_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: DELETE_CAMPAIGN_ERROR, payload: err })
    })
}

export const [
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN_SUCCESS
] = ['EDIT_CAMPAIGN_START', 'EDIT_CAMPAIGN_ERROR', 'EDIT_CAMPAIGN_SUCCESS']

export const editCampaign = (id, changes) => async dispatch => {
  dispatch({ type: EDIT_CAMPAIGN_START })

  let formData = new FormData()

  let keys = Object.keys(changes).filter(key => {
    return key !== 'camp_img'
  })

  if (changes.camp_img) {
    const uri = changes.camp_img

    let uriParts = uri.split('.')
    let fileType = uriParts[uriParts.length - 1]

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })
  }

  keys.forEach(key => {
    formData.append(key, changes[key])
  })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .put(`${seturl}campaigns/${id}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: EDIT_CAMPAIGN_SUCCESS, payload: res.data.editCamp })
    })
    .catch(err => {
      dispatch({ type: EDIT_CAMPAIGN_ERROR, payload: err })
    })
}

export const [
  POST_CAMPAIGN_UPDATE_START,
  POST_CAMPAIGN_UPDATE_ERROR,
  POST_CAMPAIGN_UPDATE_SUCCESS
] = [
  'POST_CAMPAIGN_UPDATE_START',
  'POST_CAMPAIGN_UPDATE_ERROR',
  'POST_CAMPAIGN_UPDATE_SUCCESS'
]

export const postCampaignUpdate = campUpdate => async dispatch => {
  dispatch({ type: POST_CAMPAIGN_UPDATE_START })

  const uri = campUpdate.update_img

  let uriParts = uri.split('.')
  let fileType = uriParts[uriParts.length - 1]

  let formData = new FormData()
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  })

  formData.append('update_desc', campUpdate.update_desc)
  formData.append('users_id', campUpdate.users_id)
  formData.append('camp_id', campUpdate.camp_id)

  let token = await SecureStore.getItemAsync('accessToken')

  axios
    .post(`${seturl}updates`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({
        type: POST_CAMPAIGN_UPDATE_SUCCESS,
        payload: res.data.newCampUpdates
      })
    })
    .catch(err => {
      dispatch({ type: POST_CAMPAIGN_UPDATE_ERROR, payload: err })
    })
}

export const [
  EDIT_CAMPAIGN_UPDATE_START,
  EDIT_CAMPAIGN_UPDATE_ERROR,
  EDIT_CAMPAIGN_UPDATE_SUCCESS
] = [
  'EDIT_CAMPAIGN_UPDATE_START',
  'EDIT_CAMPAIGN_UPDATE_ERROR',
  'EDIT_CAMPAIGN_UPDATE_SUCCESS'
]

export const editCampaignUpdate = (id, changes) => async dispatch => {
  dispatch({ type: EDIT_CAMPAIGN_UPDATE_START })

  let formData = new FormData()

  let keys = Object.keys(changes).filter(key => {
    return key !== 'update_img'
  })

  if (changes.update_img) {
    const uri = changes.update_img

    let uriParts = uri.split('.')
    let fileType = uriParts[uriParts.length - 1]

    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })
  }

  keys.forEach(key => {
    formData.append(key, changes[key])
  })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .put(`${seturl}updates/${id}`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch({
        type: EDIT_CAMPAIGN_UPDATE_SUCCESS,
        payload: res.data.editCampUpdate
      })
    })
    .catch(err => {
      dispatch({ type: EDIT_CAMPAIGN_UPDATE_ERROR, payload: err })
    })
}

export const [
  DELETE_CAMPAIGN_UPDATE_START,
  DELETE_CAMPAIGN_UPDATE_ERROR,
  DELETE_CAMPAIGN_UPDATE_SUCCESS
] = [
  'DELETE_CAMPAIGN_UPDATE_START',
  'DELETE_CAMPAIGN_UPDATE_ERROR',
  'DELETE_CAMPAIGN_UPDATE_SUCCESS'
]

export const deleteCampaignUpdate = id => async dispatch => {
  dispatch({ type: DELETE_CAMPAIGN_UPDATE_START })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .delete(`${seturl}updates/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      dispatch({ type: DELETE_CAMPAIGN_UPDATE_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: DELETE_CAMPAIGN_UPDATE_ERROR, payload: err })
    })
}

export const TOGGLE_CAMPAIGN_TEXT = 'TOGGLE_CAMPAIGN_TEXT'

export const toggleCampaignText = id => ({
  type: TOGGLE_CAMPAIGN_TEXT,
  payload: id
})

export const MEDIA_UPLOAD = 'MEDIA_UPLOAD'

export const setMedia = media => {
  return {
    type: MEDIA_UPLOAD,
    payload: media
  }
}

export const MEDIA_CLEAR = 'MEDIA_CLEAR'

export const clearMedia = () => {
  return {
    type: MEDIA_CLEAR
  }
}

export const [
  POST_COMMENT_START,
  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  REFETCH_ALL_COMMENTS
] = ['POST_COMMENT_START', 'POST_COMMENT_ERROR', 'POST_COMMENT_SUCCESS']

export const commentOnCampaign = (id, body) => async dispatch => {
  dispatch({ type: POST_COMMENT_START })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .post(
      `${seturl}comments/${id}`,
      { users_id: body.users_id, comment_body: body.comment_body },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      dispatch({ type: POST_COMMENT_SUCCESS, payload: res.data.data })
      axios.get(`${seturl}comments/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      })
    })
    .catch(err => {
      dispatch({ type: POST_COMMENT_ERROR, payload: err })
    })
}

export const [
  DELETE_COMMENT_START,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS
] = ['DELETE_COMMENT_START', 'DELETE_COMMENT_ERROR', 'DELETE_COMMENT_SUCCESS']

export const deleteComment = id => async dispatch => {
  dispatch({ type: DELETE_COMMENT_START })
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .delete(`${seturl}comments/com/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('My data is UP IN HUR---->', res.data.data)
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: res.data.data })
    })
    .catch(err => {
      dispatch({ type: DELETE_COMMENT_ERROR, payload: err })
    })
}

export const addLike = (id, userId) => async dispatch => {
  let token = await SecureStore.getItemAsync('accessToken')
  axios
    .post(
      `${seturl}social/likes/${id}`,
      { users_id: userId, camp_id: id },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(console.log('word'))
}