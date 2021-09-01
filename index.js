/* eslint-disable no-undef */
/**
 * @format
 */

import React, { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { initCore } from './src/core';
import { instance } from '@pulsejs/core';
import core from './src/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Disable the yellow warining box (we only want to show errors)
React.LogBox.ignoreAllLogs(true);
// console.disableYellowBox = true;

initCore();

if (__DEV__) {
	globalThis.AsyncStorage = AsyncStorage;
	globalThis.core = core;
}

instance.setStorage({
	async: true,
	get: AsyncStorage.getItem,
	set: AsyncStorage.setItem,
	remove: AsyncStorage.removeItem,
});

AppRegistry.registerComponent(appName, () => App);
