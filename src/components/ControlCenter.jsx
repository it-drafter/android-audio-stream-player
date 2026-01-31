import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Event,
} from 'react-native-track-player';
import {useNetInfo} from '@react-native-community/netinfo';
import GlobalContext from '../util/context';
import {localStorage} from '../util/http';
import ProgressSlider from './ProgressSlider';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import {colorSchemeObj} from '../util/colors';
import {useTranslation} from 'react-i18next';

const ControlCenter = props => {
  const globalCtx = useContext(GlobalContext);
  const {position} = useProgress();
  const playBackState = usePlaybackState().state;
  const netInfo = useNetInfo();
  const {t} = useTranslation();

  const handleRewind = async () => {
    await TrackPlayer.seekTo(position - 15);
  };

  const handleForward = async () => {
    await TrackPlayer.seekTo(position + 30);
  };

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
      if (localStorage.getString('localProgressMap')) {
        const localStorageData = JSON.parse(
          localStorage.getString('localProgressMap'),
        );
        localStorageData[globalCtx.fileNameLoadedToTrackValue] = 0;
        localStorage.set('localProgressMap', JSON.stringify(localStorageData));
      } else {
        localStorage.set(
          'localProgressMap',
          JSON.stringify({
            [globalCtx.fileNameLoadedToTrackValue]: 0,
          }),
        );
      }
    });
  }, [globalCtx.fileNameLoadedToTrackValue]);

  async function loadTrackNameToCtx() {
    const infoData = await TrackPlayer.getQueue();
    try {
      const infoDataUrlArr = (infoData[0]?.url).split('/');
      const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];

      globalCtx.setfileNameLoadedToTrackFn(trackNameFromUrl);

      localStorage.set('lastPlayedPodcast', trackNameFromUrl);
      localStorage.set('infoDataCurrentUrl', infoData[0]?.url);
    } catch (error) {}
  }

  const seekToJumpTo = async fileNameFromNav => {
    let localStorageProgress;
    if (localStorage.getString('localProgressMap')) {
      const localStorageData = JSON.parse(
        localStorage.getString('localProgressMap'),
      );

      localStorageProgress = localStorageData[fileNameFromNav] ?? 0;
    }

    await TrackPlayer.seekTo(localStorageProgress ?? 0);
  };

  const togglePlayback = async playback => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      switch (true) {
        case (playback === State.Paused || playback === State.Ready) &&
          globalCtx.fileNameLoadedToTrackValue.endsWith('stream'):
          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack();

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        case (playback === State.Paused || playback === State.Ready) &&
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          globalCtx.fileNameLoadedToTrackValue === props.fileNameFromNav:
          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack(localStorage, props.fileNameFromNav);

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        case (playback === State.Paused || playback === State.Ready) &&
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          globalCtx.fileNameLoadedToTrackValue !== props.fileNameFromNav:
          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack();

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        case playback === State.Stopped || playback === State.None:
          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack();

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        case playback === State.Playing &&
          globalCtx.fileNameLoadedToTrackValue.endsWith('stream'):
          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack();

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        case playback === State.Playing &&
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          globalCtx.fileNameLoadedToTrackValue === props.fileNameFromNav:
          if (localStorage.getString('localProgressMap')) {
            const localStorageData = JSON.parse(
              localStorage.getString('localProgressMap'),
            );
            localStorageData[globalCtx.fileNameLoadedToTrackValue] = position;
            localStorage.set(
              'localProgressMap',
              JSON.stringify(localStorageData),
            );
          } else {
            localStorage.set(
              'localProgressMap',
              JSON.stringify({
                [globalCtx.fileNameLoadedToTrackValue]: position,
              }),
            );
          }

          await TrackPlayer.pause();

          break;

        case playback === State.Playing &&
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          globalCtx.fileNameLoadedToTrackValue !== props.fileNameFromNav:
          if (localStorage.getString('localProgressMap')) {
            const localStorageData = JSON.parse(
              localStorage.getString('localProgressMap'),
            );
            localStorageData[globalCtx.fileNameLoadedToTrackValue] = position;
            localStorage.set(
              'localProgressMap',
              JSON.stringify(localStorageData),
            );
          } else {
            localStorage.set(
              'localProgressMap',
              JSON.stringify({
                [globalCtx.fileNameLoadedToTrackValue]: position,
              }),
            );
          }

          await TrackPlayer.reset();

          if (
            netInfo.isInternetReachable === false &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_check_internet'),
            );

            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
                true) &&
            netInfo.type !== 'wifi' &&
            !props.isAlreadyDownloaded
          ) {
            Alert.alert(
              t('control_center_error_title'),
              t('control_center_error_wifi_only'),
            );

            return;
          }

          props.addTrack();

          await seekToJumpTo(props.fileNameFromNav);

          await TrackPlayer.play();

          loadTrackNameToCtx();

          break;

        default:
          await TrackPlayer.reset();

          break;
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <ProgressSlider
        trackInfoFromNav={props.trackInfoFromNav}
        fileNameFromNav={props.fileNameFromNav}
      />

      <View style={styles.container}>
        {globalCtx.fileNameLoadedToTrackValue === props.fileNameFromNav &&
          playBackState === State.Playing && (
            <Pressable
              onPress={handleRewind}
              style={({pressed}) => pressed && styles.pressedItem}>
              <IconMaterialCommunity
                style={styles.icon(globalCtx.colorSchemeValue)}
                name="rewind-15"
                size={40}
              />
            </Pressable>
          )}

        <Pressable
          onPress={() => togglePlayback(playBackState)}
          style={({pressed}) => pressed && styles.pressedItem}>
          <IconMaterialCommunity
            style={[styles.icon(globalCtx.colorSchemeValue), styles.playButton]}
            name={
              playBackState === State.Playing &&
              globalCtx.fileNameLoadedToTrackValue === props.fileNameFromNav
                ? 'pause-circle'
                : 'play-circle'
            }
            size={60}
          />
        </Pressable>

        {globalCtx.fileNameLoadedToTrackValue === props.fileNameFromNav &&
          playBackState === State.Playing && (
            <Pressable
              onPress={handleForward}
              style={({pressed}) => pressed && styles.pressedItem}>
              <IconMaterialCommunity
                style={styles.icon(globalCtx.colorSchemeValue)}
                name="fast-forward-30"
                size={40}
              />
            </Pressable>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
    };
  },
  playButton: {
    marginHorizontal: 24,
  },
  pressedItem: {
    opacity: 0.2,
  },
});

export default ControlCenter;
