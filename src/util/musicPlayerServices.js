import TrackPlayer, {
  Event,
  RepeatMode,
  AppKilledPlaybackBehavior,
  Capability,
  State,
} from 'react-native-track-player';

import {AppState, BackHandler} from 'react-native';

import {localStorage} from '../util/http';
import NetInfo from '@react-native-community/netinfo';

import artworkImgStream from '../assets/artwork-stream.png';
import artworkImgPodcast from '../assets/artwork-podcast.jpg';

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

  const infoDataUrl = localStorage.getString('infoDataCurrentUrl');

  try {
    const infoDataUrlArr = infoDataUrl.split('/');
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
  const infoDataUrl = localStorage.getString('infoDataCurrentUrl');

  try {
    const infoDataUrlArr = infoDataUrl.split('/');
    const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
    if (trackNameFromUrl.endsWith('stream')) {
      await TrackPlayer.reset();

      let urlToLoad;
      if (
        localStorage.getString('selectedStream') === undefined ||
        localStorage.getString('selectedStream') === 'stream1'
      ) {
        urlToLoad = 'https://stream.daskoimladja.com/proxy/daskomladja/stream';
      } else if (localStorage.getString('selectedStream') === 'stream2') {
        urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
      }

      await TrackPlayer.add([
        {
          id: 'stream',
          title: 'Live Stream',
          artist: 'Radio D&M',
          url: urlToLoad,
          artwork: artworkImgStream,
          description: 'Daško i Mlađa',
          album: 'D&M',
          isLiveStream: true,
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
    const infoDataUrl = localStorage.getString('infoDataCurrentUrl');

    try {
      const infoDataUrlArr = infoDataUrl ? infoDataUrl.split('/') : [];
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
              urlToLoad =
                'https://stream.daskoimladja.com/proxy/daskomladja/stream';
            } else if (localStorage.getString('selectedStream') === 'stream2') {
              urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
            }

            await TrackPlayer.add([
              {
                id: 'stream',
                title: 'Live Stream',
                artist: 'Radio D&M',
                url: urlToLoad,
                artwork: artworkImgStream,
                description: 'Daško i Mlađa',
                album: 'D&M',
                isLiveStream: true,
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
              urlToLoad1 =
                'https://stream.daskoimladja.com/proxy/daskomladja/stream';
            } else if (localStorage.getString('selectedStream') === 'stream2') {
              urlToLoad1 = 'http://stream.daskoimladja.com:8000/stream';
            }
            await TrackPlayer.add([
              {
                id: 'stream',
                title: 'Live Stream',
                artist: 'Radio D&M',
                url: urlToLoad1,
                artwork: artworkImgStream,
                description: 'Daško i Mlađa',
                album: 'D&M',
                isLiveStream: true,
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
    remoteProgressSave();
    await TrackPlayer.pause();

    const infoDataUrl = localStorage.getString('infoDataCurrentUrl');

    try {
      const infoDataUrlArr = infoDataUrl.split('/');

      const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];
      if (trackNameFromUrl.endsWith('stream')) {
        await TrackPlayer.reset();

        if ((AppState.currentState = 'background')) {
          BackHandler.exitApp();
          return;
        }

        let urlToLoad;
        if (
          localStorage.getString('selectedStream') === undefined ||
          localStorage.getString('selectedStream') === 'stream1'
        ) {
          urlToLoad =
            'https://stream.daskoimladja.com/proxy/daskomladja/stream';
        } else if (localStorage.getString('selectedStream') === 'stream2') {
          urlToLoad = 'http://stream.daskoimladja.com:8000/stream';
        }

        await TrackPlayer.add([
          {
            id: 'stream',
            title: 'Live Stream',
            artist: 'Radio D&M',
            url: urlToLoad,
            artwork: artworkImgStream,
            description: 'Daško i Mlađa',
            album: 'D&M',
            isLiveStream: true,
          },
        ]);
      }
    } catch (error) {}
  });

  TrackPlayer.addEventListener(
    Event.MetadataTimedReceived,

    async params => {
      try {
        const infoDataUrl = localStorage.getString('infoDataCurrentUrl');
        const infoDataUrlArr = infoDataUrl.split('/');
        const trackNameFromUrl = infoDataUrlArr[infoDataUrlArr.length - 1];

        if (trackNameFromUrl.endsWith('stream')) {
          const state = (await TrackPlayer.getPlaybackState()).state;
          let isPlaying;
          if (state === State.Playing) {
            isPlaying = true;
          } else {
            isPlaying = false;
          }

          await TrackPlayer.updateMetadataForTrack(0, {
            title: isPlaying
              ? params.metadata[0]?.title || 'Live Stream'
              : 'Live Stream',
            artist: isPlaying
              ? params.metadata[0]?.artist || 'Radio D&M'
              : 'Radio D&M',
            artwork: artworkImgStream,
            description: 'Daško i Mlađa',
            album: 'D&M',
          });
        } else {
          await TrackPlayer.updateMetadataForTrack(0, {
            title: params.metadata[0]?.title || 'D&M Podcast',
            artist: params.metadata[0]?.artist || 'Radio D&M',
            artwork: artworkImgPodcast,
            description: 'Daško i Mlađa',
            album: 'D&M',
          });
        }
      } catch (error) {}
    },
  );
}
