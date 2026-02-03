import {
  StyleSheet,
  Text,
  View,
  Switch,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useState, useContext} from 'react';
import RNExitApp from 'react-native-exit-app';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {localStorage} from '../util/http';
import {useFocusEffect} from '@react-navigation/native';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import FastImage from '@d11/react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  FlagIconMK,
  FlagIconRS,
  FlagIconHR,
  FlagIconGB,
  FlagIconJP,
  FlagIconDE,
} from '@flagkit/react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import developerIcon from '../assets/developericon.png';

import {useTranslation} from 'react-i18next';
import {t} from 'i18next';

const Settings = () => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const playBackState = usePlaybackState().state;
  const {position} = useProgress();
  const insets = useSafeAreaInsets();

  const [isWiFiOnlyEnabledRadio, setIsWiFiOnlyEnabledRadio] = useState(
    localStorage.getBoolean('isWiFiOnlyEnabledForRadio') ?? true,
  );
  const [isWiFiOnlyEnabledPodcast, setIsWiFiOnlyEnabledPodcast] = useState(
    localStorage.getBoolean('isWiFiOnlyEnabledForPodcast') ?? true,
  );
  const [
    isWiFiOnlyEnabledPodcastDownload,
    setIsWiFiOnlyEnabledPodcastDownload,
  ] = useState(
    localStorage.getBoolean('isWiFiOnlyEnabledForPodcastDownload') ?? true,
  );
  const [folderContent, setFolderContent] = useState([]);
  const [folderSize, setFolderSize] = useState(0);
  const [isCopiedContactEmail, setIsCopiedContactEmail] = useState(false);

  const {i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const getFolderContent = async () => {
    setFolderContent(await RNFS.readdir(RNFS.ExternalDirectoryPath));
  };

  const getFolderSize = async () => {
    const filesInFolderArr = await RNFS.readdir(
      `file://${RNFS.ExternalDirectoryPath}`,
    );

    const fileSize = [];

    filesInFolderArr.forEach(async (file, index) => {
      const fileStats = await RNFS.stat(
        `file://${RNFS.ExternalDirectoryPath}/${file}`,
      );
      fileSize.push(fileStats.size);

      if (filesInFolderArr.length - 1 === index) {
        const totalSize = fileSize.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        setFolderSize(totalSize);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      getFolderContent();
      getFolderSize();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let timeout1;

      if (isCopiedContactEmail) {
        timeout1 = setTimeout(() => {
          setIsCopiedContactEmail(false);
        }, 1500);
      }

      return () => {
        clearTimeout(timeout1);
      };
    }, [isCopiedContactEmail]),
  );

  const toggleSwitchRadio = () =>
    setIsWiFiOnlyEnabledRadio(previousState => {
      localStorage.set('isWiFiOnlyEnabledForRadio', !previousState);

      return !previousState;
    });

  const toggleSwitchPodcast = () =>
    setIsWiFiOnlyEnabledPodcast(previousState => {
      localStorage.set('isWiFiOnlyEnabledForPodcast', !previousState);

      return !previousState;
    });

  const toggleSwitchPodcastDownload = () =>
    setIsWiFiOnlyEnabledPodcastDownload(previousState => {
      localStorage.set('isWiFiOnlyEnabledForPodcastDownload', !previousState);

      return !previousState;
    });

  const handleDeleteFiles = async () => {
    const filesInFolder = await RNFS.readdir(
      `file://${RNFS.ExternalDirectoryPath}`,
    );

    filesInFolder.forEach(file =>
      RNFS.unlink(`file://${RNFS.ExternalDirectoryPath}/${file}`),
    );
    setFolderContent([]);
    setFolderSize(0);
  };

  const handlePressViolet = () => {
    localStorage.set('colorScheme', 'violet');
    globalCtx.setColorSchemeFn('violet');
  };
  const handlePressCrimsonRed = () => {
    localStorage.set('colorScheme', 'crimsonRed');
    globalCtx.setColorSchemeFn('crimsonRed');
  };
  const handlePressBlue = () => {
    localStorage.set('colorScheme', 'blue');
    globalCtx.setColorSchemeFn('blue');
  };
  const handlePressPink = () => {
    localStorage.set('colorScheme', 'pink');
    globalCtx.setColorSchemeFn('pink');
  };
  const handlePressGreen = () => {
    localStorage.set('colorScheme', 'green');
    globalCtx.setColorSchemeFn('green');
  };
  const handlePressOrange = () => {
    localStorage.set('colorScheme', 'orange');
    globalCtx.setColorSchemeFn('orange');
  };
  const handlePressGray = () => {
    localStorage.set('colorScheme', 'gray');
    globalCtx.setColorSchemeFn('gray');
  };

  const colors = [
    {
      colorName: 'violet',
      action: handlePressViolet,
      colorTop: '#432874',
      colorBottom: '#7d55c7',
      style: styles.colorBoxViolet,
    },
    {
      colorName: 'crimsonRed',
      action: handlePressCrimsonRed,
      colorTop: '#5c0000',
      colorBottom: '#a31919',
      style: styles.colorBoxCrimsonRed,
    },
    {
      colorName: 'blue',
      action: handlePressBlue,
      colorTop: '#285092',
      colorBottom: '#5591f5',
      style: styles.colorBoxBlue,
    },
    {
      colorName: 'pink',
      action: handlePressPink,
      colorTop: '#8c2064',
      colorBottom: '#eb4ab0',
      style: styles.colorBoxPink,
    },
    {
      colorName: 'green',
      action: handlePressGreen,
      colorTop: '#0b5205',
      colorBottom: '#2b9421',
      style: styles.colorBoxGreen,
    },
    {
      colorName: 'orange',
      action: handlePressOrange,
      colorTop: '#8f3814',
      colorBottom: '#f16d38',
      style: styles.colorBoxOrange,
    },
    {
      colorName: 'gray',
      action: handlePressGray,
      colorTop: '#535353',
      colorBottom: '#b1b1b1',
      style: styles.colorBoxGray,
    },
  ];

  const languages = [
    {
      code: 'srp',
      label: t('language:Srpski'),
      flag: <FlagIconRS />,
      translator: 'Roćko',
    },
    {
      code: 'hrv',
      label: t('language:Hrvatski'),
      flag: <FlagIconHR />,
      translator: 'King Charles Latest Affair',
    },
    {
      code: 'mkd',
      label: t('language:Македонски'),
      flag: <FlagIconMK />,
      translator: 'Luka',
    },
    {
      code: 'eng',
      label: t('language:English'),
      flag: <FlagIconGB />,
      translator: 'Translator 2',
    },
    {
      code: 'deu',
      label: t('language:Deutsch'),
      flag: <FlagIconDE />,
      translator: 'Vlada',
    },
    {
      code: 'jpn',
      label: t('language:日本語'),
      flag: <FlagIconJP />,
      translator: 'Biljana',
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: width < height ? insets.top + 30 : insets.top,
      }}
      edges={[]}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container(globalCtx.colorSchemeValue)}>
          <View style={styles.titleContainer(width, height)}>
            <IconMaterialCommunity
              style={styles.icon(globalCtx.colorSchemeValue)}
              name={'cogs'}
              size={35}
            />
            <Text style={styles.titleText(globalCtx.colorSchemeValue)}>
              {t('settings_settings')}
            </Text>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.switchWrapper}>
              <View style={styles.switchContainer(width, height)}>
                <Pressable
                  onPressOut={() =>
                    Alert.alert(
                      t('settings_wifi_info_title'),
                      t('settings_wifi_live_radio_info'),
                    )
                  }
                  style={({pressed}) => [pressed && styles.pressedItem]}>
                  <Text
                    style={[
                      styles.regularText(globalCtx.colorSchemeValue),
                      i18n.language === 'jpn' && {fontSize: 11},
                    ]}>
                    {t('settings_wifi_live_radio')}{' '}
                    <IconMaterialCommunity
                      name="information-outline"
                      size={17}
                      color={colorSchemeObj[globalCtx.colorSchemeValue].light40}
                    />
                  </Text>
                </Pressable>
                <Switch
                  trackColor={{
                    false: colorSchemeObj[globalCtx.colorSchemeValue].dark10,
                    true: colorSchemeObj[globalCtx.colorSchemeValue].light40,
                  }}
                  thumbColor={
                    isWiFiOnlyEnabledRadio
                      ? colorSchemeObj[globalCtx.colorSchemeValue].light90
                      : colorSchemeObj[globalCtx.colorSchemeValue].light20
                  }
                  onValueChange={toggleSwitchRadio}
                  value={isWiFiOnlyEnabledRadio}
                />
              </View>
              <View style={styles.switchContainer(width, height)}>
                <Pressable
                  onPressOut={() =>
                    Alert.alert(
                      t('settings_wifi_info_title'),
                      t('settings_wifi_podcast_info'),
                    )
                  }
                  style={({pressed}) => [pressed && styles.pressedItem]}>
                  <Text
                    style={[
                      styles.regularText(globalCtx.colorSchemeValue),
                      i18n.language === 'jpn' && {fontSize: 11},
                    ]}>
                    {t('settings_wifi_podcasts')}{' '}
                    <IconMaterialCommunity
                      name="information-outline"
                      size={17}
                      color={colorSchemeObj[globalCtx.colorSchemeValue].light40}
                    />
                  </Text>
                </Pressable>
                <Switch
                  trackColor={{
                    false: colorSchemeObj[globalCtx.colorSchemeValue].dark10,
                    true: colorSchemeObj[globalCtx.colorSchemeValue].light40,
                  }}
                  thumbColor={
                    isWiFiOnlyEnabledPodcast
                      ? colorSchemeObj[globalCtx.colorSchemeValue].light90
                      : colorSchemeObj[globalCtx.colorSchemeValue].light20
                  }
                  onValueChange={toggleSwitchPodcast}
                  value={isWiFiOnlyEnabledPodcast}
                />
              </View>
              <View style={styles.switchContainer(width, height)}>
                <Pressable
                  onPressOut={() =>
                    Alert.alert(
                      t('settings_wifi_info_title'),
                      t('settings_wifi_podcast_download_info'),
                    )
                  }
                  style={({pressed}) => [pressed && styles.pressedItem]}>
                  <Text
                    style={[
                      styles.regularText(globalCtx.colorSchemeValue),
                      i18n.language === 'jpn' && {fontSize: 11},
                    ]}>
                    {t('settings_wifi_podcasts_download')}{' '}
                    <IconMaterialCommunity
                      name="information-outline"
                      size={17}
                      color={colorSchemeObj[globalCtx.colorSchemeValue].light40}
                    />
                  </Text>
                </Pressable>
                <Switch
                  trackColor={{
                    false: colorSchemeObj[globalCtx.colorSchemeValue].dark10,
                    true: colorSchemeObj[globalCtx.colorSchemeValue].light40,
                  }}
                  thumbColor={
                    isWiFiOnlyEnabledPodcastDownload
                      ? colorSchemeObj[globalCtx.colorSchemeValue].light90
                      : colorSchemeObj[globalCtx.colorSchemeValue].light20
                  }
                  onValueChange={toggleSwitchPodcastDownload}
                  value={isWiFiOnlyEnabledPodcastDownload}
                />
              </View>
            </View>

            <View style={styles.buttonContainer(width, height)}>
              <Pressable
                onPressOut={handleDeleteFiles}
                style={({pressed}) => [pressed && styles.pressedItem]}>
                <LinearGradient
                  colors={[
                    colorSchemeObj[globalCtx.colorSchemeValue].dark40,
                    colorSchemeObj[globalCtx.colorSchemeValue].light10,
                  ]}
                  style={styles.button(globalCtx.colorSchemeValue)}>
                  <IconMaterialCommunity
                    style={styles.iconButton(globalCtx.colorSchemeValue)}
                    name={'delete'}
                    size={25}
                  />
                  <Text
                    style={[
                      styles.buttonText(globalCtx.colorSchemeValue),
                      i18n.language === 'jpn' && {fontSize: 11},
                      i18n.language === 'deu' && {fontSize: 11},
                    ]}>
                    {t('settings_delete_all')}
                  </Text>
                </LinearGradient>
              </Pressable>
              <View style={styles.downloadDetails}>
                <View>
                  <IconMaterialCommunity
                    style={styles.icon(globalCtx.colorSchemeValue)}
                    name="database"
                    size={30}
                  />
                </View>
                <View>
                  <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                    {t('settings_number_of_downloaded')} {folderContent?.length}
                  </Text>
                  <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                    {t('settings_total_size')}{' '}
                    {folderSize < 1000000000
                      ? `${(folderSize / 1000 / 1000).toFixed(2)} MB`
                      : `${(folderSize / 1000 / 1000 / 1000).toFixed(2)} GB`}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer(width, height)}>
              <Pressable
                onPress={async () => {
                  const currentTrack = await TrackPlayer.getActiveTrackIndex();

                  if (currentTrack !== null) {
                    if (
                      playBackState === State.Playing &&
                      !globalCtx.fileNameLoadedToTrackValue.endsWith(
                        'stream',
                      ) &&
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
                      !globalCtx.fileNameLoadedToTrackValue.endsWith(
                        'stream',
                      ) &&
                      !localStorage.getString('localProgressMap')
                    ) {
                      localStorage.set(
                        'localProgressMap',
                        JSON.stringify({
                          [globalCtx.fileNameLoadedToTrackValue]: position,
                        }),
                      );
                    }
                  }

                  await TrackPlayer.reset();

                  setTimeout(() => {
                    RNExitApp.exitApp();
                  }, 800);
                }}
                style={({pressed}) => [pressed && styles.pressedItem]}>
                <LinearGradient
                  colors={[
                    colorSchemeObj[globalCtx.colorSchemeValue].dark40,
                    colorSchemeObj[globalCtx.colorSchemeValue].light10,
                  ]}
                  style={styles.button(globalCtx.colorSchemeValue)}>
                  <IconMaterialCommunity
                    style={styles.iconButton(globalCtx.colorSchemeValue)}
                    name={'exit-run'}
                    size={25}
                  />
                  <Text style={styles.buttonText(globalCtx.colorSchemeValue)}>
                    {t('settings_exit_app')}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            <View style={styles.colorsContainer(width, height)}>
              <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
                {t('settings_color')}
              </Text>
              <View style={styles.colorPickerContainer}>
                {colors.map(currentColor => {
                  const selectedColor =
                    currentColor.colorName === globalCtx.colorSchemeValue;
                  return (
                    <Pressable
                      key={currentColor.colorName}
                      onPress={currentColor.action}
                      style={({pressed}) => [
                        {borderRadius: 5},
                        pressed && styles.pressedItem,
                        selectedColor && {
                          borderWidth: 0.75,
                          borderColor: '#fff',
                        },
                      ]}>
                      <LinearGradient
                        colors={[
                          currentColor.colorTop,
                          currentColor.colorBottom,
                        ]}
                        style={[
                          styles.colorBox,
                          currentColor.style,
                        ]}></LinearGradient>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.colorsContainer(width, height)}>
              <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
                {t('settings_app_language')}
              </Text>
              <View style={styles.colorPickerContainer}>
                {languages.map(currentLang => {
                  const selectedLanguage =
                    currentLang.code === selectedLanguageCode;
                  return (
                    <Pressable
                      key={currentLang.code}
                      onPress={() => {
                        i18n.changeLanguage(currentLang.code);
                        localStorage.set('language', currentLang.code);
                      }}
                      style={({pressed}) => [
                        {
                          padding: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        },
                        pressed && styles.pressedItem,
                      ]}>
                      <Text
                        style={styles.translationText(
                          globalCtx.colorSchemeValue,
                          selectedLanguage,
                        )}>
                        {currentLang.flag}
                      </Text>
                      <Text
                        style={styles.translationText(
                          globalCtx.colorSchemeValue,
                          selectedLanguage,
                        )}>
                        {' '}
                        {' ' + currentLang.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.colorsContainer(width, height)}>
              <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
                {t('settings_translators')}
              </Text>
              <View style={styles.translatorsContainer}>
                {languages
                  .filter(
                    currLang =>
                      currLang.code !== 'srp' && currLang.code !== 'eng',
                  )
                  .map((currentLang, i) => {
                    return (
                      <View
                        key={i}
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 25,
                          },
                        ]}>
                        <Text
                          style={styles.translatorsText(
                            globalCtx.colorSchemeValue,
                          )}>
                          {currentLang.flag}
                        </Text>
                        <Text
                          style={styles.translatorsText(
                            globalCtx.colorSchemeValue,
                          )}>
                          {' '}
                          {' ' + currentLang.label}
                        </Text>
                        <Text
                          style={styles.translatorsText(
                            globalCtx.colorSchemeValue,
                          )}>
                          {' : ' + currentLang.translator}
                        </Text>
                        <Text
                          style={styles.translatorsText(
                            globalCtx.colorSchemeValue,
                          )}>
                          {' \n '}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>

          <View style={styles.aboutContainer(width, height)}>
            <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
              {t('settings_about_app')}
            </Text>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              {t('settings_version')} 33.43.20260203
            </Text>
            <View style={styles.contactContainerAuthor}>
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                {t('settings_author')}&nbsp;
              </Text>
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                &nbsp;Ivan Tančik a.k.a.&nbsp;
              </Text>
              <FastImage
                style={{
                  width: 20,
                  height: 20,
                }}
                source={developerIcon}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                &nbsp;Roćko
              </Text>
            </View>

            <View style={styles.contactContainer}>
              <View style={styles.contactContainerEmail}>
                <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                  {t('settings_contact')}
                </Text>
                <View style={styles.authorEmailContainer}>
                  <Pressable
                    onPress={() => {
                      Clipboard.setString('rotjko.zica@gmail.com');
                      setIsCopiedContactEmail(true);
                    }}
                    style={({pressed}) => [
                      pressed && styles.pressedItem,
                      styles.authorContactEmailContainer,
                    ]}>
                    <IconMaterialCommunity
                      style={styles.iconWithTheLeastMargin(
                        globalCtx.colorSchemeValue,
                      )}
                      name={'email'}
                      size={20}
                    />

                    <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                      rotjko.zica@gmail.com{' '}
                    </Text>
                    <IconMaterialCommunity
                      style={styles.iconWithLessMargin(
                        globalCtx.colorSchemeValue,
                      )}
                      name={'content-copy'}
                      size={20}
                    />
                  </Pressable>

                  <Text
                    style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
                    {`${isCopiedContactEmail ? t('settings_copied') : ''}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
  },
  container: colorScheme => {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  switchWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  switchContainer: (screenWidth, screenHeight) => {
    return {
      flexDirection: 'row',
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      paddingVertical: 7,
      justifyContent: 'space-between',
    };
  },
  titleContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    };
  },
  aboutContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      paddingVertical: 7,
      marginTop: 5,
      marginBottom: 20,
    };
  },
  buttonContainer: (screenWidth, screenHeight) => {
    return {
      alignItems: 'flex-start',
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      paddingTop: 25,
      paddingBottom: 15,
    };
  },
  middleContainer: {
    justifyContent: 'space-between',
  },
  titleText: colorScheme => {
    return {
      fontSize: 25,
      fontWeight: 'bold',
      color: colorSchemeObj[colorScheme].light70,
      fontFamily: 'monospace',
    };
  },
  aboutTextHeading: colorScheme => {
    return {
      fontSize: 20,
      fontWeight: 'bold',
      color: colorSchemeObj[colorScheme].light70,
      fontFamily: 'monospace',
      marginBottom: 5,
    };
  },
  downloadDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].dark10,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      flexDirection: 'row',
    };
  },
  buttonText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      fontFamily: 'monospace',
      fontWeight: 'bold',
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
  translationText: (colorScheme, selectedLanguage) => {
    return {
      color: colorSchemeObj[colorScheme].light80,
      fontFamily: 'sans-serif-medium',
      textAlignVertical: 'center',
      fontSize: 18,
      color: selectedLanguage
        ? colorSchemeObj[colorScheme].light40
        : colorSchemeObj[colorScheme].light80,
      fontWeight: selectedLanguage ? 'bold' : 'normal',
    };
  },
  translatorsText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light80,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
      textAlignVertical: 'center',
    };
  },
  textTooltip: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light10,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
    };
  },
  textLink: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light60,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'left',
      marginLeft: 5,
      height: 20,
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 10,
    };
  },
  iconWithLessMargin: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 5,
    };
  },
  iconWithTheLeastMargin: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 1,
    };
  },
  iconButton: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
      marginRight: 10,
    };
  },
  pressedItem: {
    opacity: 0.2,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContainerAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  authorEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  contactContainerEmail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorContactEmailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorsContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      marginVertical: 20,
    };
  },
  colorPickerContainer: {
    flexDirection: 'row',
    marginTop: 2,
    flexWrap: 'wrap',
    gap: 24,
  },
  translatorsContainer: {
    flexDirection: 'column',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  colorBox: {
    width: 40,
    height: 40,
  },
  colorBoxViolet: {
    backgroundColor: '#6f42c1',
  },
  colorBoxCrimsonRed: {
    backgroundColor: '#990000',
  },
  colorBoxBlue: {
    backgroundColor: '#4285f4',
  },
  colorBoxPink: {
    backgroundColor: '#e936a7',
  },
  colorBoxGreen: {
    backgroundColor: '#138808',
  },
  colorBoxOrange: {
    backgroundColor: '#ef5d22',
  },
  colorBoxGray: {
    backgroundColor: '#a9a9a9',
  },
});
