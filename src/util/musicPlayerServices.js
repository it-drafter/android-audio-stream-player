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
    await TrackPlayer.getActiveTrackIndex();
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
  const position = (await TrackPlayer.getProgress()).position;
  const infoData = await TrackPlayer.getQueue();
  try {
    const infoDataUrlArr = (infoData[0]?.url).split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];

    if (!trackNameFromUrl.endsWith('stream')) {
      if (localStorage.getString('localProgressMap')) {
        const localStorageData = JSON.parse(
          localStorage.getString('localProgressMap'),
        );

        if (localStorageData[trackNameFromUrl] === position) {
          return;
        }

        localStorageData[trackNameFromUrl] = position;
        localStorage.set('localProgressMap', JSON.stringify(localStorageData));
      } else {
        localStorage.set(
          'localProgressMap',
          JSON.stringify({[trackNameFromUrl]: position}),
        );
      }
    }
  } catch (error) {}
}

async function prepareStreamTrack() {
  const infoData = await TrackPlayer.getQueue();
  try {
    const infoDataUrlArr = (infoData[0]?.url).split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
    if (trackNameFromUrl.endsWith('stream')) {
      await TrackPlayer.reset();

      let urlToLoad;
      if (
        localStorage.getString('selectedStream') === undefined ||
        localStorage.getString('selectedStream') === 'stream1'
      ) {
        urlToLoad = 'https://stream.daskoimladja.com:9000/stream';
      } else if (localStorage.getString('selectedStream') === 'stream2') {
        urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
      }

      await TrackPlayer.add([
        {
          id: 'stream',
          title: 'Live Stream',
          artist: 'Daško i Mlađa',
          url: urlToLoad,
          artwork: artworkImgStream,
          description: 'Radio Daško i Mlađa',
          album: 'D&M',
        },
      ]);
    }
  } catch (error) {}
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    remoteProgressSave();
    await TrackPlayer.pause();
    prepareStreamTrack();
  });

  async function playFunction() {
    const infoData = await TrackPlayer.getQueue();

    try {
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

            let urlToLoad;
            if (
              localStorage.getString('selectedStream') === undefined ||
              localStorage.getString('selectedStream') === 'stream1'
            ) {
              urlToLoad = 'https://stream.daskoimladja.com:9000/stream';
            } else if (localStorage.getString('selectedStream') === 'stream2') {
              urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
            }

            await TrackPlayer.add([
              {
                id: 'stream',
                title: 'Live Stream',
                artist: 'Daško i Mlađa',
                url: urlToLoad,
                artwork: artworkImgStream,
                description: 'Radio Daško i Mlađa',
                album: 'D&M',
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

            let urlToLoad1;
            if (
              localStorage.getString('selectedStream') === undefined ||
              localStorage.getString('selectedStream') === 'stream1'
            ) {
              urlToLoad1 = 'https://stream.daskoimladja.com:9000/stream';
            } else if (localStorage.getString('selectedStream') === 'stream2') {
              urlToLoad1 = 'http://stream.daskoimladja.com:8000/stream';
            }
            await TrackPlayer.add([
              {
                id: 'stream',
                title: 'Live Stream',
                artist: 'Daško i Mlađa',
                url: urlToLoad1,
                artwork: artworkImgStream,
                description: 'Radio Daško i Mlađa',
                album: 'D&M',
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
    } catch (error) {}
  }

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    playFunction();
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async event => {
    // if (
    //   event.paused === true &&
    //   (localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') ===
    //     undefined ||
    //     localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') ===
    //       true)
    // ) {
    //   remoteProgressSave();
    //   await TrackPlayer.pause();
    // } else if (
    //   event.paused === false &&
    //   (localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') ===
    //     undefined ||
    //     localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') ===
    //       true)
    // ) {
    //   prepareStreamTrack();
    //   playFunction();
    // } else if (
    //   localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') === false
    // ) {
    remoteProgressSave();
    await TrackPlayer.pause();

    const infoData = await TrackPlayer.getQueue();

    try {
      const infoDataUrlArr = (infoData[0]?.url).split('/');
      const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
      if (trackNameFromUrl.endsWith('stream')) {
        await TrackPlayer.reset();

        let urlToLoad;
        if (
          localStorage.getString('selectedStream') === undefined ||
          localStorage.getString('selectedStream') === 'stream1'
        ) {
          urlToLoad = 'https://stream.daskoimladja.com:9000/stream';
        } else if (localStorage.getString('selectedStream') === 'stream2') {
          urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
        }

        await TrackPlayer.add([
          {
            id: 'stream',
            title: 'Live Stream',
            artist: 'Daško i Mlađa',
            url: urlToLoad,
            artwork: artworkImgStream,
            description: 'Radio Daško i Mlađa',
            album: 'D&M',
          },
        ]);
      }
    } catch (error) {}
    // }
  });

  TrackPlayer.addEventListener(
    Event.MetadataCommonReceived,

    async params => {
      try {
        let urlToLoad;
        if (
          localStorage.getString('selectedStream') === undefined ||
          localStorage.getString('selectedStream') === 'stream1'
        ) {
          urlToLoad = 'https://stream.daskoimladja.com:9000/stream';
        } else if (localStorage.getString('selectedStream') === 'stream2') {
          urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
        }

        await TrackPlayer.updateMetadataForTrack(0, {
          id: 'stream',
          title: params.metadata?.title || 'Live Stream',
          artist: params.metadata?.artist || 'Daško i Mlađa',
          url: urlToLoad,
          artwork: artworkImgStream,
          description: 'Radio Daško i Mlađa',
          album: 'D&M',
        });
      } catch (error) {}
    },
  );

  // save podcast progress every 6s in case of an unexpected playback interruption
  // it only affect podcasts (as intended)
  let lastPosition = 0;
  setInterval(async () => {
    const position = (await TrackPlayer.getProgress()).position;
    const duration = (await TrackPlayer.getProgress()).duration;

    if (duration && position !== lastPosition) {
      remoteProgressSave();
    }
    lastPosition = position;
  }, 6000);
}
