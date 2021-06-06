import React from 'react';
import { Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextWhiteRegular16px,
  TextBlueRegular12px,
  TextBlueRegular10px,
  Row,
} from '~/styles/globalStyled';

import { Content } from './styled';
import {
  removeTracks,
  setPlayed,
  setTrack,
  setTracks,
} from '~/store/modules/auth/action';
import colors from '~/styles/colors';

const SlideHorizontal = ({ data, type, setId }) => {
  const styles = StyleSheet.create({
    buttonPlay: {
      bottom: '45%',
      elevation: 20,
      left: '5%',
      position: 'absolute',
      zIndex: 1000,
    },
    img: {
      height: RFValue(190),
      marginBottom: RFValue(16),
      resizeMode: 'contain',
      width: RFValue(190),
    },
    imgPlay: {
      height: RFValue(40),

      resizeMode: 'contain',
      width: RFValue(40),
    },
    list: {
      marginHorizontal: RFValue(28),
    },
    rate: { tintColor: colors.GRAY },
    rateButton: {
      alignSelf: 'flex-start',
    },
    row: {
      alignItems: 'center',
      display: type !== 'music' ? 'none' : 'flex',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%',
    },
    title: {
      textAlign: 'center',
    },
    vermais: { paddingHorizontal: RFValue(10) },
  });
  const dispatch = useDispatch();
  const { tracks } = useSelector((state) => state.auth);
  const convertTimeString = (time) => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  };

  const select = (music, title, artist, duration, img) => {
    dispatch(setTrack({ data: { music, title, artist, duration, img } }));
    dispatch(setPlayed(true));
  };

  const addFavorite = (e) => {
    dispatch(setTracks(e));
  };

  const removeFavorite = (e) => {
    const aux = tracks;
    const filteredIndex = aux.findIndex((x) => x.id === e.id);
    aux.splice(filteredIndex, 1);

    dispatch(removeTracks(aux));
  };

  const verifyFavorite = (e) => {
    if (tracks.some((item) => item.id === e.id)) {
      return true;
    }
  };

  const typeDeterminate = (e) => {
    if (type === 'album') {
      return e.cover_medium;
    }

    if (type === 'artist') {
      return e.picture_medium;
    }

    if (type === 'music') {
      return e.album.cover_medium;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Content key={index}>
        {type === 'music' && (
          <TouchableOpacity
            onPress={() =>
              select(
                item.preview,
                item.title,
                item.artist.name,
                item.duration,
                typeDeterminate(item)
              )
            }
            style={styles.buttonPlay}
          >
            <Image
              style={styles.imgPlay}
              source={require('~/images/playPreview.png')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={type !== 'music'}
          onPress={() => setId(item.id)}
        >
          <Image
            style={styles.img}
            source={{
              uri: typeDeterminate(item),
            }}
            progressiveRenderingEnabled
          />
        </TouchableOpacity>
        <Row style={styles.row}>
          <TouchableOpacity
            style={styles.vermais}
            onPress={() => setId(item.id)}
          >
            <TextBlueRegular12px>Ver Mais</TextBlueRegular12px>
          </TouchableOpacity>
          {verifyFavorite(item) ? (
            <TouchableOpacity
              onPress={() => removeFavorite(item)}
              style={styles.rateButton}
            >
              <Image
                style={styles.rate}
                source={require('~/images/liked.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addFavorite(item)}
              style={styles.rateButton}
            >
              <Image
                style={styles.rate}
                source={require('~/images/liker.png')}
              />
            </TouchableOpacity>
          )}
        </Row>
        <TextWhiteRegular16px style={styles.title}>
          {item.title}
        </TextWhiteRegular16px>
        <TextBlueRegular12px>
          {type === 'artist' ? item.name : item.artist.name}
        </TextBlueRegular12px>
        {item.duration && (
          <TextBlueRegular10px>
            {`Duração: ${convertTimeString(item.duration)}`}
          </TextBlueRegular10px>
        )}
      </Content>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => renderItem({ item, index })}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default SlideHorizontal;
