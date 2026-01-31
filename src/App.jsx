import React, {useState, useEffect, useCallback} from 'react';
import GlobalContext from './util/context';
import {StatusBar, StyleSheet, useWindowDimensions, View} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer, addTrack} from './util/musicPlayerServices';
import Main from './components/Main';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import BootSplash from 'react-native-bootsplash';
import FastImage from '@d11/react-native-fast-image';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import Loading from './components/Loading';
import {localStorage} from './util/http';
import {colorSchemeObj} from './util/colors';

import daMl from './assets/da-ml.png';

import {useTranslation} from 'react-i18next';

const TabBottom = createBottomTabNavigator();

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

  const {t, i18n} = useTranslation();

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
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  useEffect(() => {
    i18n.changeLanguage(
      !localStorage.getString('language')
        ? 'srp'
        : localStorage.getString('language'),
    );
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaProvider style={styles.container}>
        <StatusBar />
        <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.loadingContainer(colorScheme, width)}>
            <Loading />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
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
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <NavigationContainer theme={navTheme}>
          <TabBottom.Navigator
            initialRouteName="Main"
            backBehavior="history"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colorSchemeObj[colorScheme].light70,
              tabBarInactiveTintColor: colorSchemeObj[colorScheme].light20,
              tabBarActiveBackgroundColor: colorSchemeObj[colorScheme].dark30,
              tabBarStyle: {
                backgroundColor: colorSchemeObj[colorScheme].dark90,
                borderTopWidth: 0,
              },
              animation: 'shift',
            }}>
            <TabBottom.Screen
              name="Main"
              component={Main}
              options={{
                title: t('app_player'),
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
              name="AboutUs"
              component={AboutUs}
              options={{
                title: t('app_about_us'),
                tabBarIconStyle: {
                  marginHorizontal: 10,
                },
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
                title: t('app_settings'),
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
      </SafeAreaProvider>
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
