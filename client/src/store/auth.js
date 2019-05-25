import Api from '../api/auth';

const jwtAccessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTg3OTI3NzAsImlhdCI6MTU1ODc5MTg3MCwic3ViIjoiNWNlN2ZjZDk3ZmFmYmM4ZTFjZDEzZGE2In0.QZ-FWFRlhJ0wBKY3bli4yFN-xV4WBV-k5ZnaCyDngfI';
const jwtRefreshToken =
  '5ce7fcd97fafbc8e1cd13da6.7ce1e4b9c8d1a24f156f39d58c3ad1d2ff01bc9d677ba67f32471444025c4b0d14b403fb86139ad8';

export default store => {
  store.on('@init', () => ({
    auth: {
      isAuthenticated: false,
      error: false,
      api: new Api({
        token: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      }),
    },
  }));

  store.on('auth/login', (state, data) => {
    return {
      auth: {
        ...state.auth,
        isAuthenticated: true,
      },
    };
  });

  store.on('auth/getUsers', async state => {
    console.log(await state.auth.api.getUsers());
  });

  store.on('auth/register', (state, data) => {});
};
