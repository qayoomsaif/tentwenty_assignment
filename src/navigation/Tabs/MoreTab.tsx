import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import More from '../../screens/Tabs/More';

import {RootStackParamList, SCREENS} from '@navigation/index';

const Stack = createStackNavigator<RootStackParamList>();

const MoreTab: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.More} component={More} />
    </Stack.Navigator>
  );
};

export default MoreTab;
