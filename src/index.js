import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import axios from "axios";

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from './services/api';
// import { Container } from './styles';
Icon.loadFont();
const App = () => {
  const apiTest = async () => {
    const response = await api.get('search?q=mpb');
    console.log(response.data)
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
  }
  useEffect(() => {
    apiTest()
  }, [])
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

export default App;
