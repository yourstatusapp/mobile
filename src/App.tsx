/* eslint-disable no-undef */
// import { instance } from '@pulsejs/core';
import * as React from 'react';
import { Router } from './utils/Router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components/native';
import core from './core';
import { usePulse } from '@pulsejs/react';
import { CustomAlert } from './parts/alert/CustomAlert';

// import * as Notifications from './utils/Notifications';
if (!__DEV__) {
	console.log('__DEV__');
	require('./utils/Notifications');
	// Notifications;
}

import * as Socket from './core/socket';
Socket;

// instance.setStorage({
// 	async: true,
// 	get: AsyncStorage.getItem,
// 	set: AsyncStorage.setItem,
// 	remove: AsyncStorage.removeItem,
// });

// if (__DEV__) {
// 	globalThis.AsyncStorage = AsyncStorage;
// 	globalThis.core = core;
// }

export const App: React.FC = () => {
	const theme = usePulse(core.ui.state.ThemeObject);

	return (
		<ThemeProvider theme={theme}>
			<CustomAlert />
			<Router />
		</ThemeProvider>
	);
};
