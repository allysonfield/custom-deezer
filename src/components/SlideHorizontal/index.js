import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  TextWhiteRegular16px,
  TextBlueRegular12px,
  TextBlueRegular10px,
} from '~/styles/globalStyled';

import { Content, Foreground } from './styled';
import { setTrack } from '~/store/modules/auth/action';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  buttonPlay: {
    bottom: '25%',
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
  title: {
    textAlign: 'center',
  },
});
const SlideHorizontal = ({ data, type }) => {
  const dispatch = useDispatch();
  const convertTimeString = (time) => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  };

  const select = (music, title, artist, duration, img) => {
    dispatch(setTrack({ data: { music, title, artist, duration, img } }));
  };

  const typeDeterminate = (e) => {
    if (type === 'album') {
      console.log(type, e.cover_medium);
      return e.cover_medium;
    }

    if (type === 'artist') {
      console.log(type, e.picture_medium);
      return e.picture_medium;
    }

    if (type === 'music') {
      console.log(type, e.album.cover_medium);
      return e.album.cover_medium;
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item, i) => (
        <Content i={i} length={item.length} key={i.toString()}>
          {type !== 'album' && (
            <TouchableOpacity
              onPress={() =>
                select(
                  item.preview,
                  item.title,
                  type === 'artist' ? item.name : item.artist.name,
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
          <TouchableOpacity activeOpacity={1}>
            <Image
              style={styles.img}
              source={{
                uri: typeDeterminate(item),
              }}
              progressiveRenderingEnabled
              PlaceholderContent={<ActivityIndicator size={30} />}
            />
          </TouchableOpacity>
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
      ))}
    </ScrollView>
  );
};

export default SlideHorizontal;
