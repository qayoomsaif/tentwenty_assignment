import React, {useCallback} from 'react';
import {Platform, StyleSheet, ViewStyle} from 'react-native';
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
        tabBarActiveTintColor: Colors.textWhite,
        tabBarInactiveTintColor: Colors.textDark,
        headerBackgroundContainerStyle: {backgroundColor: Colors.primary},
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
              <SvgXml xml={getTabIcon(name, focused)} width={18} height={18} />
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
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    height: Platform.OS == 'ios' ? 70 : 60,
  },
  hiddenTabBar: {
    position: 'absolute',
    height: 0,
    opacity: 0,
  },
  tabBarLabel: {
    fontSize: 10,
    marginTop: 4,
    color: Colors.secondary,
    textAlign: 'center',
  },
  activeLabel: {
    color: Colors.white,
    fontWeight: '600',
  },
});
