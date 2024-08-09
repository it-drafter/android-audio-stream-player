import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  useWindowDimensions,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
  Event,
  useProgress,
} from 'react-native-track-player';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNetInfo} from '@react-native-community/netinfo';
import GlobalContext from '../util/context';
import {localStorage} from '../util/http';
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
import RadioGroup from 'react-native-radio-buttons-group';

import {fetchNumberOfListenersAutodj} from '../util/http';
import {fetchNumberOfListenersLive} from '../util/http';
import {fetchNumberOfListenersStream} from '../util/http';

import {colorSchemeObj} from '../util/colors';

import Loading from './Loading';

import daWobble from '../assets/da-wobble.gif';
import mlWobble from '../assets/ml-wobble.gif';
import daSpin from '../assets/da-spin.gif';
import mlSpin from '../assets/ml-spin.gif';
import artworkImgStream from '../assets/artwork-stream.png';

const Stream = () => {
  const {width, height} = useWindowDimensions();

  const globalCtx = useContext(GlobalContext);
  const {position} = useProgress();
  const netInfo = useNetInfo();
  const playBackState = usePlaybackState().state;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState({});
  const [listenersCountAutodj, setListenersCountAutodj] =
    useState('nedostupno');
  const [listenersCountLive, setListenersCountLive] = useState('nedostupno');
  const [listenersCountStream, setListenersCountStream] =
    useState('nedostupno');
  const [selectedId, setSelectedId] = useState(
    localStorage.getString('selectedStream') ?? 'stream1',
  );

  async function addTrack() {
    try {
      setError(null);
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

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  const fetchNoOfListenersAutodj = async () => {
    const numberOfListenersAwaited = await fetchNumberOfListenersAutodj();
    setListenersCountAutodj(numberOfListenersAwaited);
  };

  const fetchNoOfListenersLive = async () => {
    const numberOfListenersAwaited = await fetchNumberOfListenersLive();
    setListenersCountLive(numberOfListenersAwaited);
  };

  const fetchNoOfListenersStream = async () => {
    const numberOfListenersAwaited = await fetchNumberOfListenersStream();
    setListenersCountStream(numberOfListenersAwaited);
  };

  useEffect(() => {
    fetchNoOfListenersAutodj();
    fetchNoOfListenersLive();
    fetchNoOfListenersStream();
    const intervalId = setInterval(() => {
      fetchNoOfListenersAutodj();
      fetchNoOfListenersLive();
      fetchNoOfListenersStream();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    addTrack();
    loadTrackUrlToCtx();
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(async connectionState => {
      const infoData = await TrackPlayer.getQueue();

      if (connectionState.type === 'cellular') {
        if (
          infoData[0]?.url.endsWith('stream') &&
          (localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === undefined ||
            localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === true)
        ) {
          await TrackPlayer.reset();
          return;
        } else if (
          !infoData[0]?.url.endsWith('stream') &&
          (localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ===
            undefined ||
            localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') === true) &&
          !infoData[0]?.url.startsWith('file://')
        ) {
          await TrackPlayer.reset();
          return;
        }
      }
    });
  }, []);

  useEffect(() => {
    TrackPlayer.addEventListener(
      Event.MetadataCommonReceived,

      async params => {
        setMetaData({
          title: params.metadata?.title,
          artist: params.metadata?.artist,
        });
      },
    );
  }, []);

  if (error) {
    return (
      <View
        style={styles.errorLoadingContainer(globalCtx.colorSchemeValue, width)}>
        <Text
          style={styles.textContent(width, height, globalCtx.colorSchemeValue)}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.errorLoadingContainer(globalCtx.colorSchemeValue)}>
        <Loading />
      </View>
    );
  }

  async function loadTrackUrlToCtx() {
    const infoData = await TrackPlayer.getQueue();

    globalCtx.setfileNameLoadedToTrackFn(infoData[0]?.url);
  }

  const togglePlayback = async playback => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playback !== State.Playing) {
        await TrackPlayer.reset();

        if (netInfo.isInternetReachable === false) {
          Alert.alert(
            'Ne mogu da pustim radio.',
            'Proveri internet konekciju.',
          );
          return;
        } else if (
          (localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === undefined ||
            localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === true) &&
          netInfo.type !== 'wifi'
        ) {
          Alert.alert(
            'Ne mogu da pustim radio.',
            'U podešavanjima ove aplikacije je uključena opcija "Slušaj live radio samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje radija i preko mobilnog interneta.',
          );
          return;
        }

        addTrack();
        await TrackPlayer.play();
        loadTrackUrlToCtx();
      } else {
        if (
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          localStorage.getString('localProgressMap')
        ) {
          const localStorageData = JSON.parse(
            localStorage.getString('localProgressMap'),
          );
          localStorageData[globalCtx.fileNameLoadedToTrackValue] = position;
          localStorage.set(
            'localProgressMap',
            JSON.stringify(localStorageData),
          );

          await TrackPlayer.reset();

          if (netInfo.isInternetReachable === false) {
            Alert.alert(
              'Ne mogu da pustim radio.',
              'Proveri internet konekciju.',
            );
            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForRadio') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === true) &&
            netInfo.type !== 'wifi'
          ) {
            Alert.alert(
              'Ne mogu da pustim radio.',
              'U podešavanjima ove aplikacije je uključena opcija "Slušaj live radio samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje radija i preko mobilnog interneta.',
            );
            return;
          }

          addTrack();
          await TrackPlayer.play();
          loadTrackUrlToCtx();
        } else if (
          !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
          !localStorage.getString('localProgressMap')
        ) {
          localStorage.set(
            'localProgressMap',
            JSON.stringify({[globalCtx.fileNameLoadedToTrackValue]: position}),
          );
          await TrackPlayer.reset();

          if (netInfo.isInternetReachable === false) {
            Alert.alert(
              'Ne mogu da pustim radio.',
              'Proveri internet konekciju.',
            );
            return;
          } else if (
            (localStorage.getBoolean('isWiFiOnlyEnabledForRadio') ===
              undefined ||
              localStorage.getBoolean('isWiFiOnlyEnabledForRadio') === true) &&
            netInfo.type !== 'wifi'
          ) {
            Alert.alert(
              'Ne mogu da pustim radio.',
              'U podešavanjima ove aplikacije je uključena opcija "Slušaj live radio samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje radija i preko mobilnog interneta.',
            );
            return;
          }

          addTrack();
          await TrackPlayer.play();
          loadTrackUrlToCtx();
        } else {
          await TrackPlayer.reset();

          addTrack();
        }
      }
    }
  };

  let streamInfoTitleToDisplay = 'Live Stream';
  let streamInfoArtistToDisplay = 'Radio Daško i Mlađa';
  if (
    playBackState === State.Playing &&
    globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
    listenersCountAutodj.trim() !== '0'
  ) {
    streamInfoTitleToDisplay = metaData.title || 'Live Stream';
    streamInfoArtistToDisplay = metaData.artist || 'Radio Daško i Mlađa';
  } else if (
    playBackState === State.Playing &&
    !globalCtx.fileNameLoadedToTrackValue.endsWith('stream')
  ) {
    streamInfoTitleToDisplay = 'Live Stream';
    streamInfoArtistToDisplay = 'Radio Daško i Mlađa';
  } else if (
    playBackState === State.Playing &&
    globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
    listenersCountAutodj.trim() === '0'
  ) {
    streamInfoTitleToDisplay = 'Live Stream';
    streamInfoArtistToDisplay = 'Radio Daško i Mlađa';
  }

  let iconName = 'play-circle-outline';
  if (
    playBackState === State.Playing &&
    globalCtx.fileNameLoadedToTrackValue.endsWith('stream')
  ) {
    iconName = 'stop-circle-outline';
  }

  let numberOfListenersValueToDisplay = '0';

  if ((listenersCountAutodj ? listenersCountAutodj.trim() : '0') === '0') {
    if ((listenersCountLive ? listenersCountLive.trim() : '0') === '0') {
      numberOfListenersValueToDisplay = listenersCountStream
        ? listenersCountStream.trim()
        : '0';
    } else {
      numberOfListenersValueToDisplay = listenersCountLive
        ? listenersCountLive.trim()
        : '0';
    }
  } else {
    numberOfListenersValueToDisplay = listenersCountAutodj
      ? listenersCountAutodj.trim()
      : '0';
  }

  const radioButtons = [
    {
      id: 'stream1',
      label: 'Stream 1',
      size: width > height ? 18 : 20,
      color:
        selectedId === 'stream1'
          ? colorSchemeObj[globalCtx.colorSchemeValue].light50
          : colorSchemeObj[globalCtx.colorSchemeValue].light30,
      labelStyle: {
        fontSize: width > height ? 13 : 14,
        color:
          selectedId === 'stream1'
            ? colorSchemeObj[globalCtx.colorSchemeValue].light50
            : colorSchemeObj[globalCtx.colorSchemeValue].light30,
      },
    },
    {
      id: 'stream2',
      label: 'Stream 2',
      size: width > height ? 18 : 20,
      color:
        selectedId === 'stream2'
          ? colorSchemeObj[globalCtx.colorSchemeValue].light50
          : colorSchemeObj[globalCtx.colorSchemeValue].light30,
      labelStyle: {
        fontSize: width > height ? 13 : 14,
        color:
          selectedId === 'stream2'
            ? colorSchemeObj[globalCtx.colorSchemeValue].light50
            : colorSchemeObj[globalCtx.colorSchemeValue].light30,
      },
    },
  ];

  const infoTextOnScreenContainerComponent = (
    <View style={styles.infoTextOnScreenContainer(width, height)}>
      <Text style={styles.textHeading1(globalCtx.colorSchemeValue)}>
        {streamInfoArtistToDisplay}
      </Text>

      {playBackState === State.Playing &&
        globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
        listenersCountAutodj.trim() !== '0' && (
          <Text style={styles.textHeading2(globalCtx.colorSchemeValue)}>
            Track Name:
          </Text>
        )}
      <Text
        style={styles.textContent(width, height, globalCtx.colorSchemeValue)}>
        {streamInfoTitleToDisplay}
      </Text>

      {/* {playBackState === State.Playing &&
        globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
        listenersCountAutodj.trim() !== '0' && (
          <Text style={styles.textHeading1(globalCtx.colorSchemeValue)}>
            Radio Daško i Mlađa
          </Text>
        )} */}
    </View>
  );

  const playButtonContainerComponent = (
    <View style={styles.playContainer(width, height)}>
      <View>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={async () => {
            if (selectedId === 'stream1') {
              localStorage.set('selectedStream', 'stream2');
              setSelectedId('stream2');

              if (
                playBackState === State.Playing &&
                !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
                localStorage.getString('localProgressMap')
              ) {
                const localStorageData = JSON.parse(
                  localStorage.getString('localProgressMap'),
                );
                localStorageData[globalCtx.fileNameLoadedToTrackValue] =
                  position;
                localStorage.set(
                  'localProgressMap',
                  JSON.stringify(localStorageData),
                );
              } else if (
                playBackState === State.Playing &&
                !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
                !localStorage.getString('localProgressMap')
              ) {
                localStorage.set(
                  'localProgressMap',
                  JSON.stringify({
                    [globalCtx.fileNameLoadedToTrackValue]: position,
                  }),
                );
              }

              await TrackPlayer.reset();
              addTrack();
            } else if (selectedId === 'stream2') {
              localStorage.set('selectedStream', 'stream1');
              setSelectedId('stream1');

              if (
                playBackState === State.Playing &&
                !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
                localStorage.getString('localProgressMap')
              ) {
                const localStorageData = JSON.parse(
                  localStorage.getString('localProgressMap'),
                );
                localStorageData[globalCtx.fileNameLoadedToTrackValue] =
                  position;
                localStorage.set(
                  'localProgressMap',
                  JSON.stringify(localStorageData),
                );
              } else if (
                playBackState === State.Playing &&
                !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
                !localStorage.getString('localProgressMap')
              ) {
                localStorage.set(
                  'localProgressMap',
                  JSON.stringify({
                    [globalCtx.fileNameLoadedToTrackValue]: position,
                  }),
                );
              }

              await TrackPlayer.reset();
              addTrack();
            }
          }}
          selectedId={selectedId}
          layout="row"
        />
      </View>
      <Pressable
        onPress={() => togglePlayback(playBackState)}
        style={({pressed}) => pressed && styles.pressedItem}>
        <IconMaterialCommunity
          style={styles.icon(globalCtx.colorSchemeValue)}
          name={iconName}
          size={80}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container(globalCtx.colorSchemeValue)}>
      <View style={styles.detailsContainer(width, height)}>
        <View style={styles.headsContainer(width)}>
          <FastImage
            style={{
              width: 70,
              height: 70,
            }}
            source={playBackState === State.Playing ? daSpin : daWobble}
            resizeMode={FastImage.resizeMode.cover}
          />

          {width > height && infoTextOnScreenContainerComponent}

          <IconMaterialCommunity
            style={styles.icon(globalCtx.colorSchemeValue)}
            name="radio"
            size={50}
          />

          {width > height && playButtonContainerComponent}

          <FastImage
            style={{
              width: 70,
              height: 70,
            }}
            source={playBackState === State.Playing ? mlSpin : mlWobble}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        {height > width && infoTextOnScreenContainerComponent}
      </View>

      {height > width && playButtonContainerComponent}

      <View style={styles.smsListenersCountContainer(width, height)}>
        <View style={styles.listenersCountContainer}>
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            Online slušalaca:
          </Text>
          <Text style={styles.textlistenersCount(globalCtx.colorSchemeValue)}>
            {numberOfListenersValueToDisplay}
          </Text>
        </View>

        <Pressable
          onPress={() => Linking.openURL('sms:+38166442266')}
          style={({pressed}) => pressed && styles.pressedItem}>
          <FontAwesome5
            style={styles.icon(globalCtx.colorSchemeValue)}
            name={'sms'}
            size={50}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Stream;

const styles = StyleSheet.create({
  container: colorScheme => {
    return {
      height: '100%',
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  detailsContainer: (screenWidth, screenHeight) => {
    return {
      flex: 3,
      width: screenWidth,
      alignItems: 'center',
      justifyContent: screenWidth > screenHeight ? 'center' : 'flex-start',
    };
  },
  playContainer: (screenWidth, screenHeight) => {
    return {
      flex: screenWidth > screenHeight ? 0 : 1,
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
    };
  },
  textContent: (screenWidth, screenHeight, colorScheme) => {
    return {
      fontSize: screenWidth > screenHeight ? 13 : 15,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'center',
    };
  },
  textHeading: colorScheme => {
    return {
      fontSize: 13,
      color: colorSchemeObj[colorScheme].light70,
      fontWeight: 'bold',
      marginTop: 10,
      fontFamily: 'sans-serif-thin',
    };
  },
  textHeading1: colorScheme => {
    return {
      fontSize: 15,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      marginTop: 10,
      fontFamily: 'sans-serif-condensed',
    };
  },
  textHeading2: colorScheme => {
    return {
      fontSize: 13,
      color: colorSchemeObj[colorScheme].light70,
      fontWeight: 'bold',
      marginTop: 20,
      fontFamily: 'sans-serif-thin',
    };
  },
  textlistenersCount: colorScheme => {
    return {
      fontSize: 13,
      color: colorSchemeObj[colorScheme].light70,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-thin',
    };
  },
  pressedItem: {
    opacity: 0.5,
  },
  smsListenersCountContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: screenWidth > screenHeight ? 0 : 5,
      paddingHorizontal: 5,
    };
  },
  listenersCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorLoadingContainer: (colorScheme, screenWidth) => {
    return {
      height: '100%',
      padding: 10,
      width: screenWidth,
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  headsContainer: screenWidth => {
    return {
      flexDirection: 'row',
      width: screenWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    };
  },
  infoTextOnScreenContainer: (screenWidth, screenHeight) => {
    return {
      alignItems: 'center',
      width: screenWidth > screenHeight ? screenWidth / 4 : screenWidth,
    };
  },
});
