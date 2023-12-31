import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Linking,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useContext} from 'react';
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';
import FastImage from 'react-native-fast-image';

import badge from '../assets/badge.png';
import patreon from '../assets/patreon.png';
import paypal from '../assets/paypal.png';
import voban from '../assets/voban.png';

const SupportUs = () => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
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
                    patreon.com/daskoimladja
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
                    paypal.me/daskoimladja
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

                <Text
                  style={[
                    styles.textLink(globalCtx.colorSchemeValue),
                    styles.pressableTextContent,
                  ]}>
                  325-9300600398707-66
                </Text>
              </View>
            </View>
          </View>
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
    };
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
  textContent: colorScheme => {
    return {
      fontSize: 14,
      color: colorSchemeObj[colorScheme].light80,
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
  pressableTextContent: {
    marginLeft: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
