import { LOGOUT_USER, LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_LOADING, LOGIN_USER_REFRESH } from '../constants/ActionTypes';
import horizon from '../utils/horizon';
import { push } from 'react-router-redux';

export function loginUserSuccess(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      user: user
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function loginUserLoading() {
  return {
    type: LOGIN_USER_LOADING
  }
}

export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function loginUserRefresh(user) {
  return {
    type: LOGIN_USER_REFRESH,
    payload: {
      user: user
    }
  }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        horizon.disconnect();
        dispatch(logout());
        dispatch(push("/"));
    }
}

export function loginUserWithOAuthProvider() {
  return (dispatch, state) => {
    dispatch(loginUserRequest());
    // Browser will be redirected to OAuth URL associated with the provider
    horizon.authEndpoint("auth0").subscribe((endpoint) => {
      window.location.replace(endpoint);
    });
  }
}

export function loadUserIfPossible() {
  return (dispatch, state) => {
    if (horizon.hasAuthToken()) {
      dispatch(loginUserLoading());

      horizon.currentUser().fetch().subscribe((user) => {
        dispatch(loginUserSuccess(user));
        dispatch(push("/users/" + user.id));
      });
    }
  }
}

export function refreshUser(user) {
  return (dispatch, state) => {
    dispatch(loginUserRefresh(user));
  }
}
