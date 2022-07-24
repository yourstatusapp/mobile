/**
 * @format
 */
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
	'Animated: `useNativeDriver`',
	'RCTBridge',
	'react-native-gesture-handler',
	'style',
	'Require cycle',
	'VirtualizedLists',
]);

AppRegistry.registerComponent(appName, () => App);
