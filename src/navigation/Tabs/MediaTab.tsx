import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Media from '../../screens/Tabs/Media';

import {RootStackParamList, SCREENS} from '@navigation/index';

const Stack = createStackNavigator<RootStackParamList>();

const MediaTab: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREENS.Media} component={Media} />
    </Stack.Navigator>
  );
};

export default MediaTab;
