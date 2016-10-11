import Horizon from '@horizon/client';
import store from './store';
import { push } from 'react-router-redux';

const horizon = Horizon(buildHorizonProps());

function buildHorizonProps() {
  var token = getQueryVariable("token");

  if (token) {
    console.log("Auth token found: ", token);
    return {
        authType: {
            token: token,
            storeLocally: true
        }
    };
  } else {
    return {
      authType: 'token'
    };
  }
}

function disconnect() {
  Horizon.clearAuthTokens();
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable) {
      return pair[1];
    }
  }
  return(false);
}

horizon.disconnect = disconnect;

export default horizon;
