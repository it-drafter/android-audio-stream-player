import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GlobalContext from '../util/context';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import {colorSchemeObj} from '../util/colors';
import Podcast from './Podcast';
import Stream from './Stream';

const TabTop = createMaterialTopTabNavigator();

const Main = () => {
  const globalCtx = useContext(GlobalContext);

  return (
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
          title: 'Live Radio',
          tabBarIcon: ({focused}) => (
            <IconMaterialCommunity
              style={styles.icon}
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
          title: 'Podkast',
          swipeEnabled: globalCtx.swipeEnabledValue,
          tabBarIcon: ({focused}) => (
            <IconMaterialCommunity
              style={styles.icon}
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
  );
};

export default Main;

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
