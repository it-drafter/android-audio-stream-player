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
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorSchemeObj} from '../util/colors';

const ControlCenter = props => {
  const globalCtx = useContext(GlobalContext);
  const {position} = useProgress();
  const playBackState = usePlaybackState();
  const netInfo = useNetInfo();

  const handleRewind = async () => {
    await TrackPlayer.seekTo(position - 30);
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
  }, [localStorage]);

  async function loadTrackNameToCtx() {
    const infoData = await TrackPlayer.getQueue();
    const infoDataUrlArr = (infoData[0]?.url).split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];

    globalCtx.setfileNameLoadedToTrackFn(trackNameFromUrl);

    localStorage.set('lastPlayedPodcast', trackNameFromUrl);
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
    const currentTrack = await TrackPlayer.getCurrentTrack();

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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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

          await TrackPlayer.reset();

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
              'Ne mogu da pustim podkast',
              'Proveri internet konekciju.',
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
              'Ne mogu da pustim podkast.',
              'U podešavanjima je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
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
    <>
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
                name="rewind-30"
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
                ? 'stop-circle'
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
    </>
  );
};

const styles = StyleSheet.create({
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
    opacity: 0.5,
  },
});

export default ControlCenter;
