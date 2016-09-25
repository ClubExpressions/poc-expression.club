import { createReducer } from '../utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, LOGIN_USER_LOADING } from '../constants/ActionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isLoading: false,
  statusText: null
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': "Connexion en cours..."
    });
  },
  [LOGIN_USER_LOADING]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      isLoading: true,
      'statusText': 'Recupération de vos données en cours ...'
    });
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      isLoading: false,
      'user': payload.user,
      'statusText': 'Vous êtes connecté.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      isLoading: false,
      'user': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'user': null,
      'statusText': 'Vous avez été déconnecté avec succès.'
    });
  }
});
