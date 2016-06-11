import { combineReducers } from 'redux';
import friendList from './friendList';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  friendList
});

export default rootReducer;
