import React from 'react';

/* eslint-disable no-undef */
import { instance, usePulse } from '@pulsejs/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled, { ThemeProvider } from 'styled-components/native';
import core from '@core';
import { RootNavigator } from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

instance.setStorage({
	async: true,
	get: AsyncStorage.getItem,
	set: AsyncStorage.setItem,
	remove: AsyncStorage.removeItem,
});

if (__DEV__) {
	console.log('__DEV__', __DEV__);
}

// @ts-ignore
globalThis.AsyncStorage = AsyncStorage; // @ts-ignore
globalThis.core = core;

// @ts-ignore
console.log(`hermers ${!!global.HermesInternal}`);

export const App: React.FC = () => {
	const theme = usePulse(core.ui.state.ThemeObject);

	return (
		<NavigationContainer>
			<AppBody>
				<ThemeProvider theme={theme}>
					<RootNavigator />
				</ThemeProvider>
			</AppBody>
		</NavigationContainer>
	);
};

const AppBody = styled.View`
	flex: 1;
	background-color: black;
`;
