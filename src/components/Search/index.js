import React, { useState } from 'react';

import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import { setDataRequest } from '~/store/modules/auth/action';
import { Container, Input } from './styled';

// import { Container } from './styles';

const Search = ({ handle }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const search = async (e) => {
    setKey(e);
    const musics = await api.get(`search?q=${e}`);

    const albums = await api.get(`search/album?q=${e}`);

    const artists = await api.get(`search/artist?q=${e}`);
    handle(musics.data.data, albums.data.data, artists.data.data);
    // dispatch(setDataRequest({ key: e }));
  };
  return (
    <Container>
      <Input value={key} onChangeText={(e) => search(e)} />
      <Image source={require('~/images/search.png')} />
    </Container>
  );
};

export default Search;
