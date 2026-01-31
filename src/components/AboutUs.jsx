import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Linking,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useState, useCallback} from 'react';
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';
import {useFocusEffect} from '@react-navigation/native';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBluesky} from '@fortawesome/free-brands-svg-icons/faBluesky';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

const AboutUs = () => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const [isCopied, setIsCopied] = useState(false);

  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      let timeout1;

      if (isCopied) {
        timeout1 = setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      }

      return () => {
        clearTimeout(timeout1);
      };
    }, [isCopied]),
  );

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container(globalCtx.colorSchemeValue)}>
          <LinearGradient
            colors={[
              colorSchemeObj[globalCtx.colorSchemeValue].dark40,
              colorSchemeObj[globalCtx.colorSchemeValue].dark10,
            ]}
            style={styles.socialNetworksContainer(
              globalCtx.colorSchemeValue,
              width,
              height,
            )}>
            <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
              {t('about_us_social_networks_title')}
            </Text>
            <View style={styles.socialNetworksContainerPart}>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL('https://www.daskoimladja.com/')
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <IconMaterialCommunity
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'web'}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    www
                  </Text>
                </Pressable>
              </View>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL('https://www.facebook.com/daskoimladja/')
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <IconMaterialCommunity
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'facebook'}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    Facebook
                  </Text>
                </Pressable>
              </View>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL('https://soundcloud.com/daskoimladja')
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <IconMaterialCommunity
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'soundcloud'}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    SoundCloud
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.socialNetworksContainerPart}>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL('https://www.instagram.com/daskoimladja/')
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <IconMaterialCommunity
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'instagram'}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    Instagram
                  </Text>
                </Pressable>
              </View>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      'https://bsky.app/profile/daskoimladja.bsky.social',
                    )
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <FontAwesomeIcon
                    icon={faBluesky}
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    Bluesky
                  </Text>
                </Pressable>
              </View>
              <View style={styles.pressableContainerSocialNetworks}>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      'https://www.youtube.com/channel/UCAnjcl_5PjyoixFII4JLLdA',
                    )
                  }
                  style={({pressed}) => pressed && styles.pressedItem}>
                  <IconMaterialCommunity
                    style={styles.iconSocialNetworks(
                      globalCtx.colorSchemeValue,
                    )}
                    name={'youtube'}
                    size={40}
                  />
                  <Text
                    style={[
                      styles.textLinkSocialNetworks(globalCtx.colorSchemeValue),
                    ]}>
                    YouTube
                  </Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={[
              colorSchemeObj[globalCtx.colorSchemeValue].dark40,
              colorSchemeObj[globalCtx.colorSchemeValue].dark10,
            ]}
            style={styles.radioShowsContainer(
              globalCtx.colorSchemeValue,
              width,
              height,
            )}>
            <Text style={styles.textHeadingStory(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_title_part_1')} {'\n'}{' '}
              {t('about_us_shows_title_part_2')} "DAŠKO I MLAĐA"
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_1')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_2')}
              </Text>
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_3')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_4')}
              </Text>
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_5')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_6')}
              </Text>
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_7')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_8')}
              </Text>
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_9')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_10')}
              </Text>
            </Text>
            <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
              {t('about_us_shows_part_11')}
              {'\n'}
              <Text
                style={styles.textContentShowsTitles(
                  globalCtx.colorSchemeValue,
                )}>
                {t('about_us_shows_part_12')}
              </Text>
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={[
              colorSchemeObj[globalCtx.colorSchemeValue].dark40,
              colorSchemeObj[globalCtx.colorSchemeValue].dark10,
            ]}
            style={styles.storyContainer(
              globalCtx.colorSchemeValue,
              width,
              height,
            )}>
            <Text style={styles.textHeadingStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_title')}
            </Text>
            <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_part_1')}
            </Text>
            <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_part_2')}
            </Text>
            <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_part_3')}
            </Text>
            <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_part_4')}
            </Text>
            <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
              {t('about_us_story_part_5')}
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
  },
  container: colorScheme => {
    return {
      flex: 1,
      padding: 30,
      backgroundColor: colorSchemeObj[colorScheme].dark90,
      alignItems: 'center',
    };
  },
  radioShowsContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      marginBottom: 30,
      padding: 20,
      paddingBottom: 10,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
      shadowColor: colorSchemeObj[colorScheme].light90,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    };
  },
  socialNetworksContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      padding: 10,
      paddingTop: 20,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
      shadowColor: colorSchemeObj[colorScheme].light90,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    };
  },
  socialNetworksContainerPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },

  storyContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      padding: 20,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
      shadowColor: colorSchemeObj[colorScheme].light90,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    };
  },
  pressableContainerSocialNetworks: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeading: colorScheme => {
    return {
      fontSize: 15,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      width: '100%',
      marginBottom: 10,
      textAlign: 'center',
    };
  },
  textHeadingStory: colorScheme => {
    return {
      fontSize: 15,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      width: '100%',
      marginBottom: 20,
      textAlign: 'center',
    };
  },
  textContentStory: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
      marginBottom: 7,
    };
  },
  textContentShows: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light60,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
      marginBottom: 7,
      width: '100%',
    };
  },
  textContentShowsTitles: colorScheme => {
    return {
      fontSize: 13,
      color: colorSchemeObj[colorScheme].light90,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
      marginBottom: 7,
      width: '100%',
    };
  },
  textLinkSocialNetworks: colorScheme => {
    return {
      fontSize: 12,
      color: colorSchemeObj[colorScheme].light60,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'center',
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 10,
    };
  },
  iconSocialNetworks: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginHorizontal: 15,
    };
  },
  pressedItem: {
    opacity: 0.2,
  },
});
