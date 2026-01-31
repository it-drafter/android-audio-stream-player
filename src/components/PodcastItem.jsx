import React, {useState, memo, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import IconFeather from '@react-native-vector-icons/feather';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {useFocusEffect} from '@react-navigation/native';
import {localStorage} from '../util/http';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

function PodcastItem(props) {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const {t, i18n} = useTranslation();

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
    !props.url.toLowerCase().includes('unutrasnja_emigracija'.toLowerCase())
  ) {
    if (
      i18n.language === 'srp' ||
      i18n.language === 'hrv' ||
      i18n.language === 'mkd' ||
      i18n.language === 'deu'
    ) {
      podcastUploadInfo = (
        <Text style={styles.infoTextTitle(globalCtx.colorSchemeValue)}>
          {props.title}
          {'\n'}({t('days_ago')} {diffInDays}{' '}
          {diffInDays === 1 ||
          (diffInDays >= 21 &&
            diffInDays.toString()[diffInDays.toString().length - 1] === '1')
            ? t('day')
            : t('days')}
          )
        </Text>
      );
    } else {
      podcastUploadInfo = (
        <Text style={styles.infoTextTitle(globalCtx.colorSchemeValue)}>
          {props.title}
          {'\n'}({diffInDays}{' '}
          {diffInDays === 1 ||
          (diffInDays >= 21 &&
            diffInDays.toString()[diffInDays.toString().length - 1] === '1')
            ? t('day')
            : t('days')}{' '}
          {t('days_ago')})
        </Text>
      );
    }
  } else {
    let day;
    switch (true) {
      case props.pubDate.startsWith('Mon'):
        day = t('monday');
        break;
      case props.pubDate.startsWith('Tue'):
        day = t('tuesday');
        break;
      case props.pubDate.startsWith('Wed'):
        day = t('wednesday');
        break;
      case props.pubDate.startsWith('Thu'):
        day = t('thursday');
        break;
      case props.pubDate.startsWith('Fri'):
        day = t('friday');
        break;
      case props.pubDate.startsWith('Sat'):
        day = t('saturday');
        break;
      case props.pubDate.startsWith('Sun'):
        day = t('sunday');
        break;
      default:
        day = '';
        break;
    }

    let month;
    switch (props.pubDate.substring(8, 11)) {
      case 'Jan':
        month = t('january');
        break;
      case 'Feb':
        month = t('february');
        break;
      case 'Mar':
        month = t('march');
        break;
      case 'Apr':
        month = t('april');
        break;
      case 'May':
        month = t('may');
        break;
      case 'Jun':
        month = t('june');
        break;
      case 'Jul':
        month = t('july');
        break;
      case 'Aug':
        month = t('august');
        break;
      case 'Sep':
        month = t('september');
        break;
      case 'Oct':
        month = t('october');
        break;
      case 'Nov':
        month = t('november');
        break;
      case 'Dec':
        month = t('december');
        break;
      default:
        month = '';
        break;
    }

    podcastUploadInfo = (
      <Text style={styles.infoTextTitle(globalCtx.colorSchemeValue)}>
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
    !props.url.toLowerCase().includes('provizorni_'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !props.url.toLowerCase().includes('unutrasnja_emigracija'.toLowerCase()) &&
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
    !props.url.toLowerCase().includes('provizorni_'.toLowerCase()) &&
    !props.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()) &&
    !props.title
      .toLowerCase()
      .includes('Večernja škola rokenrola'.toLowerCase()) &&
    !props.url.toLowerCase().includes('unutrasnja_emigracija'.toLowerCase()) &&
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
      <LinearGradient
        colors={
          props.url.endsWith(lastPlayedPodcast)
            ? [
                colorSchemeObj[globalCtx.colorSchemeValue].dark40,
                colorSchemeObj[globalCtx.colorSchemeValue].light10,
              ]
            : [
                colorSchemeObj[globalCtx.colorSchemeValue].dark90,
                colorSchemeObj[globalCtx.colorSchemeValue].dark90,
              ]
        }
        style={[styles.podcastItem(globalCtx.colorSchemeValue, width, height)]}>
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
      </LinearGradient>
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
    opacity: 0.2,
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
  infoTextTitle: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      textAlignVertical: 'center',
      maxWidth: '70%',
    };
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
