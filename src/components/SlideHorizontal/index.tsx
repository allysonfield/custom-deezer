import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  // eslint-disable-next-line no-unused-vars
  ViewProps,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextWhiteRegular16px,
  TextBlueRegular12px,
  TextBlueRegular10px,
  Row,
} from '../../styles/globalStyled';
import { Content } from './styled';
import {
  removeTracks,
  setPlayed,
  setTrack,
  setTracks,
} from '../../store/modules/auth/action';
import colors from '../../styles/colors';

('~/store/modules/auth/action');

interface Artist {
  name?: string;
}

export interface Auth {
  tracks: any;
}

interface State {
  auth: Auth;
}

export interface Media {
  preview: string;
  title: string;
  artist: Artist;
  duration: number;
  id: string;
  name?: string;
}

interface SlideHorizontalProps extends ViewProps {
  media: Media[];
  type: string;
  // eslint-disable-next-line react/require-default-props
  setId: (id: string) => void;
}
export function SlideHorizontal({
  media,
  type,
  setId,
  ...rest
}: SlideHorizontalProps) {
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
  const { tracks } = useSelector((state: State) => state.auth);
  const convertTimeString = (time: any) => {
    return moment().startOf('day').seconds(time).format('mm:ss');
  };

  const select = (
    preview: string,
    title: string,
    artist: any,
    duration: number,
    img: any
  ) => {
    dispatch(setTrack({ data: { preview, title, artist, duration, img } }));
    dispatch(setPlayed(true));
  };

  const addFavorite = (e: any) => {
    dispatch(setTracks(e));
  };

  const removeFavorite = (e: any) => {
    const aux = tracks;
    const filteredIndex = aux.findIndex((x: any) => x.id === e.id);
    aux.splice(filteredIndex, 1);

    dispatch(removeTracks(aux));
  };

  const verifyFavorite = (e: any) => {
    if (tracks.some((item: any) => item.id === e.id)) {
      return true;
    }
  };

  const typeDeterminate = (e: any) => {
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

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={media}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Content {...rest}>
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
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
