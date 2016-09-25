import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import register from "./register";

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  register,
});

export default rootReducer;
