import React from 'react';
import axios from 'axios';

import Bulb from '../Bulb';
import Api from '../../api/auth';

import './index.css';

const jwtAccessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgzMTM1NDUsImlhdCI6MTU1ODMxMjY0NSwic3ViIjoiNWNkN2JkNDQxMzZhNDIzODZjY2JlYTUzIn0.wN6yxUrlLRvqD9S1ZS7jN7Dqx-Ew_3fRrWcqBo6AWls';
const jwtRefreshToken =
  '5cd7bd44136a42386ccbea53.7cbad6b53d338fbd0e1ba2c31f0ac7f760f675669f7d8401c277f4b73a67ba167c10f2091d4c0598';

function App() {
  const client = axios.create();
  const api = new Api({
    client,
    token: jwtAccessToken,
    refreshToken: jwtRefreshToken,
  });

  async function logUsers() {
    console.log(await api.getUsers());
  }
  logUsers();

  return <Bulb />;
}

export default App;
