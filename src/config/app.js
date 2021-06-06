// const ENV = 'prod';
const ENV = 'prod';

const APP = {
  ENV,
  NAME: 'Deezer',
  VERSION: '0.0.1',
  BUILD: '01',
  BUNDLE: 'br.com.deezertest.app',
  BASE_URL: ENV === 'prod' ? 'https://api.deezer.com' : 'http://api.co',
  IMAGE_DEFAULT: '',
  GOOGLE_LOGIN: '',
  FACEBOOK_ID: '',
};

export default APP;
