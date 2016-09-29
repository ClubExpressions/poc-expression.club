import {createReducer} from '../utils';
import {REGISTER_REINIT_TEACHERS} from '../constants/ActionTypes';
import {REGISTER_LOAD_SCHOOLS_REQUEST, REGISTER_LOAD_SCHOOLS_SUCCESS, REGISTER_LOAD_SCHOOLS_FAILURE} from '../constants/ActionTypes';
import {REGISTER_LOAD_TEACHERS_REQUEST, REGISTER_LOAD_TEACHERS_SUCCESS, REGISTER_LOAD_TEACHERS_FAILURE} from '../constants/ActionTypes';
import {REGISTER_SAVE_USER_REQUEST, REGISTER_SAVE_USER_SUCCESS, REGISTER_SAVE_USER_FAILURE} from '../constants/ActionTypes';

const DEFAULT_SCHOOLS_LOADING = [
  {
    id: "",
    name: "Chargement ..."
  }
];

const DEFAULT_SCHOOLS_LOADED = [
  {
    id: "",
    name: "Sélectionnez votre établissement"
  }
];

const DEFAULT_TEACHERS_LOADING = [
  {
    id: "",
    name: "Chargement ..."
  }
];

const DEFAULT_TEACHERS_LOADED = [
  {
    id: "",
    name: "Sélectionnez votre classe et votre professeur"
  }
];

const initialTeachersState = {
  teachers: DEFAULT_TEACHERS_LOADING,
  teachersIsLoaded: false,
  teachersIsLoading: false,
  teachersStatusText: "",
};

const initialState = {
  schools: DEFAULT_SCHOOLS_LOADING,
  isLoaded: false,
  isLoading: false,
  statusText: "",
  ...initialTeachersState
};

export default createReducer(initialState, {
  [REGISTER_LOAD_SCHOOLS_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      schools: DEFAULT_SCHOOLS_LOADING,
      isLoaded: false,
      isLoading: true,
      statusText: "",
      teachers: DEFAULT_TEACHERS_LOADING,
      teachersIsLoaded: false,
      teachersIsLoading: false,
      teachersStatusText: "",
    });
  },
  [REGISTER_LOAD_SCHOOLS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isLoading: false,
      isLoaded: true,
      schools: DEFAULT_SCHOOLS_LOADED.concat(payload.schools.map(school => {
        return {
          id: school.id,
          name: school.school_code + " - " + school.name,
        };
      })),
    });
  },
  [REGISTER_LOAD_SCHOOLS_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      schools: DEFAULT_SCHOOLS,
      statusText: "Loading error: " + payload.error
    });
  },
  [REGISTER_LOAD_TEACHERS_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      teachers: DEFAULT_TEACHERS_LOADING,
      teachersIsLoaded: false,
      teachersIsLoading: true,
      teachersStatusText: "",
    });
  },
  [REGISTER_LOAD_TEACHERS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      teachersIsLoading: false,
      teachersIsLoaded: true,
      teachers: DEFAULT_TEACHERS_LOADED.concat(payload.teachers),
    });
  },
  [REGISTER_LOAD_TEACHERS_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      schools: DEFAULT_TEACHERS_LOADING,
      statusText: "Loading error: " + payload.error
    });
  },
  [REGISTER_REINIT_TEACHERS]: (state, payload) => {
    return Object.assign({}, state, initialTeachersState);
  },
  [REGISTER_SAVE_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {});
  },
  [REGISTER_SAVE_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {});
  },
  [REGISTER_SAVE_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {});
  },
});
