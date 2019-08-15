import * as SecureStore from "expo-secure-store";

import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  AFTER_FIRST_LOGIN,
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
  GET_CAMPAIGN_START,
  GET_CAMPAIGN_ERROR,
  GET_CAMPAIGN_SUCCESS,
  POST_CAMPAIGN_START,
  POST_CAMPAIGN_ERROR,
  POST_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN_SUCCESS,
  TOGGLE_CAMPAIGN_TEXT
} from "../actions";

const initialState = {
  error: "",
  pending: {
    updateProfile: false
  },
  currentUser: {
    sub: "",
    email: "",
    token: ""
  },
  currentUserProfile: {
    campaigns: []
  },
  selectedProfile: {
    campaigns: []
  },
  selectedCampaign: {},
  allCampaigns: [],
  firstLogin: false,
  campaignsToggled: []
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
    case LOGOUT:
      return initialState;
    case AFTER_FIRST_LOGIN:
      return {
        ...state,
        firstLogin: false
      }
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
        error: ""
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
        currentUserProfile: action.payload,
        firstLogin: true,
        error: ""
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
      const campaigns = action.payload;
      campaigns.sort(function(a, b){return b.camp_id - a.camp_id});
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        allCampaigns: campaigns
      };
    case GET_CAMPAIGNS_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        error: action.payload
      };
    case GET_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: true },
        error: ""
      };
    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        selectedCampaign: action.payload
      };
    case GET_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        error: action.payload
      };
    case DELETE_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, deleteCampaign: true },
        error: ""
      };
    case DELETE_CAMPAIGN_SUCCESS:
      const deleted = Number(action.payload);
      const newCampaigns = state.currentUserProfile.campaigns.filter(camp => {
        return (camp.camp_id !== deleted)
      })
      return {
        ...state,
        pending: { ...state.pending, deleteCampaign: false },
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: newCampaigns
        }
      };
    case DELETE_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, deleteCampaign: false },
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
          ...state.currentUserProfile, 
          campaigns: [
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
    case EDIT_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: true },
        error: ""
      };
    case EDIT_CAMPAIGN_SUCCESS:
      let { camp_id } = action.payload
      const alteredCampaigns = state.currentUserProfile.campaigns.map(camp => {
        if (camp.camp_id === camp_id) {
          return action.payload
        } else {
          return camp
        }
      })
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: alteredCampaigns
        },
        selectedCampaign: action.payload
      };
    case EDIT_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        error: action.payload
      };
    case TOGGLE_CAMPAIGN_TEXT:
      return {
        ...state,
        campaignsToggled: [...state.campaignsToggled, action.payload]
      };
    default:
        return state;
    }
};

export default reducer;
