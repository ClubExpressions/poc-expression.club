import { combineReducers } from 'redux';
import {routerStateReducer} from 'redux-router';
import friendList from './friendList';
import auth from './auth';
import register from "./register";

const rootReducer = combineReducers({
  router: routerStateReducer,
  auth,
  register,
  friendList
});

export default rootReducer;
