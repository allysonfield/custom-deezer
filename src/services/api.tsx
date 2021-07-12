import AsyncStorage from '@react-native-community/async-storage';
// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance } from 'axios';
import APP from '../config/app';

interface apiProps extends AxiosInstance {
  registerInterceptWithStore?: any;
}

async function getBaseUrl() {
  const baseURL = await AsyncStorage.getItem('@deezerTest:BaseUrl');
  const value = baseURL || APP.BASE_URL;
  return `${value}/`;
}

function onRequestConfig(config: any, store: any) {
  const { token } = store.getState().auth;

  const headers = {
    authorization: `Bearer ${token}`,
  };

  config.headers = { ...config.headers, ...headers };

  return config;
}

const api: apiProps = axios.create({
  baseURL: `${APP.BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.registerInterceptWithStore = (store: any) => {
  api.interceptors.request.use(
    (config) => onRequestConfig(config, store),
    (error) => Promise.reject(error)
  );

  api.interceptors.request.use(
    async (config) => {
      config.baseURL = await getBaseUrl();
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error?.response) {
        // alert('Não foi possível conectar ao servidor');
        console.log('ERRO NA REQUISICAO: ', error);
      }

      return Promise.reject(error);
    }
  );
};

export default api;
