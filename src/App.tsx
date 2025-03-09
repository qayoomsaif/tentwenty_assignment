import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider, useTheme} from './theme/ThemeContext'; // Import your ThemeProvider
import {store} from './redux/store'; // Import Redux store

import {FirebaseLoginService} from './utils/FirebaseLoginService';
import {globalStyles} from './constants/index';
import Config from 'react-native-config';
// import auth from '@react-native-firebase/auth';

import AppNavigator from './navigation/AppNavigator';
import {useFocusEffect} from '@react-navigation/native';

const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log({BASE_URL: Config.BASE_URL});
  global.log = (val: any): void => {
    console.log(val);
  };
  const signOutFirebase = async () => {
    // try {
    //   await auth().signOut();
    //   return;
    // } catch (error) {
    //   return;
    // }
  };

  useEffect(() => {
    // signOutFirebase;
  }, []);
  return (
    <View style={globalStyles.main}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </View>
  );
};

export default App;
