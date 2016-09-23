import Horizon from '@horizon/client';
import * as authActions from '../actions/AuthActions';
import { store } from '../store/configureStore';
// import { push } from 'redux-router';
import { browserHistory } from 'react-router';

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

if (horizon.hasAuthToken()) {
  horizon.currentUser().fetch().subscribe((user) => {
    console.log(JSON.stringify(user));
    store.dispatch(authActions.loginUserSuccess(user));

    browserHistory.push("/users/" + user.id);
  });
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
