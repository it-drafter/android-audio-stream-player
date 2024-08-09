import {
  StyleSheet,
  Text,
  View,
  Switch,
  useWindowDimensions,
  Pressable,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState, useContext} from 'react';
import RNExitApp from 'react-native-exit-app';
import RNFS from 'react-native-fs';
import {localStorage} from '../util/http';
import {useFocusEffect} from '@react-navigation/native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';

import developerIcon from '../assets/developericon.png';
import payPalColor from '../assets/paypal-color.png';
import raiffeisen from '../assets/raiffeisen.jpg';
import bitcoin from '../assets/bitcoin.png';
import bitcoinLightning from '../assets/bitcoin-lightning.png';
import mlWobble from '../assets/ml-wobble.gif';

const Settings = () => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const playBackState = usePlaybackState().state;
  const {position} = useProgress();

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
  // const [
  //   isAutoResumeEnabledOnInterruption,
  //   setIsAutoResumeEnabledOnInterruption,
  // ] = useState(
  //   localStorage.getBoolean('isAutoResumeEnabledAfterInterruption') ?? true,
  // );
  const [folderContent, setFolderContent] = useState([]);
  const [folderSize, setFolderSize] = useState(0);
  const [isCopiedPayPal, setIsCopiedPayPal] = useState(false);
  const [isCopiedRaiffeisen, setIsCopiedRaiffeisen] = useState(false);
  const [isCopiedContactEmail, setIsCopiedContactEmail] = useState(false);
  const [isCopiedBtcNetwork, setIsCopiedBtcNetwork] = useState(false);
  const [isCopiedBtcLightning, setIsCopiedBtcLightning] = useState(false);

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

      if (isCopiedPayPal) {
        timeout1 = setTimeout(() => {
          setIsCopiedPayPal(false);
        }, 1500);
      }
      if (isCopiedRaiffeisen) {
        timeout1 = setTimeout(() => {
          setIsCopiedRaiffeisen(false);
        }, 1500);
      }

      if (isCopiedContactEmail) {
        timeout1 = setTimeout(() => {
          setIsCopiedContactEmail(false);
        }, 1500);
      }

      if (isCopiedBtcNetwork) {
        timeout1 = setTimeout(() => {
          setIsCopiedBtcNetwork(false);
        }, 1500);
      }

      if (isCopiedBtcLightning) {
        timeout1 = setTimeout(() => {
          setIsCopiedBtcLightning(false);
        }, 1500);
      }

      return () => {
        clearTimeout(timeout1);
      };
    }, [
      isCopiedPayPal,
      isCopiedRaiffeisen,
      isCopiedBtcNetwork,
      isCopiedContactEmail,
      isCopiedBtcLightning,
    ]),
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

  // const toggleSwitchAutoResumeOnInterruption = () =>
  //   setIsAutoResumeEnabledOnInterruption(previousState => {
  //     localStorage.set('isAutoResumeEnabledAfterInterruption', !previousState);

  //     return !previousState;
  //   });

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

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container(globalCtx.colorSchemeValue)}>
        <View style={styles.titleContainer(width, height)}>
          <IconMaterialCommunity
            style={styles.icon(globalCtx.colorSchemeValue)}
            name={'cogs'}
            size={35}
          />
          <Text style={styles.titleText(globalCtx.colorSchemeValue)}>
            Podešavanja
          </Text>
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.switchWrapper}>
            <View style={styles.switchContainer(width, height)}>
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                Slušaj live radio samo preko WiFi
              </Text>
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
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                Slušaj online podkast samo preko WiFi
              </Text>
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
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                Downloaduj podkaste samo preko WiFi
              </Text>
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
            {/* <View style={styles.switchContainer(width, height)}>
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                Nastavi playback automatski nakon{'\n'}poziva
              </Text>
              <Switch
                trackColor={{
                  false: colorSchemeObj[globalCtx.colorSchemeValue].dark10,
                  true: colorSchemeObj[globalCtx.colorSchemeValue].light40,
                }}
                thumbColor={
                  isAutoResumeEnabledOnInterruption
                    ? colorSchemeObj[globalCtx.colorSchemeValue].light90
                    : colorSchemeObj[globalCtx.colorSchemeValue].light20
                }
                onValueChange={toggleSwitchAutoResumeOnInterruption}
                value={isAutoResumeEnabledOnInterruption}
              />
            </View> */}
          </View>

          <View style={styles.buttonContainer(width, height)}>
            <Pressable
              onPressOut={handleDeleteFiles}
              style={({pressed}) => [
                styles.button(globalCtx.colorSchemeValue),
                pressed && styles.pressedItem,
              ]}>
              <IconMaterialCommunity
                style={styles.iconButton(globalCtx.colorSchemeValue)}
                name={'delete'}
                size={25}
              />
              <Text style={styles.buttonText(globalCtx.colorSchemeValue)}>
                Obriši sve preuzete podkaste
              </Text>
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
                  Broj preuzetih podkasta: {folderContent?.length}
                </Text>
                <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                  Ukupna veličina:{' '}
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
                    !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
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
                    !globalCtx.fileNameLoadedToTrackValue.endsWith('stream') &&
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
              style={({pressed}) => [
                styles.button(globalCtx.colorSchemeValue),
                pressed && styles.pressedItem,
              ]}>
              <IconMaterialCommunity
                style={styles.iconButton(globalCtx.colorSchemeValue)}
                name={'exit-run'}
                size={25}
              />
              <Text style={styles.buttonText(globalCtx.colorSchemeValue)}>
                Izlaz iz aplikacije
              </Text>
            </Pressable>
          </View>

          <View style={styles.colorsContainer(width, height)}>
            <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
              Boja:
            </Text>
            <View style={styles.colorPickerContainer}>
              <View>
                <Pressable
                  onPress={handlePressViolet}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxViolet]} />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressCrimsonRed}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxCrimsonRed]} />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressBlue}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxBlue]} />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressPink}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxPink]} />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressGreen}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxGreen]} />
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressOrange}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxOrange]} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.aboutContainer(width, height)}>
          <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
            O aplikaciji:
          </Text>
          <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
            Verzija: 1.5.20240806
          </Text>
          <View style={styles.contactContainerDonate}>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              Autor:&nbsp;
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
            <View style={styles.contactContainerEmailDiscord}>
              <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
                {'Kontakt:   '}
              </Text>
              <View>
                <View style={styles.bitcoinContainerBtcLightning}>
                  <Pressable
                    onPress={() => {
                      Clipboard.setString('rotjko.zica@gmail.com');
                      setIsCopiedContactEmail(true);
                    }}
                    style={({pressed}) => [
                      pressed && styles.pressedItem,
                      styles.accountNumberContainer,
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
                    {`${isCopiedContactEmail ? 'Kopirano!' : ''}`}
                  </Text>
                </View>
                <View style={styles.bitcoinContainerBtcLightning}>
                  <Pressable
                    onPress={() =>
                      Linking.openURL('https://discord.com/invite/8MtjZG2Vsd')
                    }
                    style={({pressed}) => [
                      pressed && styles.pressedItem,
                      styles.accountNumberContainer,
                    ]}>
                    <IconMaterialCommunity
                      style={styles.iconWithTheLeastMargin(
                        globalCtx.colorSchemeValue,
                      )}
                      name={'discord'}
                      size={20}
                    />

                    <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                      D&M Discord segta{' '}
                    </Text>
                    <IconFeather
                      style={styles.iconWithLessMargin(
                        globalCtx.colorSchemeValue,
                      )}
                      name={'external-link'}
                      size={20}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.developerContainer(width, height)}>
          <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
            Časti aplikatora:
          </Text>
          <View style={styles.contactContainerDonatePayPal}>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              {'- PayPal-om:  '}
            </Text>
          </View>
          <View style={styles.contactContainerDonate}>
            <Text style={styles.hiddenText(globalCtx.colorSchemeValue)}>
              {'-  '}
            </Text>
            <View>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://www.paypal.com/paypalme/rotjko')
                }
                style={({pressed}) => [
                  pressed && styles.pressedItem,
                  styles.accountNumberContainer,
                ]}>
                <FastImage
                  style={{
                    width: 68,
                    height: 18,
                  }}
                  source={payPalColor}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                  paypal.me/rotjko{' '}
                </Text>
                <IconFeather
                  style={styles.iconWithLessMargin(globalCtx.colorSchemeValue)}
                  name={'external-link'}
                  size={20}
                />
              </Pressable>
            </View>

            <Text style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
              {`${isCopiedPayPal ? 'Kopirano!' : ''}`}
            </Text>
          </View>
          <View style={styles.contactContainerDonateBank}>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              {'- Uplatom na dinarski račun:  '}
            </Text>
          </View>
          <View style={styles.contactContainerDonate}>
            <Text style={styles.hiddenText(globalCtx.colorSchemeValue)}>
              {'-    '}
            </Text>
            <Pressable
              onPress={() => {
                Clipboard.setString('265-6164332-61');
                setIsCopiedRaiffeisen(true);
              }}
              style={({pressed}) => [
                pressed && styles.pressedItem,
                styles.accountNumberContainer,
              ]}>
              <FastImage
                style={{
                  width: 18,
                  height: 18,
                }}
                source={raiffeisen}
                resizeMode={FastImage.resizeMode.cover}
              />

              <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                265-6164332-61{' '}
              </Text>
              <IconMaterialCommunity
                style={styles.iconWithLessMargin(globalCtx.colorSchemeValue)}
                name={'content-copy'}
                size={20}
              />
            </Pressable>

            <Text style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
              {`${isCopiedRaiffeisen ? 'Kopirano!' : ''}`}
            </Text>
          </View>

          <View style={styles.bitcoinContainerBtcLightning1}>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              {'- Bitcoin-om:  '}
            </Text>
            <View style={styles.bitcoinContainer}>
              <View style={styles.bitcoinContainerBtcLightning}>
                <Pressable
                  onPress={() => {
                    Clipboard.setString('1GjVbbCaqqKzS9d9hiwZ7Mc99N7otdjX7H');
                    setIsCopiedBtcNetwork(true);
                  }}
                  style={({pressed}) => [
                    pressed && styles.pressedItem,
                    styles.accountNumberContainer,
                  ]}>
                  <FastImage
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    source={bitcoin}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                  <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                    BTC Network{' '}
                  </Text>
                  <IconMaterialCommunity
                    style={styles.iconWithLessMargin(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'content-copy'}
                    size={20}
                  />
                </Pressable>

                <Text style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
                  {`${isCopiedBtcNetwork ? 'Kopirano!' : ''}`}
                </Text>
              </View>
              <View style={styles.bitcoinContainerBtcLightning}>
                <Pressable
                  onPress={() => {
                    Clipboard.setString('machocoke36@walletofsatoshi.com');
                    setIsCopiedBtcLightning(true);
                  }}
                  style={({pressed}) => [
                    pressed && styles.pressedItem,
                    styles.accountNumberContainer,
                  ]}>
                  <FastImage
                    style={{
                      width: 18,
                      height: 18,
                    }}
                    source={bitcoinLightning}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                  <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                    Lightning Network{' '}
                  </Text>
                  <IconMaterialCommunity
                    style={styles.iconWithLessMargin(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'content-copy'}
                    size={20}
                  />
                </Pressable>

                <Text style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
                  {`${isCopiedBtcLightning ? 'Kopirano!' : ''}`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.quoteContainer(globalCtx.colorSchemeValue)}>
            <Text style={styles.italicText(globalCtx.colorSchemeValue)}>
              {'"Svaki bitkoin ima svoju vrednost.'}
            </Text>
            <Text style={styles.italicText(globalCtx.colorSchemeValue)}>
              {'Njegovu vrednost garantuje kompjuter."'}
            </Text>

            <View style={styles.hairline(globalCtx.colorSchemeValue)} />

            <View style={styles.thinkerContainer}>
              <FastImage
                style={{
                  width: 47,
                  height: 47,
                }}
                source={mlWobble}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View>
                <Text
                  style={styles.thinkerTextName(globalCtx.colorSchemeValue)}>
                  {'— Mladen Urdarević —'}
                </Text>
                <Text style={styles.thinkerText(globalCtx.colorSchemeValue)}>
                  {'saradnik na scenariju aplikacije'}
                </Text>
                <Text style={styles.thinkerText(globalCtx.colorSchemeValue)}>
                  {'i aforističar'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    };
  },
  developerContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? screenHeight : screenWidth,
      paddingHorizontal: '2%',
      paddingVertical: 7,
      marginTop: 10,
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
    };
  },
  hiddenText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].dark90,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
    };
  },
  italicText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light60,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
      fontStyle: 'italic',
      fontSize: 13,
    };
  },
  thinkerTextName: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light40,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
      fontSize: 13,
      paddingLeft: 15,
      textAlign: 'center',
    };
  },
  thinkerText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light50,
      fontFamily: 'sans-serif-medium',
      marginBottom: 2,
      fontSize: 12,
      paddingLeft: 15,
      fontStyle: 'italic',
      textAlign: 'center',
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
    opacity: 0.5,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContainerDonate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  contactContainerDonatePayPal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  contactContainerDonateBank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  thinkerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    alignSelf: 'flex-start',
    paddingLeft: 13,
  },
  bitcoinContainer: {
    marginVertical: 2,
  },
  bitcoinContainerBtcLightning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  bitcoinContainerBtcLightning1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  contactContainerEmailDiscord: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteContainer: colorScheme => {
    return {
      alignItems: 'center',
      marginVertical: 7,
      backgroundColor: colorSchemeObj[colorScheme].dark100,
      borderRadius: 15,
      paddingTop: 8,
      paddingBottom: 5,
      width: 250,
    };
  },
  pressableContainer: {
    marginLeft: 5,
  },
  accountNumberContainer: {
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
  },
  colorBox: {
    width: 40,
    height: 40,
    marginRight: 12,
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
  hairline: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      height: 1.5,
      width: 220,
      marginTop: 7,
      marginBottom: 3,
    };
  },
});
