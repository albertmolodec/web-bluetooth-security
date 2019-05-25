import createStore from 'storeon';

import device from './device';
import user from './user';

export const store = createStore([
  device,
  user,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools'),
]);
