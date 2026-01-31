import Slider from '@react-native-community/slider';
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  AppState,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import GlobalContext from '../util/context';
import {localStorage} from '../util/http';
import {colorSchemeObj} from '../util/colors';

const ProgressSlider = props => {
  const {width, height} = useWindowDimensions();
  const globalCtx = useContext(GlobalContext);
  const {position} = useProgress();
  const playBackState = usePlaybackState().state;
  const [progressValToDisplay, setProgressValToDisplay] = useState(0);
  const [forceUpdateValue, setForceUpdateValue] = useState(0);

  const handleSlidingComplete = async value => {
    await TrackPlayer.seekTo(value);
  };

  const progressValueCalculate = () => {
    switch (true) {
      case playBackState !== State.Playing:
        if (localStorage.getString('localProgressMap')) {
          const localStorageData = JSON.parse(
            localStorage.getString('localProgressMap'),
          );

          setProgressValToDisplay(localStorageData[props.fileNameFromNav] ?? 0);
        }
        break;

      case playBackState === State.Playing &&
        globalCtx.fileNameLoadedToTrackValue !== props.fileNameFromNav:
        if (localStorage.getString('localProgressMap')) {
          const localStorageDataPs2 = JSON.parse(
            localStorage.getString('localProgressMap'),
          );
          setProgressValToDisplay(
            localStorageDataPs2[props.fileNameFromNav] ?? 0,
          );
        }

        break;

      default:
        setProgressValToDisplay(position);
        break;
    }
  };

  useEffect(() => {
    progressValueCalculate();
  }, [position]);

  // force rerender to show correct progress after bringing the app to foreground from background mode
  useEffect(() => {
    AppState.addEventListener('focus', () => {
      setForceUpdateValue(prevValue => prevValue + 1);
    });
  }, []);

  const durationCalculated = () => {
    const hms = props.trackInfoFromNav.duration ?? '00:00:00';

    const hmsArr = hms.split(':');
    if (hmsArr.length === 2) {
      hmsArr.unshift('00');
    } else if (hmsArr.length === 1) {
      hmsArr.unshift('00', '00');
    }

    const seconds = +hmsArr[0] * 60 * 60 + +hmsArr[1] * 60 + +hmsArr[2];

    return seconds;
  };

  return (
    <View>
      <Slider
        value={progressValToDisplay}
        minimumValue={0}
        maximumValue={durationCalculated()}
        thumbTintColor={colorSchemeObj[globalCtx.colorSchemeValue].light20}
        minimumTrackTintColor={
          colorSchemeObj[globalCtx.colorSchemeValue].light100
        }
        maximumTrackTintColor={
          colorSchemeObj[globalCtx.colorSchemeValue].light80
        }
        style={styles.sliderContainer(width, height)}
        onSlidingComplete={handleSlidingComplete}
        disabled={
          playBackState !== State.Playing ||
          (playBackState === State.Playing &&
            globalCtx.fileNameLoadedToTrackValue !== props.fileNameFromNav)
        }
      />
      <View style={styles.timeContainer}>
        <Text style={styles.progressDurationText(globalCtx.colorSchemeValue)}>
          {new Date(progressValToDisplay * 1000)
            .toISOString()
            .substring(12, 19)}
        </Text>

        <Text style={styles.progressDurationText(globalCtx.colorSchemeValue)}>
          {props.trackInfoFromNav?.duration}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: (screenWidth, screenHeight) => {
    return {
      width: screenWidth > screenHeight ? screenWidth - 150 : screenWidth,
      marginTop: 25,
      flexDirection: 'row',
    };
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  progressDurationText: colorScheme => {
    return {
      marginTop: 1,
      color: colorSchemeObj[colorScheme].light80,
      fontFamily: 'sans-serif-thin',
      fontWeight: 'bold',
      fontSize: 13,
    };
  },
});

export default ProgressSlider;
