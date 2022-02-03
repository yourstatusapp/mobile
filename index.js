/**
 * @format
 */
import { initCore } from './src/core';
initCore();

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';

// Disable the yellow warining box (we only want to show errors)
// LogBox.ignoreLogs(['Animated: `useNativeDriver`']); TODO: NOTE SURE IF I HAVE TO USE THIS

AppRegistry.registerComponent(appName, () => App);
