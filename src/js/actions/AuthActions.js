// import { checkHttpStatus, parseJSON } from '../utils';
// import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants';
import { LOGOUT_USER, LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../constants/ActionTypes';
import horizon from '../utils/horizon';
// import { pushState } from 'redux-router';
// import jwtDecode from 'jwt-decode';

export function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

// export function loginUserFailure(error) {
//   localStorage.removeItem('token');
//   return {
//     type: LOGIN_USER_FAILURE,
//     payload: {
//       status: error.response.status,
//       statusText: error.response.statusText
//     }
//   }
// }

export function loginUserRequest(provider) {
  return {
    type: LOGIN_USER_REQUEST,
    provider
  }
}

export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        horizon.disconnect();
        dispatch(logout());
        // dispatch(pushState(null, '/login'));
    }
}

export function loginUserWithOAuthProvider(provider) {
  return (dispatch, state) => {
    dispatch(loginUserRequest(provider));
    // Browser will be redirected to OAuth URL associated with the provider
    horizon.authEndpoint(provider).subscribe((endpoint) => {
      window.location.pathname = endpoint;
    });
  }
}

// export function loginUser(email, password, redirect="/") {
//     return function(dispatch) {
//         dispatch(loginUserRequest());
//         return fetch('http://localhost:3000/auth/getToken/', {
//             method: 'post',
//             credentials: 'include',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//                 body: JSON.stringify({email: email, password: password})
//             })
//             .then(checkHttpStatus)
//             .then(parseJSON)
//             .then(response => {
//                 try {
//                     let decoded = jwtDecode(response.token);
//                     dispatch(loginUserSuccess(response.token));
//                     dispatch(pushState(null, redirect));
//                 } catch (e) {
//                     dispatch(loginUserFailure({
//                         response: {
//                             status: 403,
//                             statusText: 'Invalid token'
//                         }
//                     }));
//                 }
//             })
//             .catch(error => {
//                 dispatch(loginUserFailure(error));
//             })
//     }
// }

// export function receiveProtectedData(data) {
//     return {
//         type: RECEIVE_PROTECTED_DATA,
//         payload: {
//             data: data
//         }
//     }
// }

// export function fetchProtectedDataRequest() {
//   return {
//     type: FETCH_PROTECTED_DATA_REQUEST
//   }
// }

// export function fetchProtectedData(token) {

//     return (dispatch, state) => {
//         dispatch(fetchProtectedDataRequest());
//         return fetch('http://localhost:3000/getData/', {
//                 credentials: 'include',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(checkHttpStatus)
//             .then(parseJSON)
//             .then(response => {
//                 dispatch(receiveProtectedData(response.data));
//             })
//             .catch(error => {
//                 if(error.response.status === 401) {
//                   dispatch(loginUserFailure(error));
//                   dispatch(pushState(null, '/login'));
//                 }
//             })
//        }
// }
