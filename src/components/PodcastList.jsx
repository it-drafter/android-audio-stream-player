import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Alert,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import IconFeather from 'react-native-vector-icons/Feather';

import {fetchEpisodes} from '../util/http';
import {localStorage} from '../util/http';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';

import PodcastItem from './PodcastItem';
import Loading from './Loading';

const PodcastList = ({navigation}) => {
  const {width} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const netInfo = useNetInfo();

  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchedEpisodes, setFetchedEpisodes] = useState([]);
  const [delayComplete, setDelayComplete] = useState(false);
  const [userRefreshed, setUserRefreshed] = useState(false);

  const [isOpenFilter, setIsOpenFilter] = useState(false);

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
  const [isCheckedLjudiIzPodzemlja, setIsCheckedLjudiIzPodzemlja] = useState(
    localStorage.getBoolean('isCheckedLjudiIzPodzemlja') === undefined ||
      localStorage.getBoolean('isCheckedLjudiIzPodzemlja') === true
      ? true
      : false,
  );
  const [isCheckedVecernjaSkolaRokenrola, setIsCheckedVecernjaSkolaRokenrola] =
    useState(
      localStorage.getBoolean('isCheckedVecernjaSkolaRokenrola') ===
        undefined ||
        localStorage.getBoolean('isCheckedVecernjaSkolaRokenrola') === true
        ? true
        : false,
    );
  const [isCheckedNaIviciOfsajda, setIsCheckedNaIviciOfsajda] = useState(
    localStorage.getBoolean('isCheckedNaIviciOfsajda') === undefined ||
      localStorage.getBoolean('isCheckedNaIviciOfsajda') === true
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

  useFocusEffect(
    useCallback(() => {
      const jsonFetchedEpisodes = localStorage.getString('episodes');

      if (jsonFetchedEpisodes) {
        const fetchedEpisodesFromStorage = JSON.parse(jsonFetchedEpisodes);
        setFetchedEpisodes(fetchedEpisodesFromStorage);
      }

      setDelayComplete(false);

      const timeout = setTimeout(() => {
        setDelayComplete(true);
      }, 3000);

      return () => {
        clearTimeout(timeout);
        setUserRefreshed(false);
      };
    }, []),
  );

  if (isRefreshing) {
    return (
      <View
        style={[styles.container(globalCtx.colorSchemeValue), styles.loading]}>
        <Loading />
      </View>
    );
  }

  const onRefresh = async () => {
    if (netInfo.isInternetReachable === false) {
      Alert.alert(
        'Ne mogu da ažuriram podkast listu.',
        'Proveri internet konekciju.',
      );
      return;
    }

    setIsRefreshing(true);
    setError(null);
    try {
      const episodes = await fetchEpisodes();
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

  const fetchedEpisodesOnlyAlarmSaMuzikom = [
    ...fetchedEpisodes.filter(
      episode =>
        !episode.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Ljudi iz podzemlja'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Večernja škola rokenrola'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Na ivici ofsajda'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Sportski Pozdrav'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Tople Ljucke Priče'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyAlarmBezMuzike = [
    ...fetchedEpisodes.filter(
      episode =>
        episode.url.toLowerCase().endsWith('bm.mp3'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Ljudi iz podzemlja'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Večernja škola rokenrola'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Na ivici ofsajda'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Sportski Pozdrav'.toLowerCase()) &&
        !episode.title
          .toLowerCase()
          .includes('Tople Ljucke Priče'.toLowerCase()) &&
        !episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyLjudiIzPodzemlja = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Ljudi iz podzemlja'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyVecernjaSkolaRokenrola = [
    ...fetchedEpisodes.filter(episode =>
      episode.title
        .toLowerCase()
        .includes('Večernja škola rokenrola'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyNaIviciOfsajda = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Na ivici ofsajda'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlySportskiPozdrav = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Sportski Pozdrav'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyTopleLjuckePrice = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Tople Ljucke Priče'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesOnlyRastrojavanje = [
    ...fetchedEpisodes.filter(episode =>
      episode.title.toLowerCase().includes('Rastrojavanje'.toLowerCase()),
    ),
  ];

  const fetchedEpisodesUnsorted = [];

  isCheckedAlarmSaMuzikom &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyAlarmSaMuzikom);
  isCheckedAlarmBezMuzike &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyAlarmBezMuzike);
  isCheckedLjudiIzPodzemlja &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyLjudiIzPodzemlja);
  isCheckedVecernjaSkolaRokenrola &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyVecernjaSkolaRokenrola);
  isCheckedNaIviciOfsajda &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyNaIviciOfsajda);
  isCheckedSportskiPozdrav &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlySportskiPozdrav);
  isCheckedTopleLjuckePrice &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyTopleLjuckePrice);
  isCheckedRastrojavanje &&
    fetchedEpisodesUnsorted.push(...fetchedEpisodesOnlyRastrojavanje);

  const fetchedEpisodesToDisplay = fetchedEpisodesUnsorted.sort((a, b) => {
    let da = new Date(a.pubDate),
      db = new Date(b.pubDate);
    return db - da;
  });

  return (
    <View style={styles.container(globalCtx.colorSchemeValue)}>
      <View style={styles.tipsContainer(globalCtx.colorSchemeValue)}>
        {error ? (
          <Text style={styles.errorText(globalCtx.colorSchemeValue, width)}>
            Lista nije ažurirana. Greška u konekciji sa serverom.
          </Text>
        ) : userRefreshed ? (
          <Text style={styles.successText(globalCtx.colorSchemeValue, width)}>
            Lista je uspešno ažurirana!
          </Text>
        ) : (
          <Text style={styles.tipsText(globalCtx.colorSchemeValue)}>
            {delayComplete
              ? 'Povuci dole za update / refresh'
              : 'Podkast lista'}
          </Text>
        )}
      </View>

      <View style={styles.filterButtonContainer(globalCtx.colorSchemeValue)}>
        <Pressable
          onPress={() => setIsOpenFilter(!isOpenFilter)}
          style={({pressed}) => pressed && styles.pressedItem}>
          <View style={styles.filterIconsContainer}>
            <IconFeather
              style={styles.icon(globalCtx.colorSchemeValue)}
              name="filter"
              size={25}
            />
            <IconFeather
              style={styles.icon(globalCtx.colorSchemeValue)}
              name={isOpenFilter ? 'chevron-up' : 'chevron-down'}
              size={22}
            />
          </View>
        </Pressable>
      </View>

      {isOpenFilter && (
        <View style={styles.checkboxContainer(globalCtx.colorSchemeValue)}>
          <View style={styles.checkboxColumn}>
            <BouncyCheckbox
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Alarm - sa muzikom"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Alarm - bez muzike"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Ljudi iz podzemlja"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Večernja škola rokenrola"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
          </View>
          <View style={styles.checkboxColumn}>
            <BouncyCheckbox
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Na ivici ofsajda"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
            <BouncyCheckbox
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Sportski Pozdrav"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Tople Ljucke Priče"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
              size={20}
              fillColor={colorSchemeObj[globalCtx.colorSchemeValue].light50}
              unfillColor={colorSchemeObj[globalCtx.colorSchemeValue].light30}
              text="Rastrojavanje"
              iconStyle={{
                borderColor: colorSchemeObj[globalCtx.colorSchemeValue].base,
              }}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                textDecorationLine: 'none',
                fontSize: 14,
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
          </View>
        </View>
      )}

      <FlatList
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
      />
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
  tipsText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
    };
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
      backgroundColor: colorSchemeObj[colorScheme].dark30,
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
  filterButtonContainer: colorScheme => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: colorSchemeObj[colorScheme].light40,
      flexDirection: 'row',
    };
  },
  filterIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressedItem: {
    opacity: 0.5,
  },
  checkboxContainer: colorScheme => {
    return {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colorSchemeObj[colorScheme].light40,
    };
  },
  checkboxColumn: {
    justifyContent: 'space-between',
  },
});
