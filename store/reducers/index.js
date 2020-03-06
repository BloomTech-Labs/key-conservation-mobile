import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import escapeRegExp from 'escape-string-regexp';

function filterSearch(query, key, arr) {
  if (query === '') return arr;
  const match = new RegExp(query, 'i');
  return arr.filter(obj => match.test(obj[key.toLowerCase()]));
}

import * as actions from '../actions';

const initialState = {
  error: '',
  pending: {
    updateProfile: false,
    deleteCampaignUpdate: [],
    deleteCampaign: []
  },
  currentUser: {
    sub: '',
    role: '',
    email: '',
    name: '',
    token: ''
  },
  currentUserProfile: {
    campaigns: [],
    connections: []
  },
  selectedProfile: {
    campaigns: [],
    connections: []
  },
  selectedCampaign: {},
  allCampaigns: [],
  firstLogin: false,
  campaignsToggled: [],
  token: '',
  profileReset: false,
  userRegistered: true,
  organizations: [], // All Organizations
  organizationWithCoords: [], // Organizations with coordinates that can be displayed on map,
  filteredOrganization: [], // Filtered Organizations
  reports: {
    currentReport: null,
    data: null,
    loading: false,
    error: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return {
        ...state,
        pending: { ...state.pending, login: true },
        error: ''
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: action.payload
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: ''
      };
    //Amplitude.logEventWithProperties('logged in', currentUser);

    case actions.LOGOUT:
      return {
        ...initialState,
        error: action.payload
      };
    case actions.AFTER_FIRST_LOGIN:
      return {
        ...state,
        firstLogin: false
      };
    case actions.GET_AUTH_START:
      return {
        ...state
      };
    case actions.GET_AUTH_USER:
      return {
        ...state,
        userRegistered: true
      };
    case actions.GET_AUTH_REGISTER:
      return {
        ...state,
        userRegistered: false
      };
    case actions.GET_AUTH_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getAuth: false },
        error: action.payload
      };
    case actions.GET_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, getProfile: true },
        error: '',
        profileReset: false
      };
    case actions.GET_PROFILE_SUCCESS:
      let { user } = action.payload;
      // console.log("GOT PROFILE")
      if (user.campaigns) {
        user.campaigns.sort(function(a, b) {
          return moment(b.created_at) - moment(a.created_at);
        });
      }
      if (action.payload.myProfile) {
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          currentUserProfile: user,
          profileReset: false
        };
      } else {
        return {
          ...state,
          pending: { ...state.pending, getProfile: false },
          selectedProfile: user,
          profileReset: false
        };
      }
    case actions.GET_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getProfile: false },
        error: action.payload,
        profileReset: true
      };
    case actions.EDIT_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: true },
        error: ''
      };
    case actions.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        currentUserProfile: action.payload
      };
    case actions.EDIT_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        error: action.payload
      };
    case actions.POST_USER_START:
      return {
        ...state,
        pending: { ...state.pending, postUser: true },
        error: ''
      };
    case actions.POST_USER_SUCCESS:
      SecureStore.setItemAsync('id', `${action.payload.id}`);
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        currentUserProfile: action.payload,
        firstLogin: true,
        error: ''
      };
    case actions.POST_USER_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        error: action.payload
      };
    case actions.GET_CAMPAIGNS_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: true },
        error: ''
      };
    case actions.GET_CAMPAIGNS_SUCCESS:
      const campaigns = action.payload;
      campaigns.sort(function(a, b) {
        return moment(b.created_at) - moment(a.created_at);
      });
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        allCampaigns: campaigns
      };
    case actions.GET_CAMPAIGNS_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaigns: false },
        error: action.payload
      };
    case actions.GET_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: true },
        error: ''
      };
    case actions.GET_CAMPAIGN_SUCCESS:
      const campaign = action.payload;
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        selectedCampaign: campaign
      };
    case actions.GET_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        error: action.payload
      };
    case actions.SET_CAMPAIGN:
      return {
        ...state,
        selectedCampaign: action.payload
      };
    case actions.DELETE_CAMPAIGN_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaign: [...state.pending.deleteCampaign, action.payload]
        },
        error: ''
      };
    case actions.DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaign: state.pending.deleteCampaign.filter(
            id => id !== action.payload
          )
        },
        allCampaigns: state.allCampaigns?.filter?.(
          camp => camp.camp_id !== Number(action.payload)
        ),
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: state.currentUserProfile.campaigns?.filter?.(
            camp => camp.camp_id !== action.payload
          )
        }
      };
    case actions.DELETE_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaign: state.pending.deleteCampaign.filter(
            id => id !== action.payload.id
          )
        },
        error: action.payload.error
      };
    case actions.POST_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: true },
        error: ''
      };
    case actions.POST_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        allCampaigns: [action.payload, ...(state.allCampaigns || [])],
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: [
            ...(state.currentUserProfile?.campaigns || []),
            action.payload
          ]
        }
      };
    case actions.POST_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        error: action.payload
      };
    case actions.EDIT_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: true },
        error: ''
      };
    case actions.EDIT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        selectedCampaign: action.payload
      };
    case actions.EDIT_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        error: action.payload
      };
    case actions.POST_CAMPAIGN_UPDATE_START:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: true },
        error: ''
      };
    case actions.POST_CAMPAIGN_UPDATE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: false },
        allCampaigns: [action.payload, ...(state.allCampaigns || [])],
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: [
            ...(state.currentUserProfile?.campaigns || []),
            action.payload
          ]
        }
      };
    case actions.POST_CAMPAIGN_UPDATE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: false },
        error: action.payload
      };
    case actions.EDIT_CAMPAIGN_UPDATE_START:
      return {
        ...state,
        pending: { ...state.pending, editCampaignUpdate: true },
        error: ''
      };
    case actions.EDIT_CAMPAIGN_UPDATE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, editCampaignUpdate: false },
        selectedCampaign: action.payload
      };
    case actions.EDIT_CAMPAIGN_UPDATE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, editCampaignUpdate: false },
        error: action.payload
      };
    case actions.DELETE_CAMPAIGN_UPDATE_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaignUpdate: [
            ...state.pending.deleteCampaignUpdate,
            action.payload
          ]
        },
        error: ''
      };
    case actions.DELETE_CAMPAIGN_UPDATE_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaignUpdate: state.pending.deleteCampaignUpdate.filter(
            id => id !== Number(action.payload)
          )
        },
        allCampaigns: state.allCampaigns?.filter?.(
          update => update.update_id !== Number(action.payload)
        ),
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: state.currentUserProfile.campaigns?.filter?.(
            update => update.update_id !== Number(action.payload)
          )
        }
      };
    case actions.DELETE_CAMPAIGN_UPDATE_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          deleteCampaignUpdate: state.pending.deleteCampaignUpdate.filter(
            id => id !== Number(action.payload.id)
          )
        },
        error: action.payload.error
      };
    case actions.TOGGLE_CAMPAIGN_TEXT:
      return {
        ...state,
        campaignsToggled: [...state.campaignsToggled, action.payload]
      };
    case actions.POST_COMMENT_START:
      return {
        ...state,
        error: ''
      };
    case actions.POST_COMMENT_SUCCESS:
      return {
        ...state,
        selectedCampaign: {
          ...state.selectedCampaign,
          comments: action.payload
        }
      };
    case actions.POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actions.DELETE_COMMENT_START:
      return {
        ...state,
        error: ''
      };
    case actions.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        selectedCampaign: {
          ...state.selectedCampaign,
          comments: state.selectedCampaign?.comments.filter(
            c => c.comment_id != action.payload
          )
        }
      };
    case actions.DELETE_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actions.GET_ORGANIZATIONS_STARTED:
      return {
        ...state,
        error: ''
      };
    case actions.GET_ORGANIZATIONS_SUCCESS:
      const organizationWithCoords = action.payload.filter(
        coords => coords.latitude && coords.longitude !== null
      );

      return {
        ...state,
        organizations: action.payload,
        organizationWithCoords: organizationWithCoords,
        filteredOrganization: organizationWithCoords,
        error: ''
      };
    case actions.GET_ORGANIZATIONS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actions.SET_MAP_SEARCH_QUERY:
      const query = action.payload['query'];
      const key = action.payload['field'];
      return {
        ...state,
        filteredOrganization: filterSearch(
          query,
          key,
          state.organizationWithCoords
        )
      };
    case actions.GET_REPORTS_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: ''
        }
      };
    case actions.GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: action.payload,
          loading: false
        }
      };
    case actions.GET_REPORTS_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload
        }
      };
    case actions.GET_REPORT_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: ''
        }
      };
    case actions.GET_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          currentReport: action.payload
        }
      };
    case actions.GET_REPORT_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload
        }
      };
    case actions.ARCHIVE_REPORT_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: ''
        }
      };
    case actions.ARCHIVE_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false
        }
      };
    case actions.ARCHIVE_REPORT_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
