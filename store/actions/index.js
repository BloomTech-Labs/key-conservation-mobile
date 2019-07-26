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
export const loginSuccess = organization => ({
  type: LOGIN_SUCCESS,
  organization
});

export const [EDIT_PROFILE_START, EDIT_PROFILE_ERROR, EDIT_PROFILE_SUCCESS] = [
  'EDIT_PROFILE_START',
  'EDIT_PROFILE_ERROR',
  'EDIT_PROFILE_SUCCESS'
];

export const editProfileStart = () => ({
  type: EDIT_PROFILE_START
});
export const editProfileError = error => ({
  type: EDIT_PROFILE_ERROR,
  error
});
export const editProfileSuccess = completeOrg => ({
  type: EDIT_PROFILE_SUCCESS,
  completeOrg
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


//export c