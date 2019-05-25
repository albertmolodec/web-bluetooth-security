import React from 'react';
import StoreContext from 'storeon/react/context';
import store from '../src/store';
import axios from 'axios';
import cookies from 'next-cookies';

import App, { Container } from 'next/app';

import Api from '../src/api/auth';

const jwtAccessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgzMTM1NDUsImlhdCI6MTU1ODMxMjY0NSwic3ViIjoiNWNkN2JkNDQxMzZhNDIzODZjY2JlYTUzIn0.wN6yxUrlLRvqD9S1ZS7jN7Dqx-Ew_3fRrWcqBo6AWls';
const jwtRefreshToken =
  '5cd7bd44136a42386ccbea53.7cbad6b53d338fbd0e1ba2c31f0ac7f760f675669f7d8401c277f4b73a67ba167c10f2091d4c0598';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const c = cookies(ctx);

    console.log('ctx c ', ctx, c);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

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

    return (
      <Container>
        <StoreContext.Provider value={store}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
