import {StyleSheet, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {colorSchemeObj} from '../util/colors';
import {useFocusEffect} from '@react-navigation/native';

const PodcastListHint = React.memo(({colorScheme, t}) => {
  const [delayComplete, setDelayComplete] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setDelayComplete(false);

      const timeout = setTimeout(() => {
        setDelayComplete(true);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }, []),
  );

  return (
    <Text style={styles.tipsText(colorScheme)}>
      {delayComplete
        ? t('podcast_list_swipe_down')
        : t('podcast_list_podcast_list')}
    </Text>
  );
});

export default PodcastListHint;

const styles = StyleSheet.create({
  tipsText: colorScheme => {
    return {
      color: colorSchemeObj[colorScheme].light70,
    };
  },
});
