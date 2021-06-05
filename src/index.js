import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialIcons';
import '~/config/ReactotronConfig';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import api from './services/api';
import colors from './styles/colors';
import { store } from './store';
import Routes from './routes';
import Player from './components/Player';
// import { Container } from './styles';
Icon.loadFont();
api.registerInterceptWithStore(store);
const App = () => {
  const apiTest = async () => {
    const response = await api.get('search?q=eminem');
    console.log(response.data);
    // const options = {
    //   method: 'GET',
    //   url: 'https://deezerdevs-deezer.p.rapidapi.com/radio/%7Bid%7D',
    //   headers: {
    //     'x-rapidapi-key': '21bf24f9b4msh0424fdd3aadb3a1p14f6fcjsn6bd8b875489c',
    //     'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
    //   }
    // };

    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
  };
  useEffect(() => {
    apiTest();
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.MAIN} />
      <NavigationContainer>
        <Provider store={store}>
          <Routes />
          <Player />
        </Provider>
      </NavigationContainer>
    </>
  );
};

export default App;
