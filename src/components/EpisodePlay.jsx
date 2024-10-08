import {
  StyleSheet,
  Text,
  View,
  Alert,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useCallback} from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import ControlCenter from './ControlCenter';
import GlobalContext from '../util/context';
import {useNetInfo} from '@react-native-community/netinfo';
import {localStorage} from '../util/http';
import FastImage from 'react-native-fast-image';
import {colorSchemeObj} from '../util/colors';

import daSwirl from '../assets/da-swirl.gif';
import mlSwirl from '../assets/ml-swirl.gif';
import daSpin from '../assets/da-spin.gif';
import mlSpin from '../assets/ml-spin.gif';
import artworkImgPodcast from '../assets/artwork-podcast.jpg';

const EpisodePlay = ({route}) => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const netInfo = useNetInfo();
  const playBackState = usePlaybackState().state;

  const [error, setError] = useState(null);
  const [isAlreadyDownloaded, setIsAlreadyDownloaded] = useState(false);
  const [fileSize, setFileSize] = useState(0);

  const fileNameArr = route.params.url.split('/');
  const fileName = fileNameArr[fileNameArr.length - 1];

  const filePath = `file://${RNFS.ExternalDirectoryPath}/${fileName}`;

  const IsThePodcastDownloaded = async () => {
    const folderContent = await RNFS.readdir(RNFS.ExternalDirectoryPath);
    setIsAlreadyDownloaded(folderContent.find(el => el === fileName));

    if (folderContent.find(el => el === fileName)) {
      const fileStats = await RNFS.stat(filePath);
      setFileSize((fileStats.size / 1000 / 1000).toFixed(2));
    }
  };

  useFocusEffect(
    useCallback(() => {
      IsThePodcastDownloaded();

      globalCtx.setSwipeEnabledValue(false);

      return () => globalCtx.setSwipeEnabledValue(true);
    }, []),
  );

  async function addTrack() {
    try {
      const folderContent = await RNFS.readdir(RNFS.ExternalDirectoryPath);

      const urlToLoad = folderContent.find(el => el === fileName)
        ? filePath
        : route.params.url;

      await TrackPlayer.add([
        {
          title: route.params.title,
          artist: route.params.description,
          url: urlToLoad,
          artwork: artworkImgPodcast,
          description: 'Radio Daško i Mlađa',
          album: 'D&M',
        },
      ]);
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return (
      <View style={styles.container(globalCtx.colorSchemeValue)}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const handleDownloadPress = () => {
    if (
      isAlreadyDownloaded &&
      !globalCtx.fileNameDownloadingValue[fileName]?.[0]
    ) {
      RNFS.unlink(filePath);

      setIsAlreadyDownloaded(false);
      setFileSize(0);

      return;
    }

    if (globalCtx.fileNameDownloadingValue[fileName]?.[0]) {
      RNFS.stopDownload(globalCtx.fileNameDownloadingValue[fileName]?.[1]);

      globalCtx.setfileNameDownloadingFn(prev => {
        return {...prev, [fileName]: [false, 0, 0, 1]};
      });

      setIsAlreadyDownloaded(false);

      IsThePodcastDownloaded();

      return;
    }

    if (netInfo.isInternetReachable === false) {
      Alert.alert(
        'Ne mogu da downloadujem podkast.',
        'Proveri internet konekciju.',
      );
      return;
    } else if (
      (localStorage.getBoolean('isWiFiOnlyEnabledForPodcastDownload') ===
        undefined ||
        localStorage.getBoolean('isWiFiOnlyEnabledForPodcastDownload') ===
          true) &&
      netInfo.type !== 'wifi'
    ) {
      Alert.alert(
        'Ne mogu da downloadujem podkast.',
        'U podešavanjima je uključena opcija "Downloaduj podkaste samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš download-ovanje podkasta i preko mobilnog interneta.',
      );
      return;
    }

    RNFS.downloadFile({
      fromUrl: route.params.url,
      toFile: filePath,
      progressInterval: 1000,
      progress: res => {
        globalCtx.setfileNameDownloadingFn(prev => {
          return {
            ...prev,
            [fileName]: [true, res.jobId, res.bytesWritten, res.contentLength],
          };
        });
      },
    })
      .promise.then(response => {
        globalCtx.setfileNameDownloadingFn(prev => {
          return {...prev, [fileName]: [false, response.jobId, 1, 1]};
        });
        setIsAlreadyDownloaded(true);
        IsThePodcastDownloaded();
      })
      .catch(err => {
        globalCtx.setfileNameDownloadingFn(prev => {
          return {...prev, [fileName]: [false, err.jobId, 0, 1]};
        });
      });
  };

  const publishDate = new Date(route.params.pubDate);
  const today = new Date();
  const diffInTime = today.getTime() - publishDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  let podcastUploadInfo;

  if (
    !route.params.title
      .toLowerCase()
      .includes('Sportski Pozdrav'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase())
  ) {
    podcastUploadInfo = (
      <Text style={styles.insignificantDetailsText(globalCtx.colorSchemeValue)}>
        (pre {diffInDays}{' '}
        {diffInDays === 1 ||
        (diffInDays >= 21 &&
          diffInDays.toString()[diffInDays.toString().length - 1] === '1')
          ? 'dan'
          : 'dana'}
        )
      </Text>
    );
  } else {
    let day;
    switch (true) {
      case route.params.pubDate.startsWith('Mon'):
        day = 'Ponedeljak';
        break;
      case route.params.pubDate.startsWith('Tue'):
        day = 'Utorak';
        break;
      case route.params.pubDate.startsWith('Wed'):
        day = 'Sreda';
        break;
      case route.params.pubDate.startsWith('Thu'):
        day = 'Četvrtak';
        break;
      case route.params.pubDate.startsWith('Fri'):
        day = 'Petak';
        break;
      case route.params.pubDate.startsWith('Sat'):
        day = 'Subota';
        break;
      case route.params.pubDate.startsWith('Sun'):
        day = 'Nedelja';
        break;
      default:
        day = '';
        break;
    }

    let month;
    switch (route.params.pubDate.substring(8, 11)) {
      case 'Jan':
        month = 'januar';
        break;
      case 'Feb':
        month = 'februar';
        break;
      case 'Mar':
        month = 'mart';
        break;
      case 'Apr':
        month = 'april';
        break;
      case 'May':
        month = 'maj';
        break;
      case 'Jun':
        month = 'jun';
        break;
      case 'Jul':
        month = 'jul';
        break;
      case 'Aug':
        month = 'avgust';
        break;
      case 'Sep':
        month = 'septembar';
        break;
      case 'Oct':
        month = 'oktobar';
        break;
      case 'Nov':
        month = 'novembar';
        break;
      case 'Dec':
        month = 'decembar';
        break;
      default:
        month = '';
        break;
    }

    podcastUploadInfo = (
      <Text style={styles.insignificantDetailsText(globalCtx.colorSchemeValue)}>
        {`(${day}, ${
          route.params.pubDate[5] !== '0'
            ? route.params.pubDate.substring(5, 7)
            : route.params.pubDate.substring(6, 7)
        }. ${month} ${route.params.pubDate.substring(12, 16)}.)`}
      </Text>
    );
  }

  let musicOnOffInfo;

  if (
    route.params.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Na ivici ofsajda'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Sportski Pozdrav'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Tople Ljucke Priče'.toLowerCase()) &&
    !route.params.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
    !route.params.description
      .toLowerCase()
      .includes('Puna Usta Poezije'.toLowerCase())
  ) {
    musicOnOffInfo = (
      <IconMaterialCommunity
        style={styles.icon(globalCtx.colorSchemeValue)}
        name="music-off"
        size={20}
      />
    );
  } else if (
    !route.params.title
      .toLowerCase()
      .includes('Sportski Pozdrav'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Tople Ljucke Priče'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Na ivici ofsajda'.toLowerCase()) &&
    !route.params.title
      .toLowerCase()
      .includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !route.params.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
    !route.params.description
      .toLowerCase()
      .includes('Puna Usta Poezije'.toLowerCase())
  ) {
    musicOnOffInfo = (
      <IconFeather
        style={styles.icon(globalCtx.colorSchemeValue)}
        name="music"
        size={20}
      />
    );
  }

  const iconPodcastComponent = (
    <IconMaterialCommunity
      style={styles.icon(globalCtx.colorSchemeValue)}
      name="podcast"
      size={40}
    />
  );

  const mainViewToDisplayComponent = (
    <View style={styles.container(globalCtx.colorSchemeValue, width, height)}>
      <View style={styles.headsContainer(width)}>
        <FastImage
          style={{
            width: 50,
            height: 50,
          }}
          source={playBackState === State.Playing ? daSpin : daSwirl}
          resizeMode={FastImage.resizeMode.cover}
        />

        {width > height ? (
          <ControlCenter
            addTrack={addTrack}
            trackInfoFromNav={route.params}
            isAlreadyDownloaded={isAlreadyDownloaded}
            fileNameFromNav={fileName}
            filePathFromNav={filePath}
          />
        ) : (
          iconPodcastComponent
        )}

        <FastImage
          style={{
            width: 50,
            height: 50,
          }}
          source={playBackState === State.Playing ? mlSpin : mlSwirl}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <Text style={styles.descriptionText(globalCtx.colorSchemeValue)}>
        {route.params?.description} {musicOnOffInfo}
      </Text>
      <Text style={styles.insignificantDetailsText(globalCtx.colorSchemeValue)}>
        {route.params?.title}
      </Text>
      {podcastUploadInfo}

      {width > height ? (
        iconPodcastComponent
      ) : (
        <ControlCenter
          addTrack={addTrack}
          trackInfoFromNav={route.params}
          isAlreadyDownloaded={isAlreadyDownloaded}
          fileNameFromNav={fileName}
          filePathFromNav={filePath}
        />
      )}

      <View style={styles.downloadStuffContainer}>
        <Pressable
          onPressOut={handleDownloadPress}
          style={({pressed}) => [
            pressed && styles.pressedItem,
            {
              backgroundColor: globalCtx.fileNameDownloadingValue[fileName]?.[0]
                ? colorSchemeObj[globalCtx.colorSchemeValue].base
                : colorSchemeObj[globalCtx.colorSchemeValue].dark10,
            },
            styles.button(width, height),
          ]}>
          <IconMaterialCommunity
            style={styles.iconButton(globalCtx.colorSchemeValue)}
            name={
              isAlreadyDownloaded &&
              !globalCtx.fileNameDownloadingValue[fileName]?.[0]
                ? 'delete'
                : isAlreadyDownloaded &&
                  globalCtx.fileNameDownloadingValue[fileName]?.[0]
                ? 'cancel'
                : 'download'
            }
            size={25}
          />

          <Text style={styles.buttonText(globalCtx.colorSchemeValue)}>
            {globalCtx.fileNameDownloadingValue[fileName]?.[0]
              ? 'Otkaži download'
              : isAlreadyDownloaded
              ? 'Obriši podkast iz memorije'
              : 'Preuzmi za offline preslušavanje'}
          </Text>
        </Pressable>

        {isAlreadyDownloaded &&
          !globalCtx.fileNameDownloadingValue[fileName]?.[0] && (
            <View style={styles.downloadedInfo}>
              <IconMaterialCommunity
                style={styles.icon(globalCtx.colorSchemeValue)}
                name="database"
                size={30}
              />
              <Text
                style={styles.downloadStuffText(globalCtx.colorSchemeValue)}>
                {fileSize} MB
              </Text>
            </View>
          )}

        {globalCtx.fileNameDownloadingValue[fileName]?.[0] && (
          <Text
            style={styles.downloadStuffText(globalCtx.colorSchemeValue)}>{`${(
            globalCtx.fileNameDownloadingValue[fileName]?.[2] / 1000000
          )
            .toFixed(2)
            .toString()} / ${(
            globalCtx.fileNameDownloadingValue[fileName]?.[3] / 1000000
          )
            .toFixed(2)
            .toString()} MB`}</Text>
        )}

        {globalCtx.fileNameDownloadingValue[fileName]?.[0] && (
          <Progress.Bar
            progress={
              globalCtx.fileNameDownloadingValue[fileName]?.[2] /
              globalCtx.fileNameDownloadingValue[fileName]?.[3]
            }
            width={200}
            borderColor={colorSchemeObj[globalCtx.colorSchemeValue].dark10}
            color={colorSchemeObj[globalCtx.colorSchemeValue].dark10}
          />
        )}
      </View>
    </View>
  );

  if (width > height) {
    return (
      <ScrollView contentContainerStyle={styles.wrapper}>
        {mainViewToDisplayComponent}
      </ScrollView>
    );
  } else {
    return <>{mainViewToDisplayComponent}</>;
  }
};

export default EpisodePlay;

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
  },
  container: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent:
        screenWidth > screenHeight ? 'flex-start' : 'space-evenly',
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  headsContainer: screenWidth => {
    return {
      flexDirection: 'row',
      width: screenWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    };
  },
  descriptionText: colorScheme => {
    return {
      marginBottom: 5,
      marginTop: 5,
      textAlign: 'center',
      fontFamily: 'sans-serif-condensed',
      color: colorSchemeObj[colorScheme].light70,
      fontSize: 15,
      fontWeight: 'bold',
    };
  },
  insignificantDetailsText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light80,
      textAlign: 'center',
      fontFamily: 'sans-serif-thin',
      fontWeight: 'bold',
      fontSize: 13,
      marginVertical: 5,
    };
  },
  downloadedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginVertical: 5,
    };
  },
  button: (screenWidth, screenHeight) => {
    return {
      padding: 8,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      flexDirection: 'row',
      width: screenWidth > screenHeight ? screenHeight - 90 : screenWidth - 90,
    };
  },
  buttonText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      fontFamily: 'sans-serif-medium',
    };
  },
  iconButton: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      marginRight: 10,
    };
  },
  downloadStuffContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  downloadStuffText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light80,
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: 11,
    };
  },
  pressedItem: {
    opacity: 0.5,
  },
});
