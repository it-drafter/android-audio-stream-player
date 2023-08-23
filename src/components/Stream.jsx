import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  useWindowDimensions,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
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
  const playBackState = usePlaybackState();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState({});
  const [listenersCountAutodj, setListenersCountAutodj] =
    useState('nedostupno');
  const [listenersCountLive, setListenersCountLive] = useState('nedostupno');
  const [listenersCountStream, setListenersCountStream] =
    useState('nedostupno');

  async function addTrack() {
    try {
      setError(null);
      await TrackPlayer.add([
        {
          id: 'stream',
          title: 'Live Stream',
          artist: 'Daško i Mlađa',
          url: 'https://stream.daskoimladja.com:9000/stream',
          artwork: artworkImgStream,
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
      Event.PlaybackMetadataReceived,

      async params => {
        setMetaData({
          title: params?.title,
          artist: params?.artist,
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
    const currentTrack = await TrackPlayer.getCurrentTrack();

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
  let streamInfoArtistToDisplay = 'Daško i Mlađa';
  if (
    playBackState === State.Playing &&
    globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
    listenersCountAutodj.trim() !== '0'
  ) {
    streamInfoTitleToDisplay = metaData.title || 'Live Stream';
    streamInfoArtistToDisplay = metaData.artist || 'Daško i Mlađa';
  } else if (
    playBackState === State.Playing &&
    !globalCtx.fileNameLoadedToTrackValue.endsWith('stream')
  ) {
    streamInfoTitleToDisplay = 'Live Stream';
    streamInfoArtistToDisplay = 'Daško i Mlađa';
  } else if (
    playBackState === State.Playing &&
    globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
    listenersCountAutodj.trim() === '0'
  ) {
    streamInfoTitleToDisplay = 'Live Stream';
    streamInfoArtistToDisplay = 'Daško i Mlađa';
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

  const infoTextOnScreenContainerComponent = (
    <View style={styles.infoTextOnScreenContainer(width, height)}>
      {playBackState === State.Playing &&
        globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
        listenersCountAutodj.trim() !== '0' && (
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            Track Name:
          </Text>
        )}
      <Text
        style={styles.textContent(width, height, globalCtx.colorSchemeValue)}>
        {streamInfoTitleToDisplay}
      </Text>

      {playBackState === State.Playing &&
        globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
        listenersCountAutodj.trim() !== '0' && (
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            Artist:
          </Text>
        )}
      <Text
        style={styles.textContent(width, height, globalCtx.colorSchemeValue)}>
        {streamInfoArtistToDisplay}
      </Text>
    </View>
  );

  const playButtonContainerComponent = (
    <View style={styles.playContainer(width, height)}>
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

      <View style={styles.smsListenersCountContainer(width)}>
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
  smsListenersCountContainer: screenWidth => {
    return {
      width: screenWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 5,
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
