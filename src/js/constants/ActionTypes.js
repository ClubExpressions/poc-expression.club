import {createConstants} from '../utils';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';

export default createConstants(
  'ADD_FRIEND',
  'STAR_FRIEND',
  'DELETE_FRIEND',
  'LOGIN_USER_FAILURE',
  'LOGIN_USER_SUCCESS',
  'LOGOUT_USER',
  'FETCH_PROTECTED_DATA_REQUEST',
  'RECEIVE_PROTECTED_DATA'
);
