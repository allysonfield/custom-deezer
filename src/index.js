import React from 'react';
import { StatusBar } from 'react-native';

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
