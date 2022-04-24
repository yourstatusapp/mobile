import 'react-native-gesture-handler';

/**
 * @format
 */
import { initCore } from './src/core';
initCore();

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

// Disable the yellow warining box (we only want to show errors)
LogBox.ignoreLogs([
	'Animated: `useNativeDriver`',
	'RCTBridge',
	'react-native-gesture-handler',
	'style',
	'Require cycle',
	'VirtualizedLists',
]);

AppRegistry.registerComponent(appName, () => App);
