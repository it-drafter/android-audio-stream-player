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
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import {useFocusEffect} from '@react-navigation/native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconFeather from 'react-native-vector-icons/Feather';

import badge from '../assets/badge.png';
import patreon from '../assets/patreon.png';
import paypal from '../assets/paypal.png';
import voban from '../assets/voban.png';

const SupportUs = () => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const [isCopied, setIsCopied] = useState(false);

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
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container(globalCtx.colorSchemeValue)}>
        <FastImage
          style={{
            width: 70,
            height: 70,
            position: 'absolute',
            top: 10,
            left: width > height ? (width - height) / 2 - 20 : 10,
            zIndex: 1,
          }}
          source={badge}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={styles.mainContentContainer(
            globalCtx.colorSchemeValue,
            width,
            height,
          )}>
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            NAŠ RAD U POTPUNOSTI ZAVISI OD VAŠIH DONACIJA.
          </Text>
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            MOŽEŠ NAS PODRŽATI NA SLEDEĆE NAČINE:
          </Text>
          <View style={styles.donationsContainer}>
            <View style={styles.donationsItemContainer}>
              <FastImage
                style={{
                  width: 70,
                  height: 70,
                }}
                source={patreon}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.donationsItemTextContainer}>
                <Text style={styles.textContent(globalCtx.colorSchemeValue)}>
                  STALNOM MESEČNOM ILI GODIŠNJOM DONACIJOM NA PATREONU:
                </Text>

                <Pressable
                  onPress={() =>
                    Linking.openURL('https://www.patreon.com/daskoimladja')
                  }
                  style={({pressed}) => [
                    pressed && styles.pressedItem,
                    styles.pressableTextContent,
                  ]}>
                  <Text style={styles.textLink(globalCtx.colorSchemeValue)}>
                    patreon.com/daskoimladja{' '}
                    <IconFeather
                      style={styles.icon(globalCtx.colorSchemeValue)}
                      name={'external-link'}
                      size={20}
                    />
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.donationsItemContainer}>
              <FastImage
                style={{
                  width: 70,
                  height: 70,
                }}
                source={paypal}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.donationsItemTextContainer}>
                <Text style={styles.textContent(globalCtx.colorSchemeValue)}>
                  PAYPALOM:
                </Text>

                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      'https://www.paypal.com/paypalme/daskoimladja',
                    )
                  }
                  style={({pressed}) => [
                    pressed && styles.pressedItem,
                    styles.pressableTextContent,
                  ]}>
                  <Text style={styles.textLink(globalCtx.colorSchemeValue)}>
                    paypal.me/daskoimladja{' '}
                    <IconFeather
                      style={styles.icon(globalCtx.colorSchemeValue)}
                      name={'external-link'}
                      size={20}
                    />
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.donationsItemContainer}>
              <FastImage
                style={{
                  width: 70,
                  height: 70,
                }}
                source={voban}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.donationsItemTextContainer}>
                <Text style={styles.textContent(globalCtx.colorSchemeValue)}>
                  UPLATOM NA NAŠ RAČUN U OTP BANCI:
                </Text>

                <Pressable
                  onPress={() => {
                    Clipboard.setString('325-9300600398707-66');
                    setIsCopied(true);
                  }}
                  style={({pressed}) => [
                    pressed && styles.pressedItem,
                    styles.pressableTextContent,
                  ]}>
                  <Text style={[styles.textLink(globalCtx.colorSchemeValue)]}>
                    325-9300600398707-66{' '}
                    <IconMaterialCommunity
                      style={styles.icon(globalCtx.colorSchemeValue)}
                      name={'content-copy'}
                      size={20}
                    />
                  </Text>
                </Pressable>

                <Text style={[styles.textTooltip(globalCtx.colorSchemeValue)]}>
                  {`${isCopied ? 'Kopirano!' : ''}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={styles.socialNetworksContainer(
            globalCtx.colorSchemeValue,
            width,
            height,
          )}>
          <Text style={styles.textHeading(globalCtx.colorSchemeValue)}>
            ZAPRATI NAS
          </Text>
          <View
            style={styles.socialNetworksContainerPart(
              globalCtx.colorSchemeValue,
            )}>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() => Linking.openURL('https://www.daskoimladja.com/')}
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'web'}
                  size={40}
                />
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/daskoimladja/')
                }
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'facebook'}
                  size={40}
                />
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://soundcloud.com/daskoimladja')
                }
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'soundcloud'}
                  size={40}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={styles.socialNetworksContainerPart(
              globalCtx.colorSchemeValue,
            )}>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/daskoimladja/')
                }
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'instagram'}
                  size={40}
                />
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() => Linking.openURL('https://x.com/daskoimladja')}
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconFontAwesome6
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'x-twitter'}
                  size={40}
                />
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() =>
                  Linking.openURL(
                    'https://www.youtube.com/channel/UCAnjcl_5PjyoixFII4JLLdA',
                  )
                }
                style={({pressed}) => pressed && styles.pressedItem}>
                <IconMaterialCommunity
                  style={styles.icon(globalCtx.colorSchemeValue)}
                  name={'youtube'}
                  size={40}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={styles.radioShowsContainer(
            globalCtx.colorSchemeValue,
            width,
            height,
          )}>
          <Text style={styles.textHeadingStory(globalCtx.colorSchemeValue)}>
            RASPORED EMISIJA {'\n'} NA RADIJU "DAŠKO I MLAĐA"
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Radnim danima (sem petka), 07h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Alarm sa Mlađom i Daškom
            </Text>
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Ponedeljak, 20h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Sportski pozdrav
            </Text>
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Utorak, 20h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Večernja škola rokenrola
            </Text>
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Sreda, 20h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Ljudi iz podzemlja
            </Text>
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Četvrtak, 20h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Na ivici ofsajda
            </Text>
          </Text>
          <Text style={styles.textContentShows(globalCtx.colorSchemeValue)}>
            Nedelja, 20h:{'\n'}
            <Text
              style={styles.textContentShowsTitles(globalCtx.colorSchemeValue)}>
              Unutrašnja emigracija
            </Text>
          </Text>
        </View>
        <View
          style={styles.storyContainer(
            globalCtx.colorSchemeValue,
            width,
            height,
          )}>
          <Text style={styles.textHeadingStory(globalCtx.colorSchemeValue)}>
            NAŠA TOPLA LJUCKA PRIČA
          </Text>
          <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
            Sve je počelo kada je Mlađa, tezgareći kao Deda Mraz, Dašku doneo
            paketić za Novu 1987. u firmi gde su radili Daškovi mama i tata.
          </Text>
          <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
            Baš smo skoro nešto računali i mislimo da se poznajemo negde oko 20
            godina. Stari drugari sa pank scene.
          </Text>
          <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
            Svirali u bendovima, pravili fanzine, radio emisije, ozbiljne
            časopise, organizovali koncerte i žurke.
          </Text>
          <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
            Ponovo se našli na zajedničkom radio poslu u rano proleće 2011. i
            otad se skoro svako jutro gledamo i slušamo.
          </Text>
          <Text style={styles.textContentStory(globalCtx.colorSchemeValue)}>
            Pored radio pregalaštva, prilično redovno se penjemo na bine i tamo
            se uživo šalimo, pevamo i blamiramo.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportUs;

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
  mainContentContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      padding: 20,
      paddingTop: 50,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
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
    };
  },
  socialNetworksContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      marginVertical: 30,
      padding: 10,
      paddingTop: 20,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
    };
  },
  socialNetworksContainerPart: colorScheme => {
    return {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      padding: 10,
    };
  },
  storyContainer: (colorScheme, screenWidth, screenHeight) => {
    return {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: colorSchemeObj[colorScheme].dark50,
      padding: 20,
      width: screenWidth > screenHeight ? screenHeight : screenWidth - 40,
      borderRadius: 15,
    };
  },
  pressableContainer: {
    marginLeft: 5,
  },
  donationsContainer: {
    width: '100%',
    marginTop: 20,
  },
  donationsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  donationsItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
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
  textContent: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light80,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
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
  textTooltip: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light10,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
    };
  },
  textLink: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light60,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-condensed',
      textAlign: 'left',
    };
  },
  icon: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light20,
      marginRight: 10,
    };
  },
  pressableTextContent: {
    marginLeft: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
