import {createReducer} from '../utils';
import {REGISTER_LOAD_SCHOOLS_REQUEST, REGISTER_LOAD_SCHOOLS_SUCCESS, REGISTER_LOAD_SCHOOLS_FAILURE} from '../constants/ActionTypes';

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

const initialState = {
    schools: DEFAULT_SCHOOLS_LOADING,
    isLoaded: false,
    isLoading: false,
    statusText: ""
};

export default createReducer(initialState, {
    [REGISTER_LOAD_SCHOOLS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isLoading: true,
            statusText: ""
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
            isAuthenticating: false,
            isAuthenticated: false,
            schools: DEFAULT_SCHOOLS,
            statusText: "Loading error: " + payload.error
        });
    }
});
