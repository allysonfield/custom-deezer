import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import { useSelector } from 'react-redux';
import colors from '~/styles/colors';
import {
  Row,
  TextWhiteRegular18px,
  TextBlueRegular10px,
} from '~/styles/globalStyled';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN,
    justifyContent: 'space-between',
    paddingRight: RFValue(28),
  },
  controls: {
    justifyContent: 'space-between',
    width: RFValue(119),
  },
  disco: {
    height: RFValue(50.67),
    marginRight: RFValue(8.44),
    resizeMode: 'contain',
    width: RFValue(50.67),
  },
  img: {
    height: RFValue(66.67),
    marginRight: RFValue(8.44),
    resizeMode: 'contain',
    width: RFValue(66.67),
  },
  slider: {
    backgroundColor: colors.MAIN,
    elevation: 1,
    width,
    zIndex: 1000,
  },
  title: {
    width: RFValue(150),
  },
});

const Player = () => {
  const { track, played } = useSelector((state) => state.auth);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  const progress = useTrackPlayerProgress(250);
  const { duration, position } = progress;
  const playbackState = usePlaybackState();

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }
  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: track.id,
        url: track.music,
        title: track.title,
        artist: track.artist,
        artwork: 'https://i.picsum.photos/id/500/200/200.jpg',
      });
      await TrackPlayer.play();
    } else if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  useEffect(() => {
    setSeek(0);
    setIsSeeking(false);
    setup();
    played && togglePlayback();
  }, [track]);

  useEffect(() => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      setIsSeeking(false);
    }
  }, [position]);

  return (
    <>
      <Slider
        disabled={!track.img}
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, 0.31)"
        thumbTintColor="#FFFFFF"
        value={isSeeking ? seek : position}
        onValueChange={(value) => {
          TrackPlayer.pause();
          setIsSeeking(true);
          setSeek(value);
        }}
        onSlidingComplete={(value) => {
          TrackPlayer.seekTo(value);
          TrackPlayer.play();
        }}
      />
      <Row style={styles.container}>
        <Row>
          {track.img ? (
            <Image style={styles.img} source={{ uri: track.img }} />
          ) : (
            <Image
              style={styles.disco}
              source={require('~/images/disco.png')}
            />
          )}
          <View>
            {track && (
              <TextWhiteRegular18px numberOfLines={2} style={styles.title}>
                {track.title}
              </TextWhiteRegular18px>
            )}
            {track && (
              <TextBlueRegular10px numberOfLines={1} style={styles.title}>
                {track.artist}
              </TextBlueRegular10px>
            )}
          </View>
        </Row>
        <Row style={styles.controls}>
          <Image source={require('~/images/previous.png')} />
          {playbackState === TrackPlayer.STATE_PLAYING ? (
            <TouchableOpacity onPress={togglePlayback}>
              <Image source={require('~/images/pause.png')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={!track.img} onPress={togglePlayback}>
              <Image source={require('~/images/player.png')} />
            </TouchableOpacity>
          )}
          <Image source={require('~/images/next.png')} />
        </Row>
      </Row>
    </>
  );
};

export default Player;
