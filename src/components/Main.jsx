import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GlobalContext from '../util/context';
import IconMaterialCommunity from '@react-native-vector-icons/material-design-icons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {colorSchemeObj} from '../util/colors';
import Podcast from './Podcast';
import Stream from './Stream';

import {useTranslation} from 'react-i18next';

const TabTop = createMaterialTopTabNavigator();

const Main = () => {
  const globalCtx = useContext(GlobalContext);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      edges={[]}>
      <TabTop.Navigator
        initialRouteName="Stream"
        backBehavior="history"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
          tabBarActiveTintColor:
            colorSchemeObj[globalCtx.colorSchemeValue].light70,
          tabBarInactiveTintColor:
            colorSchemeObj[globalCtx.colorSchemeValue].light20,
          tabBarStyle: {
            backgroundColor: colorSchemeObj[globalCtx.colorSchemeValue].dark90,
          },
          tabBarPressColor: colorSchemeObj[globalCtx.colorSchemeValue].dark40,
          tabBarIndicatorStyle: {
            backgroundColor: colorSchemeObj[globalCtx.colorSchemeValue].light10,
            height: 7,
          },
        }}>
        <TabTop.Screen
          name="Stream"
          component={Stream}
          options={{
            title: t('main_live_radio'),
            tabBarIcon: ({focused}) => (
              <IconMaterialCommunity
                color={
                  focused
                    ? colorSchemeObj[globalCtx.colorSchemeValue].light70
                    : colorSchemeObj[globalCtx.colorSchemeValue].light20
                }
                name={'radio-tower'}
                size={25}
              />
            ),
          }}
        />
        <TabTop.Screen
          name="Podcast"
          component={Podcast}
          options={{
            title: t('main_podcast'),
            swipeEnabled: globalCtx.swipeEnabledValue,
            tabBarIcon: ({focused}) => (
              <IconMaterialCommunity
                color={
                  focused
                    ? colorSchemeObj[globalCtx.colorSchemeValue].light70
                    : colorSchemeObj[globalCtx.colorSchemeValue].light20
                }
                name={'podcast'}
                size={25}
              />
            ),
          }}
        />
      </TabTop.Navigator>
    </SafeAreaView>
  );
};

export default Main;
