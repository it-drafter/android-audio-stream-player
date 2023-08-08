import TrackPlayer, {
  Event,
  RepeatMode,
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

import {localStorage} from '../util/http';
import NetInfo from '@react-native-community/netinfo';

import artworkImgStream from '../assets/artwork-stream.png';

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

    const infoData = await TrackPlayer.getQueue();
    const infoDataUrlArr = (infoData[0]?.url).split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
    if (trackNameFromUrl.endsWith('stream')) {
      await TrackPlayer.reset();

      await TrackPlayer.add([
        {
          id: 'stream',
          title: 'Live Stream',
          artist: 'Daško i Mlađa',
          url: 'https://stream.daskoimladja.com:9000/stream',
          artwork: artworkImgStream,
        },
      ]);

      setTimeout(async () => {
        try {
          await TrackPlayer.updateMetadataForTrack(0, {
            id: 'stream',
            title: 'Live Stream',
            artist: 'Daško i Mlađa',
            url: 'https://stream.daskoimladja.com:9000/stream',
            artwork: artworkImgStream,
          });
        } catch (error) {}
      }, 800);
    }
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
          await TrackPlayer.reset();

          await TrackPlayer.add([
            {
              id: 'stream',
              title: 'Live Stream',
              artist: 'Daško i Mlađa',
              url: 'https://stream.daskoimladja.com:9000/stream',
              artwork: artworkImgStream,
            },
          ]);

          await TrackPlayer.play();
          break;

        case connectionState.type === 'wifi' &&
          !trackNameFromUrl.endsWith('stream'):
          await TrackPlayer.play();
          break;

        case connectionState.type !== 'wifi' &&
          trackNameFromUrl.endsWith('stream') &&
          localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === false:
          await TrackPlayer.reset();

          await TrackPlayer.add([
            {
              id: 'stream',
              title: 'Live Stream',
              artist: 'Daško i Mlađa',
              url: 'https://stream.daskoimladja.com:9000/stream',
              artwork: artworkImgStream,
            },
          ]);

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

    const infoData = await TrackPlayer.getQueue();
    const infoDataUrlArr = (infoData[0]?.url).split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
    if (trackNameFromUrl.endsWith('stream')) {
      await TrackPlayer.reset();

      await TrackPlayer.add([
        {
          id: 'stream',
          title: 'Live Stream',
          artist: 'Daško i Mlađa',
          url: 'https://stream.daskoimladja.com:9000/stream',
          artwork: artworkImgStream,
        },
      ]);

      setTimeout(async () => {
        try {
          await TrackPlayer.updateMetadataForTrack(0, {
            id: 'stream',
            title: 'Live Stream',
            artist: 'Daško i Mlađa',
            url: 'https://stream.daskoimladja.com:9000/stream',
            artwork: artworkImgStream,
          });
        } catch (error) {}
      }, 800);
    }
  });

  TrackPlayer.addEventListener(
    Event.PlaybackMetadataReceived,

    async params => {
      try {
        await TrackPlayer.updateMetadataForTrack(0, {
          id: 'stream',
          title: params?.title || 'Live Stream',
          artist: params?.artist || 'Daško i Mlađa',
          url: 'https://stream.daskoimladja.com:9000/stream',
          artwork: artworkImgStream,
        });
      } catch (error) {}
    },
  );

  // save progress when internet connection is lost
  // it only affect podcasts (as intended)
  setInterval(async () => {
    const position = await TrackPlayer.getPosition();
    const buffered = await TrackPlayer.getBufferedPosition();
    const duration = await TrackPlayer.getDuration();

    if (
      position &&
      buffered &&
      position < duration - 10 &&
      position > buffered - 10
    ) {
      remoteProgressSave();
      (async () => {
        await TrackPlayer.pause();
        try {
          await TrackPlayer.reset();
        } catch (error) {}
      })();
    }
  }, 6000);
}
