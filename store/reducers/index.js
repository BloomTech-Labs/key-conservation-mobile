import * as SecureStore from "expo-secure-store";

import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  EDIT_PROFILE_START,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  POST_USER_START,
  POST_USER_ERROR,
  POST_USER_SUCCESS,
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_ERROR,
  GET_CAMPAIGNS_SUCCESS,
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS
} from "../actions";

const initialState = {
  error: '',
  pending: {
    updateProfile: false
  },
  currentUser: {
    id: "",
    sub: "",
    role: "",
    email: "",
    username: "",
    token: ""
  },
  currentUserProfile: {
    campaigns: []
  },
  selectedProfile: {
    campaigns: []
  },
  allCampaigns: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        pending: { ...state.pending, login: true },
        error: ""
      };
    case LOGIN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        currentUser: {
          ...state.currentUser,
          sub: action.payload.sub,
          email: action.payload.email,
          token: action.payload.accessToken
        },
        error: ""
      };
    case LOGOUT_START:
      return {
        ...state,
        pending: { ...state.pending, logout: true },
        error: ""
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case GET_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, getProfile: true },
        error: ""
      };
    case GET_PROFILE_SUCCESS:
      if (action.payload.myProfile) {
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          currentUserProfile: action.payload.user
        };
      } else {
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          selectedProfile: action.payload.user
        };
      }
    case GET_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getProfile: false },
        error: action.payload
      };
    case EDIT_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: true },
        error: ''
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        currentUserProfile: action.payload
      };
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        error: action.payload
      };
    case POST_USER_START:
      return {
        ...state,
        pending: { ...state.pending, postUser: true },
        error: ""
      };
    case POST_USER_SUCCESS:
      SecureStore.setItemAsync("userId", `${action.payload.id}`);
      // console.log("************inside reducer*********", action.payload.id);
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        currentUserProfile: action.payload
      };
    case POST_USER_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        error: action.payload
      };
    case GET_CAMPAIGNS_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: true },
        error: ""
      };
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        allCampaigns: action.payload.reverse()
      };
    case GET_CAMPAIGNS_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        error: action.payload
      };
    case POST_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: true },
        error: ""
      };
    case POST_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        currentUserProfile: {
          ...state.currentUserProfile, campaigns: [
            ...state.currentUserProfile.campaigns, action.payload
          ]
        }
      };
    case POST_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
