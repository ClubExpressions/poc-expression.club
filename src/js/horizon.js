import Horizon from '@horizon/client';

const horizon = Horizon({host: 'localhost:8181', secure: true, authType: 'token'});

export default horizon;
