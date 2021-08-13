/**
 * @format
 */

import React, { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { initCore } from './src/core';

// Disable the yellow warining box (we only want to show errors)
React.LogBox.ignoreAllLogs(true);
// console.disableYellowBox = true;

initCore();

AppRegistry.registerComponent(appName, () => App);
