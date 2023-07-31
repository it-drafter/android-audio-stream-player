import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalContext from '../util/context';
import {colorSchemeObj} from '../util/colors';

import PodcastList from './PodcastList';
import EpisodePlay from './EpisodePlay';

const Podcast = () => {
  const globalCtx = useContext(GlobalContext);

  const Stack = createNativeStackNavigator();

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
        options={{title: 'Podkast lista', headerShown: false}}
      />
      <Stack.Screen
        name="EpisodePlay"
        component={EpisodePlay}
        options={{title: 'Nazad na podkast listu'}}
      />
    </Stack.Navigator>
  );
};

export default Podcast;
