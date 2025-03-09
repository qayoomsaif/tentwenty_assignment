import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../../screens/Tabs/Dashboard';

import {RootStackParamList, SCREENS} from '@navigation/index';

const Stack = createStackNavigator<RootStackParamList>();

const DashboardTab: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.Dashboard} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default DashboardTab;
