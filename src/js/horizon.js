import Horizon from '@horizon/client';

const horizon = Horizon({authType: 'token'});

function disconnect() {
  Horizon.clearAuthTokens();
}

horizon.disconnect = disconnect;

export default horizon;
