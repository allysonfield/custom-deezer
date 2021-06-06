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
import colors from '~/styles/colors';
import { Row } from '~/styles/globalStyled';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.MAIN,

    height: RFValue(100),
    justifyContent: 'center',
    width: '100%',
  },
  imgPause: {
    // height: RFValue(26.68),
    // // tintColor: colors.MAIN,
    // width: RFValue(26.68),
  },
  pause: {
    alignItems: 'center',
    backgroundColor: colors.YELLOW,
    borderRadius: 200,
    height: RFValue(57.68),
    justifyContent: 'center',
    width: RFValue(57.68),
  },
  slider: {
    backgroundColor: colors.MAIN,
    // bottom: '9%',
    elevation: 1,
    // position: 'absolute',
    width,
    zIndex: 1000,
  },
});

const PlayerSolo = ({ track }) => {
  // const { track } = useSelector((state) => state.auth);
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
      // await TrackPlayer.add(playlistData);
      await TrackPlayer.add({
        id: track.id,
        url: track.preview,
        title: track.title,
        artist: track.artist.name,
        // duration: track.duration,
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
    // track && togglePlayback();
  }, []);

  useEffect(() => {
    // console.log({ track });
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      setIsSeeking(false);
    }
  }, [position]);

  return (
    <>
      <Slider
        disabled={!track}
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
      {/* <Text>{getStateName(playbackState)}</Text> */}
      <View style={styles.container}>
        {playbackState === TrackPlayer.STATE_PLAYING ? (
          <TouchableOpacity style={styles.pause} onPress={togglePlayback}>
            <Image
              style={styles.imgPause}
              source={require('~/images/pauseDark.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={!track} onPress={togglePlayback}>
            <Image source={require('~/images/playerYellow.png')} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default PlayerSolo;
