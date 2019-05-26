import Api from '../api/auth';
import Cookies from 'js-cookie';

export default store => {
  store.on('@init', () => ({
    auth: {
      isAuthenticated: false,
      error: false,
      api: new Api(),
    },
  }));

  store.on('auth/login', async (state, data) => {
    try {
      console.log('state', 'data');
      console.log(state, data);
      const { accessToken, refreshToken } = await state.auth.api.login(data);
      store.dispatch('auth/setAccessToken', accessToken);
      store.dispatch('auth/setRefreshToken', refreshToken);
    } catch (e) {
      console.log('Ошибка входа', e);
    }
  });

  store.on('auth/getUsers', async state => {
    try {
      return await state.auth.api.getUsers();
    } catch (e) {
      console.log('Ошибка при получении списка пользователей', e);
    }
  });

  store.on('auth/setAccessToken', (state, data) => {
    console.log(Cookies.get());
    Cookies.set('jwtAccessToken', data, { httpOnly: true });
    console.log(Cookies.get());
    return {
      auth: {
        ...state.auth,
        api: {
          ...state.auth.api,
          accessToken: data,
        },
      },
    };
  });

  store.on('auth/setRefreshToken', (state, data) => ({
    auth: {
      ...state.auth,
      api: {
        ...state.auth.api,
        refreshToken: data,
      },
    },
  }));

  store.on('auth/register', (state, data) => {});
};
