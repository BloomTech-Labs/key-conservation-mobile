import {
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  EDIT_PROFILE_START,
  EDIT_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS
} from '../actions';

const initialState = {
  error: '',
  loggingIn: false,
  editingProfile: false,
  loggingOut: false,
  orgName: null,
  accessToken: null,
  orgEmail: null,
  orgLocation: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        error: ''
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        orgName: action.organization.name,
        accesToken: action.organization.accessToken,
        error: ''
      };
    case EDIT_PROFILE_START:
      return {
        ...state,
        editingProfile: true,
        error: ''
      };
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        editingProfile: false,
        error: action.error
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editingProfile: false,
        orgName: action.completeOrg.orgName,
        orgEmail: action.completeOrg.orgEmail,
        orgLocation: action.completeOrg.orgLocation,
        error: ''
      };
    case LOGOUT_START:
      return {
        ...state,
        loggingOut: true,
        error: ''
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        error: '',
        loggingIn: false,
        editingProfile: false,
        loggingOut: false,
        orgName: null,
        accessToken: null,
        orgEmail: null,
        orgLocation: null
      };
    default:
      return state;
  }
};

export default reducer;
