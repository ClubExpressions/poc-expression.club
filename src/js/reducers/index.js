import { combineReducers } from 'redux';
import friendList from './friendList';
import auth from './auth';
import {routerStateReducer} from 'redux-router';

const rootReducer = combineReducers({
  auth,
  router: routerStateReducer,
  friendList
});

export default rootReducer;
