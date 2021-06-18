/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { initCore } from './src/core';

initCore();

AppRegistry.registerComponent(appName, () => App);
