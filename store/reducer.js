const LOGIN_START = 'LOGIN_START';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginStart = () => ({ type: LOGIN_START });
export const loginError = error => ({ type: LOGIN_ERROR, error });
export const loginSuccess = organization => ({
  type: LOGIN_SUCCESS,
  organization
});

const EDIT_PROFILE_START = 'EDIT_PROFILE_START';
const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR';
const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';

export const editProfileStart = () => ({ type: EDIT_PROFILE_START });
export const editProfileError = error => ({ type: EDIT_PROFILE_ERROR, error });
export const editProfileSuccess = completeOrg => ({
  type: EDIT_PROFILE_SUCCESS,
  completeOrg
});

const LOGOUT_START = 'LOGOUT_START';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logoutStart = () => ({ type: LOGOUT_START });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

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
    default:
      return state;
  }
};

export default reducer;
