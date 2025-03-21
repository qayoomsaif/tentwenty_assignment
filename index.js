/**
 * @format
 */

if (__DEV__) {
  require('./ReactotronConfig');
}
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
