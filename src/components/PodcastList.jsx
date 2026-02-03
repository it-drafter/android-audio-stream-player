import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Alert,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useCallback, useContext, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import IconFeather from '@react-native-vector-icons/feather';
import IconEntypo from '@react-native-vector-icons/entypo';
import IconFontAwesome from '@react-native-vector-icons/fontawesome';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import {fetchRecentEpisodes} from '../util/http';
import {fetchAllEpisodes} from '../util/http';
import {localStorage} from '../util/http';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';

import PodcastItem from './PodcastItem';
import Loading from './Loading';
import PodcastListHint from './PodcastListHint';

const PodcastList = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const netInfo = useNetInfo();
  const {t, i18n} = useTranslation();
  const flatListRef = useRef(null);
  const hasAutoScrolled = useRef(false);
  const lastPlayedPodcastName = localStorage.getString('lastPlayedPodcast');

  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [fetchedEpisodes, setFetchedEpisodes] = useState(() => {
    try {
      const stored = localStorage.getString('episodes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [userRefreshed, setUserRefreshed] = useState(false);

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [listMode, setListMode] = useState(
    localStorage.getString('podcastListMode'),
  );

  const [isCheckedAlarmSaMuzikom, setIsCheckedAlarmSaMuzikom] = useState(
    localStorage.getBoolean('isCheckedAlarmSaMuzikom') === undefined ||
      localStorage.getBoolean('isCheckedAlarmSaMuzikom') === true
      ? true
      : false,
  );
  const [isCheckedAlarmBezMuzike, setIsCheckedAlarmBezMuzike] = useState(
    localStorage.getBoolean('isCheckedAlarmBezMuzike') === undefined ||
      localStorage.getBoolean('isCheckedAlarmBezMuzike') === true
      ? true
      : false,
  );
  const [isCheckedUnutrasnjaEmigracija, setIsCheckedUnutrasnjaEmigracija] =
    useState(
      localStorage.getBoolean('isCheckedUnutrasnjaEmigracija') === undefined ||
        localStorage.getBoolean('isCheckedUnutrasnjaEmigracija') === true
        ? true
        : false,
    );
  // const [
  //   isCheckedProvizorniPodnevniProgram,
  //   setIsCheckedProvizorniPodnevniProgram,
  // ] = useState(
  //   localStorage.getBoolean('isCheckedProvizorniPodnevniProgram') ===
  //     undefined ||
  //     localStorage.getBoolean('isCheckedProvizorniPodnevniProgram') === true
  //     ? true
  //     : false,
  // );
  const [isCheckedVecernjaSkolaRokenrola, setIsCheckedVecernjaSkolaRokenrola] =
    useState(
      localStorage.getBoolean('isCheckedVecernjaSkolaRokenrola') ===
        undefined ||
        localStorage.getBoolean('isCheckedVecernjaSkolaRokenrola') === true
        ? true
        : false,
    );
  const [isCheckedNepopularnoMisljenje, setIsCheckedNepopularnoMisljenje] =
    useState(
      localStorage.getBoolean('isCheckedNepopularnoMisljenje') === undefined ||
        localStorage.getBoolean('isCheckedNepopularnoMisljenje') === true
        ? true
        : false,
    );
  const [isCheckedLjudiIzPodzemlja, setIsCheckedLjudiIzPodzemlja] = useState(
    localStorage.getBoolean('isCheckedLjudiIzPodzemlja') === undefined ||
      localStorage.getBoolean('isCheckedLjudiIzPodzemlja') === true
      ? true
      : false,
  );
  const [isCheckedSportskiPozdrav, setIsCheckedSportskiPozdrav] = useState(
    localStorage.getBoolean('isCheckedSportskiPozdrav') === undefined ||
      localStorage.getBoolean('isCheckedSportskiPozdrav') === true
      ? true
      : false,
  );
  const [isCheckedTopleLjuckePrice, setIsCheckedTopleLjuckePrice] = useState(
    localStorage.getBoolean('isCheckedTopleLjuckePrice') === undefined ||
      localStorage.getBoolean('isCheckedTopleLjuckePrice') === true
      ? true
      : false,
  );
  const [isCheckedRastrojavanje, setIsCheckedRastrojavanje] = useState(
    localStorage.getBoolean('isCheckedRastrojavanje') === undefined ||
      localStorage.getBoolean('isCheckedRastrojavanje') === true
      ? true
      : false,
  );
  // const [isCheckedPunaUstaPoezije, setIsCheckedPunaUstaPoezije] = useState(
  //   localStorage.getBoolean('isCheckedPunaUstaPoezije') === undefined ||
  //     localStorage.getBoolean('isCheckedPunaUstaPoezije') === true
  //     ? true
  //     : false,
  // );
  const [isCheckedNaIviciOfsajda, setIsCheckedNaIviciOfsajda] = useState(
    localStorage.getBoolean('isCheckedNaIviciOfsajda') === undefined ||
      localStorage.getBoolean('isCheckedNaIviciOfsajda') === true
      ? true
      : false,
  );

  const fetchedEpisodesOnlyAlarmSaMuzikom = [
    ...fetchedEpisodes.filter(
      episode =>
        !episode.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
        !episode.url
          .toLowerCase()
          .includes('unutrasnja_emigracija'.toLowerCase()) &&
        !episode.url.toLowerCase().includes('provizorni_'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Večernja škola rokenrola'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Nepopularno mi'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Ljudi iz podzemlja'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Sportski Pozdrav'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Tople Ljucke Pri'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
        // && !episode.artist
        //   .toLowerCase()
        //   .includes('Puna Usta Poezije'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyAlarmBezMuzike = [
    ...fetchedEpisodes.filter(
      episode =>
        episode.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
        !episode.url
          .toLowerCase()
          .includes('unutrasnja_emigracija'.toLowerCase()) &&
        !episode.url.toLowerCase().includes('provizorni_'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Večernja škola rokenrola'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Nepopularno mi'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Ljudi iz podzemlja'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Sportski Pozdrav'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Tople Ljucke Pri'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()) &&
        // && !episode.artist
        //   .toLowerCase()
        //   .includes('Puna Usta Poezije'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyUnutrasnjaEmigracija = [
    ...fetchedEpisodes.filter(
      episode =>
        episode.url
          .toLowerCase()
          .includes('unutrasnja_emigracija'.toLowerCase()) ||
        episode.url.toLowerCase().includes('provizorni_'.toLowerCase()),
    ),
  ];

  // const fetchedEpisodesOnlyProvizorniPodnevniProgram = [
  //   ...fetchedEpisodes.filter(episode =>
  //     episode.url.toLowerCase().includes('provizorni_'.toLowerCase()),
  //   ),
  // ];

  const fetchedEpisodesOnlyVecernjaSkolaRokenrola = [
    ...fetchedEpisodes.filter(episode =>
      episode.title
        .toLowerCase()
        .includes('Večernja škola rokenrola'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyNepopularnoMisljenje = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Nepopularno mi'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyLjudiIzPodzemlja = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlySportskiPozdrav = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Sportski Pozdrav'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyTopleLjuckePrice = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Tople Ljucke Pri'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyRastrojavanje = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()),
    ),
  ];

  // const fetchedEpisodesOnlyPunaUstaPoezije = [
  //   ...fetchedEpisodes.filter(episode =>
  //     episode.artist.toLowerCase().includes('Puna Usta Poezije'.toLowerCase()),
  //   ),
  // ];

  const fetchedEpisodesOnlyNaIviciOfsajda = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesUnsorted = [];

  isCheckedAlarmSaMuzikom &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyAlarmSaMuzikom);
  isCheckedAlarmBezMuzike &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyAlarmBezMuzike);
  isCheckedUnutrasnjaEmigracija &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyUnutrasnjaEmigracija);
  // isCheckedProvizorniPodnevniProgram &&
  //   fetchedEpisodesUnsorted.push(
  //     ...fetchedEpisodesOnlyProvizorniPodnevniProgram,
  //   );
  isCheckedVecernjaSkolaRokenrola &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyVecernjaSkolaRokenrola);
  isCheckedNepopularnoMisljenje &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyNepopularnoMisljenje);
  isCheckedLjudiIzPodzemlja &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyLjudiIzPodzemlja);
  isCheckedSportskiPozdrav &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlySportskiPozdrav);
  isCheckedTopleLjuckePrice &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyTopleLjuckePrice);
  isCheckedRastrojavanje &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyRastrojavanje);
  // isCheckedPunaUstaPoezije &&
  //   fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyPunaUstaPoezije);
  isCheckedNaIviciOfsajda &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyNaIviciOfsajda);

  const fetchedEpisodesToDisplay = fetchedEpisodesUnsorted.sort((a, b) => {
    let da = new Date(a.pubDate),
      db = new Date(b.pubDate);
    return db - da;
  });

  const onRefresh = async () => {
    if (netInfo.isInternetReachable === false) {
      Alert.alert(
        t('podcast_list_error_title'),
        t('podcast_list_error_check_internet'),
      );
      return;
    }

    setIsRefreshing(true);
    setError(null);
    try {
      let episodes;
      if (
        localStorage.getString('podcastListMode') === undefined ||
        localStorage.getString('podcastListMode') === 'recent'
      ) {
        episodes = await fetchRecentEpisodes();
        if (localStorage.getString('podcastListMode') === undefined) {
          localStorage.set('podcastListMode', 'recent');
          setListMode('recent');
        }
      } else if (localStorage.getString('podcastListMode') === 'all') {
        episodes = await fetchAllEpisodes();
      }
      localStorage.set('episodes', JSON.stringify(episodes));
      const jsonFetchedEpisodes = localStorage.getString('episodes');
      const fetchedEpisodesFromStorage = JSON.parse(jsonFetchedEpisodes);
      setFetchedEpisodes(fetchedEpisodesFromStorage);
    } catch (error) {
      setError(error);
    }
    setIsRefreshing(false);
    setUserRefreshed(true);
  };

  useFocusEffect(
    useCallback(() => {
      const jsonFetchedEpisodes = localStorage.getString('episodes');

      if (jsonFetchedEpisodes) {
        const fetchedEpisodesFromStorage = JSON.parse(jsonFetchedEpisodes);
        setFetchedEpisodes(fetchedEpisodesFromStorage);
      } else {
        onRefresh();
      }

      return () => {
        setUserRefreshed(false);
      };
    }, []),
  );

  const scrollToLastPlayed = useCallback(
    (animated = true) => {
      if (
        isRefreshing ||
        !lastPlayedPodcastName ||
        fetchedEpisodesToDisplay.length === 0
      ) {
        return;
      }

      const index = fetchedEpisodesToDisplay.findIndex(ep =>
        ep.url.endsWith(lastPlayedPodcastName),
      );

      if (index === -1) return;

      flatListRef.current?.scrollToIndex({
        index,
        animated,
      });
    },
    [isRefreshing, lastPlayedPodcastName, fetchedEpisodesToDisplay],
  );

  useFocusEffect(
    useCallback(() => {
      let timeout1;

      if (hasAutoScrolled.current) {
        return;
      }

      timeout1 = setTimeout(() => {
        scrollToLastPlayed(true);
      }, 50);

      hasAutoScrolled.current = true;

      return () => {
        clearTimeout(timeout1);
        hasAutoScrolled.current = false;
      };
    }, [scrollToLastPlayed]),
  );

  if (isRefreshing) {
    return (
      <View
        style={[styles.container(globalCtx.colorSchemeValue), styles.loading]}>
        <Loading />
      </View>
    );
  }

  const renderItem = episode => {
    return (
      <PodcastItem
        title={episode.item.title}
        description={episode.item.artist}
        url={episode.item.url}
        duration={episode.item.duration}
        pubDate={episode.item.pubDate}
        navigation={navigation}
      />
    );
  };

  const getItemLayout = (_, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const listModeButtons = (
    <View style={styles.listModeButtonsContainer}>
      <Pressable
        style={({pressed}) => [
          pressed && styles.pressedItem,
          listMode === 'recent' &&
            styles.listModeButtonActive(globalCtx.colorSchemeValue),
          styles.listModeButton(globalCtx.colorSchemeValue),
        ]}
        onPress={() => {
          localStorage.set('podcastListMode', 'recent');
          setListMode('recent');
          onRefresh();
        }}>
        <Text style={[styles.regularText(globalCtx.colorSchemeValue)]}>
          {t('podcast_list_button_recent_podcasts')}
        </Text>
      </Pressable>

      <Pressable
        style={({pressed}) => [
          pressed && styles.pressedItem,
          listMode === 'all' &&
            styles.listModeButtonActive(globalCtx.colorSchemeValue),
          styles.listModeButton(globalCtx.colorSchemeValue),
        ]}
        onPress={() => {
          localStorage.set('podcastListMode', 'all');
          setListMode('all');
          onRefresh();
        }}>
        <Text style={[styles.regularText(globalCtx.colorSchemeValue)]}>
          {t('podcast_list_button_all_podcasts')}
        </Text>
      </Pressable>
    </View>
  );

  const onScrollToIndexFailed = info => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    }, 100);
  };

  const flatListFetchedEpisodesToDisplay = (
    <FlatList
      ref={flatListRef}
      data={fetchedEpisodesToDisplay}
      renderItem={renderItem}
      keyExtractor={item => {
        return item.url;
      }}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      extraData={fetchedEpisodesToDisplay}
      contentContainerStyle={styles.containerFlatList(
        globalCtx.colorSchemeValue,
      )}
      initialNumToRender={30}
      maxToRenderPerBatch={10}
      windowSize={24}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );

  const iconScrollingArrowUp = (
    <IconEntypo
      style={styles.iconArrowScrolling(globalCtx.colorSchemeValue)}
      name="chevron-up"
      size={30}
    />
  );

  const iconLastPlayed = (
    <IconEntypo
      style={styles.iconArrowScrolling(globalCtx.colorSchemeValue)}
      name="dot-single"
      size={26}
    />
  );

  const iconScrollingArrowDown = (
    <IconEntypo
      style={styles.iconArrowScrolling(globalCtx.colorSchemeValue)}
      name="chevron-down"
      size={30}
    />
  );

  return (
    <View style={styles.container(globalCtx.colorSchemeValue)}>
      <LinearGradient
        colors={[
          colorSchemeObj[globalCtx.colorSchemeValue].dark40,
          colorSchemeObj[globalCtx.colorSchemeValue].light10,
        ]}
        style={styles.tipsContainer(globalCtx.colorSchemeValue)}>
        {error ? (
          <Text style={styles.errorText(globalCtx.colorSchemeValue, width)}>
            {t('podcast_list_error_server')}
          </Text>
        ) : userRefreshed ? (
          <Text style={styles.successText(globalCtx.colorSchemeValue, width)}>
            {t('podcast_list_update_success')}
          </Text>
        ) : (
          <PodcastListHint colorScheme={globalCtx.colorSchemeValue} t={t} />
        )}
      </LinearGradient>
      {fetchedEpisodesToDisplay.length !== 0 && (
        <View style={styles.filterButtonContainer}>
          <Pressable
            onPress={() => setIsOpenFilter(!isOpenFilter)}
            style={({pressed}) => pressed && styles.pressedItem}>
            <View style={styles.filterIconsContainer}>
              {isOpenFilter ? (
                <IconFontAwesome
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name="filter"
                  size={25}
                />
              ) : (
                <IconFeather
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name="filter"
                  size={25}
                />
              )}
              <IconFeather
                style={styles.icon(globalCtx.colorSchemeValue)}
                name={isOpenFilter ? 'chevron-up' : 'chevron-down'}
                size={22}
              />
            </View>
          </Pressable>
        </View>
      )}
      {isOpenFilter && (
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxColumn}>
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_alarm_music')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedAlarmSaMuzikom
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedAlarmSaMuzikom}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedAlarmSaMuzikom',
                  !isCheckedAlarmSaMuzikom,
                );

                setIsCheckedAlarmSaMuzikom(!isCheckedAlarmSaMuzikom);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_alarm_no_music')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedAlarmBezMuzike
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedAlarmBezMuzike}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedAlarmBezMuzike',
                  !isCheckedAlarmBezMuzike,
                );

                setIsCheckedAlarmBezMuzike(!isCheckedAlarmBezMuzike);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_emigration')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedUnutrasnjaEmigracija
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedUnutrasnjaEmigracija}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedUnutrasnjaEmigracija',
                  !isCheckedUnutrasnjaEmigracija,
                );

                setIsCheckedUnutrasnjaEmigracija(
                  !isCheckedUnutrasnjaEmigracija,
                );
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            {/* <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_ppp')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedProvizorniPodnevniProgram
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedProvizorniPodnevniProgram}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedProvizorniPodnevniProgram',
                  !isCheckedProvizorniPodnevniProgram,
                );
                setIsCheckedProvizorniPodnevniProgram(
                  !isCheckedProvizorniPodnevniProgram,
                );
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            /> */}
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_school')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize:
                  i18n.language === 'jpn'
                    ? 7
                    : i18n.language === 'deu'
                    ? 11
                    : 13,
                color: isCheckedVecernjaSkolaRokenrola
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedVecernjaSkolaRokenrola}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedVecernjaSkolaRokenrola',
                  !isCheckedVecernjaSkolaRokenrola,
                );

                setIsCheckedVecernjaSkolaRokenrola(
                  !isCheckedVecernjaSkolaRokenrola,
                );
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_unpopular_opinion')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedNepopularnoMisljenje
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedNepopularnoMisljenje}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedNepopularnoMisljenje',
                  !isCheckedNepopularnoMisljenje,
                );

                setIsCheckedNepopularnoMisljenje(
                  !isCheckedNepopularnoMisljenje,
                );
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
          </View>
          <View style={styles.checkboxColumn}>
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_underground')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize:
                  i18n.language === 'jpn'
                    ? 10
                    : i18n.language === 'deu'
                    ? 11
                    : 13,
                color: isCheckedLjudiIzPodzemlja
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedLjudiIzPodzemlja}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedLjudiIzPodzemlja',
                  !isCheckedLjudiIzPodzemlja,
                );
                setIsCheckedLjudiIzPodzemlja(!isCheckedLjudiIzPodzemlja);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_sports')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedSportskiPozdrav
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedSportskiPozdrav}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedSportskiPozdrav',
                  !isCheckedSportskiPozdrav,
                );

                setIsCheckedSportskiPozdrav(!isCheckedSportskiPozdrav);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_stories')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: i18n.language === 'deu' ? 10 : 13,
                color: isCheckedTopleLjuckePrice
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedTopleLjuckePrice}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedTopleLjuckePrice',
                  !isCheckedTopleLjuckePrice,
                );

                setIsCheckedTopleLjuckePrice(!isCheckedTopleLjuckePrice);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_disruption')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedRastrojavanje
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedRastrojavanje}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedRastrojavanje',
                  !isCheckedRastrojavanje,
                );

                setIsCheckedRastrojavanje(!isCheckedRastrojavanje);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
            {/* <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Puna usta poezije"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedPunaUstaPoezije
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedPunaUstaPoezije}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedPunaUstaPoezije',
                  !isCheckedPunaUstaPoezije,
                );

                setIsCheckedPunaUstaPoezije(!isCheckedPunaUstaPoezije);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            /> */}
            <BouncyCheckbox
              size={width > height ? 17 : 20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text={t('podcast_list_filter_offside')}
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: width > height ? 13 : 14,
                color: isCheckedNaIviciOfsajda
                  ? colorSchemeObj[globalCtx.colorSchemeValue].light50
                  : colorSchemeObj[globalCtx.colorSchemeValue].light30,
              }}
              isChecked={isCheckedNaIviciOfsajda}
              disableBuiltInState
              onPress={() => {
                localStorage.set(
                  'isCheckedNaIviciOfsajda',
                  !isCheckedNaIviciOfsajda,
                );

                setIsCheckedNaIviciOfsajda(!isCheckedNaIviciOfsajda);
              }}
              textContainerStyle={{
                marginLeft: 5,
              }}
              style={{marginTop: 7}}
            />
          </View>
        </View>
      )}

      <>
        {listModeButtons}
        {flatListFetchedEpisodesToDisplay}
      </>

      <View style={styles.startEndArrowsContainer(width, height)}>
        <Pressable
          onPress={scrollToTop}
          style={({pressed}) => [
            pressed && styles.pressedItem,
            styles.startEndArrow(globalCtx.colorSchemeValue, width, height),
          ]}>
          {iconScrollingArrowUp}
        </Pressable>

        {lastPlayedPodcastName &&
          fetchedEpisodesToDisplay.length > 0 &&
          fetchedEpisodesToDisplay.some(episode =>
            episode.url.includes(lastPlayedPodcastName),
          ) && (
            <Pressable
              onPress={() => scrollToLastPlayed(true)}
              style={({pressed}) => [
                pressed && styles.pressedItem,
                styles.startEndArrow(globalCtx.colorSchemeValue, width, height),
              ]}>
              {iconLastPlayed}
            </Pressable>
          )}

        <Pressable
          onPress={scrollToBottom}
          style={({pressed}) => [
            pressed && styles.pressedItem,
            styles.startEndArrow(globalCtx.colorSchemeValue, width, height),
          ]}>
          {iconScrollingArrowDown}
        </Pressable>
      </View>
    </View>
  );
};

export default PodcastList;

const styles = StyleSheet.create({
  container: colorScheme => {
    return {
      height: '100%',
      lignItems: 'center',
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  containerFlatList: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].dark90,
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: (colorScheme, screenWidth) => {
    return {
      width: screenWidth,
      backgroundColor: colorSchemeObj[colorScheme].dark30,
      textAlign: 'center',
      color: 'red',
    };
  },
  successText: (colorScheme, screenWidth) => {
    return {
      width: screenWidth,
      backgroundColor: colorSchemeObj[colorScheme].dark30,
      textAlign: 'center',
      color: colorSchemeObj[colorScheme].light70,
    };
  },
  tipsContainer: colorScheme => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderTopColor: colorSchemeObj[colorScheme].light40,
      borderBottomColor: colorSchemeObj[colorScheme].light40,
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
    };
  },
  iconArrowScrolling: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      textAlign: 'center',
    };
  },
  filterButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    flexDirection: 'row',
  },
  filterIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedItem: {
    opacity: 0.2,
  },
  checkboxContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingBottom: 15,
  },
  checkboxColumn: {
    justifyContent: 'flex-start',
  },
  startEndArrowsContainer: (screenWidth, screenHeight) => {
    return {
      position: 'absolute',
      right: 16,
      bottom: screenWidth > screenHeight ? 0 : 32,
      gap: 12,
    };
  },
  startEndArrow: (colorScheme, screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? 40 : 48,
      height: screenWidth > screenHeight ? 40 : 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      borderWidth: 1,
      borderColor: colorSchemeObj[colorScheme].light40,
    };
  },
  regularText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light80,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
      textAlignVertical: 'center',
    };
  },
  listModeButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 3,
    gap: 10,
  },
  listModeButton: colorScheme => {
    return {
      flex: 1,
      borderWidth: 1,
      borderColor: colorSchemeObj[colorScheme].light40,
      padding: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
  listModeButtonActive: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].dark10,
    };
  },
});
