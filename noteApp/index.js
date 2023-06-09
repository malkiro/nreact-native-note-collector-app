/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.8.100:8080/';

AppRegistry.registerComponent(appName, () => App);
