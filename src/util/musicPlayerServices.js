import TrackPlayer, {
  Event,
  RepeatMode,
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

import {localStorage} from '../util/http';
import NetInfo from '@react-native-community/netinfo';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo],
      notificationCapabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
}

async function remoteProgressSave() {
  const position = await TrackPlayer.getPosition();
  const infoData = await TrackPlayer.getQueue();
  const infoDataUrlArr = (infoData[0]?.url).split('/');
  const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];

  if (!trackNameFromUrl.endsWith('stream')) {
    if (localStorage.getString('localProgressMap')) {
      const localStorageData = JSON.parse(
        localStorage.getString('localProgressMap'),
      );
      localStorageData[trackNameFromUrl] = position;
      localStorage.set('localProgressMap', JSON.stringify(localStorageData));
    } else {
      localStorage.set(
        'localProgressMap',
        JSON.stringify({[trackNameFromUrl]: position}),
      );
    }
  }
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    remoteProgressSave();
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    const infoData = await TrackPlayer.getQueue();

    const infoDataUrlArr = infoData[0]?.url
      ? (infoData[0]?.url).split('/')
      : [];
    const trackNameFromUrl = infoDataUrlArr?.[infoDataUrlArr.length - 1];

    const connectionState = await NetInfo.fetch();

    if (!trackNameFromUrl) {
      return;
    }

    if (connectionState.isInternetReachable === true) {
      switch (true) {
        case connectionState.type === 'wifi' &&
          trackNameFromUrl.endsWith('stream'):
          await TrackPlayer.play();
          break;

        case connectionState.type === 'wifi' &&
          !trackNameFromUrl.endsWith('stream'):
          await TrackPlayer.play();
          break;

        case connectionState.type !== 'wifi' &&
          trackNameFromUrl.endsWith('stream') &&
          localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === false:
          await TrackPlayer.play();
          break;

        case connectionState.type !== 'wifi' &&
          !trackNameFromUrl.endsWith('stream') &&
          infoData[0]?.url.startsWith('file://'):
          await TrackPlayer.play();
          break;

        case connectionState.type !== 'wifi' &&
          !trackNameFromUrl.endsWith('stream') &&
          localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') === false:
          await TrackPlayer.play();
          break;

        default:
          break;
      }
    } else if (
      !trackNameFromUrl.endsWith('stream') &&
      infoData[0]?.url.startsWith('file://')
    ) {
      await TrackPlayer.play();
    }
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    remoteProgressSave();
    await TrackPlayer.pause();
  });
}
