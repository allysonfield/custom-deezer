import React, { useEffect, useRef } from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextWhiteRegular16px,
  TextBlueRegular12px,
  TextBlueRegular10px,
} from '~/styles/globalStyled';

import { Content } from './styled';
import { removeTracks, setTrack, setTracks } from '~/store/modules/auth/action';
import colors from '~/styles/colors';

const { width } = Dimensions.get('window');

const SlideHorizontal = ({ data, type, setId, setPlayed }) => {
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
      display: type !== 'music' ? 'none' : 'flex',
    },
    title: {
      textAlign: 'center',
    },
  });
  const dispatch = useDispatch();
  const { tracks } = useSelector((state) => state.auth);
  const convertTimeString = (time) => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  };

  const select = (music, title, artist, duration, img) => {
    dispatch(setTrack({ data: { music, title, artist, duration, img } }));
    setPlayed(true);
  };

  const addFavorite = (e) => {
    console.log({ tracks });
    dispatch(setTracks(e));
  };

  const removeFavorite = (e) => {
    console.log({ tracks });
    const aux = tracks;
    const filteredIndex = aux.findIndex((x) => x.id === e.id);
    console.log({ filteredIndex });
    aux.splice(filteredIndex, 1);

    dispatch(removeTracks(aux));
  };

  const verifyFavorite = (e) => {
    if (tracks.some((item) => item.id === e.id)) {
      return true;
    }
  };

  // useEffect(() => {
  //   console.log('xico data', tracks);
  // }, [tracks]);

  const typeDeterminate = (e) => {
    if (type === 'album') {
      // console.log(type, e.cover_medium);
      return e.cover_medium;
    }

    if (type === 'artist') {
      // console.log(type, e.picture_medium);
      return e.picture_medium;
    }

    if (type === 'music') {
      // console.log(type, e.album.cover_medium);
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
        <TouchableOpacity onPress={() => setId(item.id)}>
          <Image
            style={styles.img}
            source={{
              uri: typeDeterminate(item),
            }}
            progressiveRenderingEnabled
          />
        </TouchableOpacity>
        {verifyFavorite(item) ? (
          <TouchableOpacity
            onPress={() => removeFavorite(item)}
            style={styles.rateButton}
          >
            <Image style={styles.rate} source={require('~/images/liked.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addFavorite(item)}
            style={styles.rateButton}
          >
            <Image style={styles.rate} source={require('~/images/liker.png')} />
          </TouchableOpacity>
        )}
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
  // const listaMensagensRef = useRef(null);
  return (
    <FlatList
      contentContainerStyle={styles.list}
      // ref={listaMensagensRef}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      // onContentSizeChange={() => {
      //   listaMensagensRef.current.scrollToEnd({ animated: true });
      // }}
      renderItem={({ item, index }) => renderItem({ item, index })}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default SlideHorizontal;
