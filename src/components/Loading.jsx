import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');

import headSpinner from '../assets/da-ml-fidget-spinner.gif';

const Loading = () => {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width,
  },
});
