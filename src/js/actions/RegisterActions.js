import horizon from '../utils/horizon';
import {REGISTER_REINIT_TEACHERS} from '../constants/ActionTypes';
import {REGISTER_LOAD_SCHOOLS_REQUEST, REGISTER_LOAD_SCHOOLS_SUCCESS, REGISTER_LOAD_SCHOOLS_FAILURE} from '../constants/ActionTypes';
import {REGISTER_LOAD_TEACHERS_REQUEST, REGISTER_LOAD_TEACHERS_SUCCESS, REGISTER_LOAD_TEACHERS_FAILURE} from '../constants/ActionTypes';

export function registerReinitTeachersState() {
  return {
    type: REGISTER_REINIT_TEACHERS
  }
}

export function registerReinitTeachers() {
  return (dispatch, state) => {
    dispatch(registerReinitTeachersState());
  }
}

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

    horizon("schools").order("school_code").fetch().subscribe(
      schools => dispatch(registerLoadSchoolsSuccess(schools)),
      error => dispatch(registerLoadSchoolsFailure(error))
    );
  }
}

export function registerLoadTeachersRequest(schoolId) {
  return {
    type: REGISTER_LOAD_TEACHERS_REQUEST,
    payload: {
      schoolId: schoolId
    }
  }
}

export function registerLoadTeachersSuccess(teachers) {
  return {
    type: REGISTER_LOAD_TEACHERS_SUCCESS,
    payload: {
      teachers: teachers
    }
  }
}

export function registerLoadTeachersFailure(error) {
  return {
    type: REGISTER_LOAD_TEACHERS_FAILURE,
    payload: {
      error: error
    }
  }
}

export function registerLoadTeachers(schoolId) {
  return (dispatch, state) => {
    dispatch(registerLoadTeachersRequest(schoolId));

    horizon("teachers").findAll({school_id: schoolId}).order("name").fetch().subscribe(
      teachers => dispatch(registerLoadTeachersSuccess(teachers)),
      error => dispatch(registerLoadTeachersFailure(error))
    );
  }
}
