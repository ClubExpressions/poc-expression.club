import {createReducer} from '../utils';
import horizon from '../utils/horizon'
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../constants/ActionTypes';
// import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: horizon.hasAuthToken(),
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': 'Test - TODO: lire depuis le backend',//jwtDecode(payload.token).userName,
            'statusText': 'Vous êtes connecté.'
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'Vous avez été déconnecté avec succès.'
        });
    }
});
