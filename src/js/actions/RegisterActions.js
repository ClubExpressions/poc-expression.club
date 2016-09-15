import {REGISTER_LOAD_SCHOOLS_REQUEST, REGISTER_LOAD_SCHOOLS_SUCCESS, REGISTER_LOAD_SCHOOLS_FAILURE} from '../constants/ActionTypes';
import horizon from '../utils/horizon';

export function registerLoadSchoolsRequest() {
  return {
    type: REGISTER_LOAD_SCHOOLS_REQUEST
  }
}

export function registerLoadSchoolsSuccess(schools) {
  return {
    type: REGISTER_LOAD_SCHOOLS_SUCCESS,
    payload: {
      schools: schools
    }
  }
}

export function registerLoadSchoolsSuccess(schools) {
  return {
    type: REGISTER_LOAD_SCHOOLS_SUCCESS,
    payload: {
      schools: schools
    }
  }
}

export function registerLoadSchoolsFailure(error) {
  return {
    type: REGISTER_LOAD_SCHOOLS_FAILURE,
    payload: {
      error: error
    }
  }
}

export function registerLoadSchools() {
  return (dispatch, state) => {
    dispatch(registerLoadSchoolsRequest());

    horizon("schools").order("code_etablissement").fetch().subscribe(
      schools => dispatch(registerLoadSchoolsSuccess(schools)),
      error => dispatch(registerLoadSchoolsFailure(error))
    );
  }
}
