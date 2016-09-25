import Horizon from '@horizon/client';
import * as authActions from '../actions/AuthActions';
import store from './store';
import { push } from 'react-router-redux';

const horizon = Horizon(buildHorizonProps());

function buildHorizonProps() {
  var adminToken = getQueryVariable("admin_token");

  if (adminToken) {
    console.log("Admin token found: ", adminToken);
    return {
        authType: {
            token: adminToken,
            storeLocally: false
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
