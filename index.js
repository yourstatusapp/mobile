/* eslint-disable no-undef */
/**
 * @format
 */
import { initCore } from './src/core';
import React, { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

initCore();

// import { instance } from '@pulsejs/core';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Disable the yellow warining box (we only want to show errors)
// LogBox.ignoreLogs(['Animated: `useNativeDriver`']); TODO: NOTE SURE IF I HAVE TO USE THIS
React.LogBox.ignoreAllLogs(true);


// if (__DEV__) {
// 	globalThis.AsyncStorage = AsyncStorage;
// 	globalThis.core = core;
// }

// instance.setStorage({
// 	async: true,
// 	get: AsyncStorage.getItem,
// 	set: AsyncStorage.setItem,
// 	remove: AsyncStorage.removeItem,
// });

AppRegistry.registerComponent(appName, () => App);
