import React, { useEffect, useState } from 'react';

import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import api from '~/services/api';
import colors from '~/styles/colors';
import {
  TextWhiteRegular16px,
  TextWhiteRegular19px,
  TextBlueRegular19px,
} from '~/styles/globalStyled';
import Player from '../Player';
import PlayerSolo from '../PlayerSolo';
import { Container, ContainerImage } from './styled';

const styles = StyleSheet.create({
  albumName: {
    textAlign: 'center',
  },
  artistName: {
    marginBottom: RFValue(10),
    textAlign: 'center',
  },
  img: {
    borderRadius: 200,
    height: RFValue(200.65),

    resizeMode: 'contain',
    width: RFValue(200.65),
  },
  imgArrow: {
    height: RFValue(40),
    resizeMode: 'contain',
    tintColor: colors.WHITE,
    width: RFValue(40),
  },
  imgArrowContainer: {
    elevation: 20,
    left: '2%',
    position: 'absolute',
    top: '2%',
    zIndex: 1000,
  },
  imgClaveBig: {
    bottom: '-10%',
    height: RFValue(70),
    left: '-5%',
    opacity: 0.7,
    position: 'absolute',
    resizeMode: 'contain',

    width: RFValue(70),
  },
  imgClaveSmall: {
    opacity: 0.7,
    position: 'absolute',
    right: '-10%',
    top: '-10%',
  },
});
const ModalWeb = ({ id, visible, setVisible }) => {
  const [track, setTrack] = useState(null);
  const getTrack = async () => {
    const response = await api.get(`track/${id}`);
    console.log(response.data);
    setTrack(response.data);
  };
  useEffect(() => {
    if (id) {
      getTrack();
    }
  }, [id]);

  const close = () => {
    setVisible(false);
    setTrack(null);
  };
  return (
    <Modal visible={visible} onRequestClose={close}>
      {track && (
        <Container>
          <TouchableOpacity onPress={close} style={styles.imgArrowContainer}>
            <Image
              style={styles.imgArrow}
              source={require('~/images/arrowLeft.png')}
            />
          </TouchableOpacity>
          <ContainerImage>
            <Image
              style={styles.img}
              source={{
                uri: track.album.cover_xl,
              }}
            />
            <Image
              style={styles.imgClaveSmall}
              source={require('~/images/claveSmall.png')}
            />
            <Image
              style={styles.imgClaveBig}
              source={require('~/images/claveBig.png')}
            />
          </ContainerImage>
          <TextWhiteRegular16px>artista</TextWhiteRegular16px>
          <TextBlueRegular19px style={styles.artistName}>
            {track.artist.name}
          </TextBlueRegular19px>

          <TextWhiteRegular16px>música</TextWhiteRegular16px>
          <TextBlueRegular19px style={styles.artistName}>
            {track.title}
          </TextBlueRegular19px>

          <TextWhiteRegular16px>álbum</TextWhiteRegular16px>
          <TextBlueRegular19px style={styles.albumName}>
            {track.album.title}
          </TextBlueRegular19px>
          <PlayerSolo track={track} />
        </Container>
      )}
    </Modal>
  );
};

export default ModalWeb;
