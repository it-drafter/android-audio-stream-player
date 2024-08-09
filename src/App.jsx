import React, {useState, useEffect, useCallback} from 'react';
import GlobalContext from './util/context';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer, addTrack} from './util/musicPlayerServices';
import Main from './components/Main';
import Settings from './components/Settings';
import SupportUs from './components/SupportUs';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import BootSplash from 'react-native-bootsplash';
import FastImage from 'react-native-fast-image';

import Loading from './components/Loading';
import {localStorage} from './util/http';
import {colorSchemeObj} from './util/colors';
import daMl from './assets/da-ml.png';

const TabBottom = createMaterialBottomTabNavigator();

function App() {
  const {width} = useWindowDimensions();

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [fileNameLoadedToTrack, setFileNameLoadedToTrack] = useState('');
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [fileNameDownloading, setfileNameDownloading] = useState({});
  const [colorScheme, setColorScheme] = useState(
    !localStorage.getString('colorScheme')
      ? 'violet'
      : localStorage.getString('colorScheme'),
  );

  const setup = useCallback(async () => {
    let isSetup = await setupPlayer();

    const queue = await TrackPlayer.getQueue();

    if (isSetup && queue.length <= 0) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }, []);

  useEffect(() => {
    setup();

    return async () => {
      await TrackPlayer.reset();
    };
  }, [setup]);

  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  useEffect(() => {
    StatusBar.setBackgroundColor(colorSchemeObj[colorScheme].light10);
  }, [colorScheme]);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View style={styles.loadingContainer(colorScheme, width)}>
          <Loading />
        </View>
      </SafeAreaView>
    );
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorSchemeObj[colorScheme].dark90,
    },
  };

  return (
    <GlobalContext.Provider
      value={{
        fileNameLoadedToTrackValue: fileNameLoadedToTrack,
        setfileNameLoadedToTrackFn: setFileNameLoadedToTrack,
        swipeEnabledValue: swipeEnabled,
        setSwipeEnabledValue: setSwipeEnabled,
        fileNameDownloadingValue: fileNameDownloading,
        setfileNameDownloadingFn: setfileNameDownloading,
        colorSchemeValue: colorScheme,
        setColorSchemeFn: setColorScheme,
      }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <NavigationContainer theme={navTheme}>
          <TabBottom.Navigator
            initialRouteName="Main"
            backBehavior="history"
            activeColor={colorSchemeObj[colorScheme].light70}
            inactiveColor={colorSchemeObj[colorScheme].light20}
            barStyle={{backgroundColor: colorSchemeObj[colorScheme].dark90}}>
            <TabBottom.Screen
              name="Main"
              component={Main}
              options={{
                title: 'Player',
                tabBarIcon: () => (
                  <IconMaterialCommunity
                    style={styles.icon(colorScheme)}
                    name={'music'}
                    size={25}
                  />
                ),
              }}
            />
            <TabBottom.Screen
              name="SupportUs"
              component={SupportUs}
              options={{
                title: 'O nama',
                tabBarIcon: () => (
                  <FastImage
                    style={{
                      width: 40,
                      height: 27,
                    }}
                    source={daMl}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ),
              }}
            />
            <TabBottom.Screen
              name="Settings"
              component={Settings}
              options={{
                title: 'Podešavanja',
                tabBarIcon: () => (
                  <IconMaterialCommunity
                    style={styles.icon(colorScheme)}
                    name={'cog-outline'}
                    size={25}
                  />
                ),
              }}
            />
          </TabBottom.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: colorScheme => {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: colorSchemeObj[colorScheme].light20,
    };
  },
  loadingContainer: (colorScheme, screenWidth) => {
    return {
      height: '100%',
      padding: 10,
      width: screenWidth,
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
});

export default App;
