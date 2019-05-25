import cookie from 'js-cookie';
import axios from 'axios';

export default store => {
  store.on('@init', () => ({
    auth: {
      isAuthenticated: false,
      error: false,
    },
  }));

  store.on('auth/login', (state, data) => {
    // setCookie
    console.log(cookie);

    return {
      auth: {
        ...state.auth,
        isAuthenticated: true,
      },
    };
  });

  store.on('auth/register', (state, data) => {});
};
