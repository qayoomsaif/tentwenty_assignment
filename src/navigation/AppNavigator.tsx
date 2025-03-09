import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

import {useSelector} from 'react-redux';

const AppNavigator = () => {
  const {token, isLoading} = useSelector((state: any) => state.user);
  console.log('APP NAVIGATOR: ', {isLoading, token});

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
