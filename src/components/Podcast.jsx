import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';
import {useTranslation} from 'react-i18next';

import PodcastList from './PodcastList';
import EpisodePlay from './EpisodePlay';

const Podcast = () => {
  const globalCtx = useContext(GlobalContext);
  const Stack = createNativeStackNavigator();
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="PodcastList"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: colorSchemeObj[globalCtx.colorSchemeValue].light70,
        headerStyle: {
          backgroundColor: colorSchemeObj[globalCtx.colorSchemeValue].dark40,
        },
        headerTitleStyle: {fontFamily: 'sans-serif-medium'},
      }}>
      <Stack.Screen
        name="PodcastList"
        component={PodcastList}
        options={{title: t('podcast_list_podcast_list'), headerShown: false}}
      />
      <Stack.Screen
        name="EpisodePlay"
        component={EpisodePlay}
        options={{title: t('podcast_back_to_list')}}
      />
    </Stack.Navigator>
  );
};

export default Podcast;
