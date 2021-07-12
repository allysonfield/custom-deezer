import React, { useEffect, useState, useMemo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import ModalWeb from '../../components/ModalWeb';
import Search from '../../components/Search';
import { Media, SlideHorizontal } from '../../components/SlideHorizontal';
import api from '../../services/api';
import { setPlayed } from '../../store/modules/auth/action';
import { TextWhiteRegular24px } from '../../styles/globalStyled';
import { Container, Content } from './styled';
import styles from './styles';

interface HomeScreenProps {
  navigation: any;
}



const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState<Media[]>([]);
  const [albums, setAlbums] = useState<Media[]>([]);
  const [artists, setArtists] = useState<Media[]>([]);
  const [trackId, setTrackId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const top = async () => {
    try {
      const response = await api.get('chart/0');

      setTracks([...response.data.tracks.data]);
      setAlbums([...response.data.albums.data]);
      setArtists([...response.data.artists.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const setData = (msc: [], alb: [], art: []) => {
    msc && setTracks(msc);
    alb && setAlbums(alb);
    art && setArtists(art);
  };
  useEffect(() => {
    top();
    dispatch(setPlayed(false));
  }, []);

  const setDataId = (id: string) => {
    console.log('setDataId', id);
    setTrackId(id);
    setVisible(true);
  };

  const artistView = useMemo(
    () => <SlideHorizontal setId={setDataId} type="artist" media={artists} />,
    [artists]
  );

  const albumView = useMemo(
    () => <SlideHorizontal setId={setDataId} type="album" media={albums} />,
    [albums]
  );

  const musicsView = useMemo(
    () => <SlideHorizontal setId={setDataId} type="music" media={tracks} />,
    [tracks]
  );
  return (
    <Container>
      <Content>
        <Search handle={(a: [], b: [], c: []) => setData(a, b, c)} />
        <TouchableOpacity
          style={styles.buttonFavorites}
          onPress={() => navigation.navigate('FavoritesScreen')}
        >
          <TextWhiteRegular24px>Favoritas</TextWhiteRegular24px>
          <Image style={styles.liker} source={require('~/images/liked.png')} />
        </TouchableOpacity>
        <TextWhiteRegular24px style={styles.musicas}>
          Músicas
        </TextWhiteRegular24px>
        {musicsView}
        <TextWhiteRegular24px style={styles.albums}>
          Artistas
        </TextWhiteRegular24px>
        {artistView}

        <TextWhiteRegular24px style={styles.albums}>
          Álbuns
        </TextWhiteRegular24px>
        {albumView}
      </Content>
      <ModalWeb id={trackId} visible={visible} setVisible={setVisible} />
    </Container>
  );
};

export default HomeScreen;
