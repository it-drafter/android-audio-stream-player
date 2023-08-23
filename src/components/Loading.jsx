import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import headSpinner from '../assets/da-ml-fidget-spinner.gif';

const Loading = () => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container(width)}>
      <FastImage
        style={{width: 80, height: 80}}
        source={headSpinner}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: screenWidth => {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: screenWidth,
    };
  },
});
