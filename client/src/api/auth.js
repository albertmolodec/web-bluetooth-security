import axios from 'axios';
import Cookie from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:3001/api/';

export default class Api {
  constructor(options = {}) {
    this.client = options.client || axios.create();
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.accessToken) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.Authorization = `Bearer ${this.accessToken}`;
        return newConfig;
      },
      e => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('/auth/refresh-token', {
            refreshToken: this.refreshToken,
          });
        }
        const { data } = await this.refreshRequest;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );
  }

  async login({ email, password }) {
    const { data } = await this.client.post('/auth/login', {
      email,
      password,
    });
    return {
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    };
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  getUsers() {
    return this.client('/users').then(({ data }) => data);
  }
}
