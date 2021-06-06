import React from 'react';
import { Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextWhiteRegular16px,
  TextBlueRegular12px,
  TextBlueRegular10px,
} from '~/styles/globalStyled';

import { Content } from './styled';
import { removeTracks, setPlayed, setTrack } from '~/store/modules/auth/action';
import colors from '~/styles/colors';

const SlideVertical = () => {
  const styles = StyleSheet.create({
    buttonPlay: {
      bottom: '50%',
      elevation: 20,
      left: '5%',
      position: 'absolute',
      zIndex: 1000,
    },
    img: {
      height: RFValue(150),
      marginBottom: RFValue(16),
      resizeMode: 'contain',
      width: RFValue(150),
    },
    imgPlay: {
      height: RFValue(40),

      resizeMode: 'contain',
      width: RFValue(40),
    },
    list: {
      paddingVertical: RFValue(30),
    },
    rate: { tintColor: colors.GRAY },
    rateButton: {
      alignSelf: 'flex-start',
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
    dispatch(setPlayed(true));
  };

  const removeFavorite = (e) => {
    console.log({ tracks });
    const aux = tracks;
    const filteredIndex = aux.findIndex((x) => x.id === e.id);
    console.log({ filteredIndex });
    aux.splice(filteredIndex, 1);

    dispatch(removeTracks(aux));
  };

  const renderItem = ({ item, index }) => {
    return (
      <Content key={index}>
        <TouchableOpacity
          onPress={() =>
            select(
              item.preview,
              item.title,
              item.artist.name,
              item.duration,
              item.album.cover_medium
            )
          }
          style={styles.buttonPlay}
        >
          <Image
            style={styles.imgPlay}
            source={require('~/images/playPreview.png')}
          />
        </TouchableOpacity>

        <Image
          style={styles.img}
          source={{
            uri: item.album.cover_medium,
          }}
          progressiveRenderingEnabled
        />

        <TouchableOpacity
          onPress={() => removeFavorite(item)}
          style={styles.rateButton}
        >
          <Image style={styles.rate} source={require('~/images/trash.png')} />
        </TouchableOpacity>
        <TextWhiteRegular16px style={styles.title}>
          {item.title}
        </TextWhiteRegular16px>
        <TextBlueRegular12px style={styles.title}>
          {item.artist.name}
        </TextBlueRegular12px>
        {item.duration && (
          <TextBlueRegular10px style={styles.title}>
            {`Duração: ${convertTimeString(item.duration)}`}
          </TextBlueRegular10px>
        )}
      </Content>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={tracks}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => renderItem({ item, index })}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SlideVertical;
