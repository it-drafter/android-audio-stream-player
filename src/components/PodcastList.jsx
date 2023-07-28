import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import React, {useState, useCallback, useContext} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
import {fetchEpisodes} from '../util/http';
import {localStorage} from '../util/http';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';

import PodcastItem from './PodcastItem';
import Loading from './Loading';

const {width} = Dimensions.get('window');

const PodcastList = ({navigation}) => {
  const globalCtx = useContext(GlobalContext);
  const netInfo = useNetInfo();

  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchedEpisodes, setFetchedEpisodes] = useState([]);
  const [delayComplete, setDelayComplete] = useState(false);
  const [userRefreshed, setUserRefreshed] = useState(false);

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

  return (
    <View style={styles.container(globalCtx.colorSchemeValue)}>
      <View style={styles.tipsContainer(globalCtx.colorSchemeValue)}>
        {error ? (
          <Text style={styles.errorText(globalCtx.colorSchemeValue)}>
            Lista nije ažurirana. Greška u konekciji sa serverom.
          </Text>
        ) : userRefreshed ? (
          <Text style={styles.successText(globalCtx.colorSchemeValue)}>
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

      <OptimizedFlatList
        data={fetchedEpisodes}
        renderItem={renderItem}
        keyExtractor={item => {
          return item.url;
        }}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        extraData={fetchedEpisodes}
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
  },
  tipsText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
    };
  },
  errorText: colorScheme => {
    return {
      width: width,
      backgroundColor: colorSchemeObj[colorScheme].dark30,
      textAlign: 'center',
      color: 'red',
    };
  },
  successText: colorScheme => {
    return {
      width: width,
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
});
