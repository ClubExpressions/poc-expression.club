import {createConstants} from '../utils';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export default createConstants(
  'ADD_FRIEND',
  'STAR_FRIEND',
  'DELETE_FRIEND',
  'FETCH_PROTECTED_DATA_REQUEST',
  'RECEIVE_PROTECTED_DATA'
);
