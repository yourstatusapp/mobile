/* eslint-disable no-undef */
import { instance, usePulse } from '@pulsejs/react';
import core from '@core';

import * as React from 'react';
import { Router } from './utils/Router';
import { ThemeProvider } from 'styled-components/native';
import { CustomAlert } from './parts/alert/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalComponent } from '@parts';
// import { syncMetaData } from './utils/CodePush';

instance.setStorage({
	async: true,
	get: AsyncStorage.getItem,
	set: AsyncStorage.setItem,
	remove: AsyncStorage.removeItem,
});

if (__DEV__) {
	console.log('__DEV__', __DEV__);
}

globalThis.AsyncStorage = AsyncStorage;
globalThis.core = core;

import * as Socket from './core/socket';
import { destroyGeoListeners } from './utils/LocationService';
import { useEffect } from 'react';
Socket;

export const App: React.FC = () => {
	const theme = usePulse(core.ui.state.ThemeObject);

	useEffect(() => {
		return () => {
			destroyGeoListeners;
		};
	}, []);

	// syncMetaData();
	return (
		<ThemeProvider theme={theme}>
			<CustomAlert />
			<ModalComponent />
			<Router />
		</ThemeProvider>
	);
};
