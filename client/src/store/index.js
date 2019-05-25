import createStore from 'storeon';

import device from './device';
import auth from './auth';

export const store = createStore([
  device,
  auth,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools'),
]);

export default store;
