/* eslint-disable no-undef */
/**
 * @format
 */
import { initCore } from './src/core';
import React, { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { startGeoLocation } from './src/utils/LocationService';
// import { CodePushWrapper } from './src/utils/CodePush';

initCore();

// Disable the yellow warining box (we only want to show errors)
// LogBox.ignoreLogs(['Animated: `useNativeDriver`']); TODO: NOTE SURE IF I HAVE TO USE THIS
React.LogBox.ignoreAllLogs(true);

// startGeoLocation();

// AppRegistry.registerComponent(appName, () => (__DEV__ === true ? App : CodePushWrapper(App)));
AppRegistry.registerComponent(appName, () => App);
