import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { Image, ViewProps } from 'react-native';
import api from '../../services/api';
import { Container, Input } from './styled';

// import { Container } from './styles';

interface SearchProps extends ViewProps {
  handle: (musics: [], albums: [], artists: []) => void;
}
const Search = ({ handle, ...rest }: SearchProps) => {
  const [key, setKey] = useState('');

  const search = async (e: string) => {
    setKey(e);
    const musics = await api.get(`search?q=${e}`);

    const albums = await api.get(`search/album?q=${e}`);

    const artists = await api.get(`search/artist?q=${e}`);
    handle(musics.data.data, albums.data.data, artists.data.data);
    // dispatch(setDataRequest({ key: e }));
  };
  return (
    <Container {...rest}>
      <Input value={key} onChangeText={(e: string) => search(e)} />
      <Image source={require('~/images/search.png')} />
    </Container>
  );
};

export default Search;
