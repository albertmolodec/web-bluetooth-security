import React, { useCallback } from 'react';
import useStoreon from 'storeon/react';

import Bulb from '../Bulb';

import './index.css';

function Dashboard() {
  const { dispatch, user, device } = useStoreon('user', 'device');
  console.log('user', user);
  console.log('device', device);

  return <Bulb />;
}

export default Dashboard;
