import React, {useCallback} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DashboardTab from './DashboardTab';
import WatchTab from './WatchTab';
import MediaTab from './MediaTab';
import MoreTab from './MoreTab';
import {
  ACTIVE_DASHBOARD,
  ACTIVE_MEDIA,
  ACTIVE_MORE,
  ACTIVE_WATCH,
  INACTIVE_DASHBOARD,
  INACTIVE_MEDIA,
  INACTIVE_MORE,
  INACTIVE_WATCH,
} from '@assets/svg';
import {SvgXml} from 'react-native-svg';
import {Colors} from '@constants/Colors';
import {Text} from '@components/index';
import {width} from '@utils/resizeUtils';

const Tab = createBottomTabNavigator();

// Helper function to get the correct SVG XML based on tab and focus state
const getTabIcon = (routeName: string, focused: boolean) => {
  const icons = {
    Dashboard: focused ? ACTIVE_DASHBOARD : INACTIVE_DASHBOARD,
    Watch: focused ? ACTIVE_WATCH : INACTIVE_WATCH,
    'Media Library': focused ? ACTIVE_MEDIA : INACTIVE_MEDIA,
    More: focused ? ACTIVE_MORE : INACTIVE_MORE,
  };
  return icons[routeName] || INACTIVE_WATCH; // Default fallback
};

const BottomTabs = () => {
  const getTabBarStyle = useCallback((route: any): ViewStyle => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    console.log({routeName});

    const showTabScreens = ['Watch', 'More', 'Media', 'Dashboard', ''];

    return showTabScreens.includes(routeName)
      ? styles.tabBar
      : styles.hiddenTabBar;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: getTabBarStyle(route),
      })}>
      {[
        {name: 'Dashboard', component: DashboardTab},
        {name: 'Watch', component: WatchTab},
        {name: 'Media Library', component: MediaTab},
        {name: 'More', component: MoreTab},
      ].map(({name, component}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={getTabIcon(name, focused)}
                  width={18}
                  height={18}
                />
                <Text
                  style={[styles.tabBarLabel, focused && styles.activeLabel]}>
                  {name}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 0,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    height: 75,
    alignItems: 'center',
  },
  hiddenTabBar: {
    position: 'absolute',
    height: 0,
    opacity: 0,
  },
  iconContainer: {
    width: width / 4,
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 8,
    marginTop: 4,
    color: Colors.secondary,
  },
  activeLabel: {
    color: Colors.white,
  },
});
