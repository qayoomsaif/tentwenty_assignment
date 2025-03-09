import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './Tabs/index';
const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
