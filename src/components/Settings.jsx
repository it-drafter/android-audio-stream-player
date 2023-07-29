import {
  StyleSheet,
  Text,
  View,
  Switch,
  Dimensions,
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
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';

const {width, height} = Dimensions.get('window');

const Settings = () => {
  const globalCtx = useContext(GlobalContext);

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
        <View style={styles.titleContainer}>
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
            <View style={styles.switchContainer}>
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
            <View style={styles.switchContainer}>
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
            <View style={styles.switchContainer}>
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
          </View>

          <View style={styles.buttonContainer}>
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
                  Ukupna veličina: {(folderSize / 1000 / 1000).toFixed(2)} MB
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => RNExitApp.exitApp()}
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

          <View style={styles.colorsContainer}>
            <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
              Boja:
            </Text>
            <View style={styles.colorPickerContainer}>
              <View>
                <Pressable
                  onPress={handlePressViolet}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxViolet]}></View>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressBlue}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxBlue]}></View>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressPink}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxPink]}></View>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressGreen}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxGreen]}></View>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePressOrange}
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <View style={[styles.colorBox, styles.colorBoxOrange]}></View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTextHeading(globalCtx.colorSchemeValue)}>
            O aplikaciji:
          </Text>
          <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
            Verzija: 1.2.20230729-b
          </Text>
          <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
            Autor: Roćko
          </Text>
          <View style={styles.contactContainer}>
            <Text style={styles.regularText(globalCtx.colorSchemeValue)}>
              Kontakt:
            </Text>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://discord.com/invite/aJa7fS3')
                }
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'discord'}
                  size={30}
                />
              </Pressable>
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
    height: height * 1.2,
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
  },
  switchContainer: {
    flexDirection: 'row',
    width: width,
    paddingHorizontal: '2%',
    paddingVertical: 7,
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: width,
    paddingHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  aboutContainer: {
    width: width,
    paddingHorizontal: '2%',
    paddingVertical: 7,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    width: width,
    paddingHorizontal: '2%',
    paddingTop: 25,
    paddingBottom: 15,
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
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 10,
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
  pressableContainer: {
    marginLeft: 5,
  },
  colorsContainer: {
    width: width,
    paddingHorizontal: '2%',
    marginVertical: 20,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  colorBox: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  colorBoxViolet: {
    backgroundColor: '#6f42c1',
  },
  colorBoxBlue: {
    backgroundColor: '#4285f4',
  },
  colorBoxPink: {
    backgroundColor: '#b3446c',
  },
  colorBoxGreen: {
    backgroundColor: '#367c2b',
  },
  colorBoxOrange: {
    backgroundColor: '#d2691e',
  },
});
