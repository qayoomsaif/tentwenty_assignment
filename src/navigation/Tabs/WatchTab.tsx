import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Watch from '@screens/Tabs/Watch';
import MovieDetail from '@screens/Tabs/Watch/MovieDetail';
import MovieTickets from '@screens/Tabs/Watch/MovieTickets';
import TicketBuying from '@screens/Tabs/Watch/TicketBuying';

import {RootStackParamList, SCREENS} from '@navigation/index';

const Stack = createStackNavigator<RootStackParamList>();

const WatchTab: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this stack
      }}
      initialRouteName={SCREENS.Watch}>
      <Stack.Screen name={SCREENS.Watch} component={Watch} />
      <Stack.Screen name={SCREENS.MovieDetail} component={MovieDetail} />
      <Stack.Screen name={SCREENS.MovieTickets} component={MovieTickets} />
      <Stack.Screen name={SCREENS.TicketBuying} component={TicketBuying} />
    </Stack.Navigator>
  );
};

export default WatchTab;