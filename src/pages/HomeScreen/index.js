import React, { useEffect, useState, useMemo } from 'react';
import ModalWeb from '~/components/ModalWeb';

import Search from '~/components/Search';
import SlideHorizontal from '~/components/SlideHorizontal';
import api from '~/services/api';
import { TextWhiteRegular24px } from '~/styles/globalStyled';
import { Container, Content } from './styled';
import styles from './styles';

// import { Container } from './styles';

const HomeScreen = () => {
  // const { tracks, albums } = useSelector((state) => state.auth);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [trackId, setTrackId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [played, setPlayed] = useState(false);

  const top = async () => {
    try {
      const response = await api.get('chart/0');
      // console.log(response.data.tracks.data);
      // dispatch(setTracks({ tracks: response.data.tracks.data }));

      setTracks([...response.data.tracks.data]);
      setAlbums([...response.data.albums.data]);
      setArtists([...response.data.artists.data]);
      // dispatch(setAlbums({ albums: response.data.albums.data }));
    } catch (error) {}
  };
  const setData = (msc, alb, art) => {
    msc && setTracks(msc);
    alb && setAlbums(alb);
    art && setArtists(art);
  };
  useEffect(() => {
    top();
  }, []);

  const setDataId = (id) => {
    console.log('setDataId', id);
    setTrackId(id);
    setVisible(true);
  };

  const artistView = useMemo(
    () => <SlideHorizontal type="artist" data={artists} />,
    [artists]
  );

  const albumView = useMemo(
    () => <SlideHorizontal type="album" data={albums} />,
    [albums]
  );

  const musicsView = useMemo(
    () => (
      <SlideHorizontal
        setPlayed={setPlayed}
        setId={setDataId}
        type="music"
        data={tracks}
      />
    ),
    [tracks]
  );
  return (
    <Container>
      <Content>
        <Search handle={(a, b, c) => setData(a, b, c)} />
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
