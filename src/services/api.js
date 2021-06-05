import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import APP from '~/config/app';

async function getBaseUrl() {
  const baseURL = await AsyncStorage.getItem('@deezerTest:BaseUrl');
  const value = baseURL || APP.BASE_URL;
  return `${value}/`;
}

function onRequestConfig(config, store) {
  const { token } = store.getState().auth;

  const headers = {
    authorization: `Bearer ${token}`,

  };

  config.headers = { ...config.headers, ...headers };

  return config;
}

const api = axios.create({
  baseURL: `${APP.BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.registerInterceptWithStore = (store) => {
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
