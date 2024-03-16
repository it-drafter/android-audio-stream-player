import React, {useState, memo, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import {useFocusEffect} from '@react-navigation/native';
import {localStorage} from '../util/http';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';

function PodcastItem(props) {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);

  const handlePressPodcastItem = () => {
    props.navigation.navigate('EpisodePlay', {
      title: props.title,
      description: props.description,
      url: props.url,
      duration: props.duration,
      pubDate: props.pubDate,
    });
  };

  const [isAlreadyDownloaded, setIsAlreadyDownloaded] = useState(false);
  const [lastPlayedPodcast, setLastPlayedPodcast] = useState('');

  const fileNameArr = props.url.split('/');
  const fileName = fileNameArr[fileNameArr.length - 1];

  const IsThePodcastDownloaded = async () => {
    const folderContent = await RNFS.readdir(RNFS.ExternalDirectoryPath);
    setIsAlreadyDownloaded(folderContent.find(el => el === fileName));
  };

  useFocusEffect(
    useCallback(() => {
      IsThePodcastDownloaded();
      setLastPlayedPodcast(localStorage.getString('lastPlayedPodcast'));
    }, []),
  );

  const publishDate = new Date(props.pubDate);
  const today = new Date();
  const diffInTime = today.getTime() - publishDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  let podcastUploadInfo;

  if (
    !props.title.toLowerCase().includes('Sportski Pozdrav'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Tople Ljucke Priče'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Unutrasnja emigracija'.toLowerCase())
  ) {
    podcastUploadInfo = (
      <Text style={styles.infoText(globalCtx.colorSchemeValue)}>
        {props.title}
        {'\n'}(pre {diffInDays}{' '}
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
      case props.pubDate.startsWith('Mon'):
        day = 'Ponedeljak';
        break;
      case props.pubDate.startsWith('Tue'):
        day = 'Utorak';
        break;
      case props.pubDate.startsWith('Wed'):
        day = 'Sreda';
        break;
      case props.pubDate.startsWith('Thu'):
        day = 'Četvrtak';
        break;
      case props.pubDate.startsWith('Fri'):
        day = 'Petak';
        break;
      case props.pubDate.startsWith('Sat'):
        day = 'Subota';
        break;
      case props.pubDate.startsWith('Sun'):
        day = 'Nedelja';
        break;
      default:
        day = '';
        break;
    }

    let month;
    switch (props.pubDate.substring(8, 11)) {
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
      <Text style={styles.infoText(globalCtx.colorSchemeValue)}>
        {props.title}
        {'\n'}
        {`(${day}, ${
          props.pubDate[5] !== '0'
            ? props.pubDate.substring(5, 7)
            : props.pubDate.substring(6, 7)
        }. ${month} ${props.pubDate.substring(12, 16)}.)`}
      </Text>
    );
  }

  let musicOnOffInfo;

  if (
    props.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Unutrasnja emigracija'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Sportski Pozdrav'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Tople Ljucke Priče'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
    !props.description
      .toLowerCase()
      .includes('Puna Usta Poezije'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase())
  ) {
    musicOnOffInfo = (
      <Text
        style={[
          styles.infoText(globalCtx.colorSchemeValue),
          styles.musicOffOn,
        ]}>
        <IconMaterialCommunity
          style={styles.icon(globalCtx.colorSchemeValue)}
          name="music-off"
          size={20}
        />
      </Text>
    );
  } else if (
    !props.title.toLowerCase().includes('Sportski Pozdrav'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Tople Ljucke Priče'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Unutrasnja emigracija'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
    !props.description
      .toLowerCase()
      .includes('Puna Usta Poezije'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase())
  ) {
    musicOnOffInfo = (
      <Text
        style={[
          styles.infoText(globalCtx.colorSchemeValue),
          styles.musicOffOn,
        ]}>
        <IconFeather
          style={styles.icon(globalCtx.colorSchemeValue)}
          name="music"
          size={20}
        />
      </Text>
    );
  }

  return (
    <Pressable
      android_ripple={{
        color: colorSchemeObj[globalCtx.colorSchemeValue].light70,
      }}
      style={({pressed}) => pressed && styles.pressedItem}
      onPress={handlePressPodcastItem}>
      <View
        style={[
          styles.podcastItem(globalCtx.colorSchemeValue, width, height),
          {
            backgroundColor: props.url.endsWith(lastPlayedPodcast)
              ? colorSchemeObj[globalCtx.colorSchemeValue].dark40
              : colorSchemeObj[globalCtx.colorSchemeValue].dark90,
          },
        ]}>
        <View>
          <Text style={styles.nameText(globalCtx.colorSchemeValue)}>
            {props.description}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          {podcastUploadInfo}

          <View style={styles.detailsContainer}>
            <Text style={styles.infoText(globalCtx.colorSchemeValue)}>
              {isAlreadyDownloaded ? (
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name="database"
                  size={20}
                />
              ) : (
                ''
              )}
            </Text>

            {musicOnOffInfo}

            <Text style={styles.infoText(globalCtx.colorSchemeValue)}>
              {props.duration}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(PodcastItem);

const styles = StyleSheet.create({
  podcastItem: (colorScheme, screenWidth, screenHeight) => {
    return {
      height: 100,
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      padding: 5,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colorSchemeObj[colorScheme].light40,
    };
  },
  pressedItem: {
    opacity: 0.5,
  },
  pressableContainer: {
    height: 100,
  },
  nameText: colorScheme => {
    return {
      marginBottom: 8,
      color: colorSchemeObj[colorScheme].light80,
      fontSize: 18,
      fontWeight: '800',
    };
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      textAlignVertical: 'center',
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
    };
  },
  musicOffOn: {
    marginHorizontal: 5,
  },
});
