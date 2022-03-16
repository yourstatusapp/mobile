import React, { useEffect, useState } from 'react';

/* eslint-disable no-undef */
import { instance, useEvent, usePulse } from '@pulsejs/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styled, { ThemeProvider } from 'styled-components/native';
import core, { AppAlert, StorieType } from '@core';
import { RootNavigator } from './navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, Text } from 'react-native';
import { CustomAlert } from './parts/components/Alert';
import { MenuProvider } from 'react-native-popup-menu';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { StorieViewer } from './screens';
import { SafeAreaView } from 'react-native-safe-area-context';

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
// console.log(`hermers ${!!global.HermesInternal}`);

export const App: React.FC = () => {
	const theme = usePulse(core.ui.ThemeObject);

	const [L, SetL] = useState<StorieType>();
	const [ShowStorie, SetShowStorie] = useState<boolean>(false);
	const [ClikedAtIndex, SetClikedAtIndex] = useState<number>(0);

	const onStorieViewHandler = React.useCallback(
		v => {
			if (v.stories) {
				SetL(v.stories);
				SetClikedAtIndex(v.clicked_at_index);
				SetShowStorie(true);
			} else {
				SetL(false);
			}
		},
		[ShowStorie, L],
	);

	useEffect(() => {
		core.events.storie_viewer.on(v => {
			onStorieViewHandler(v);
		});
		// if (Platform.OS === 'ios') {
		// 	PushNotificationIOS.setApplicationIconBadgeNumber(0);
		// }
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CustomAlert />
			{ShowStorie && (
				<StorieViewer
					list={L}
					onClose={() => {
						SetShowStorie(false);
					}}
					clickedAtIndex={ClikedAtIndex}
				/>
			)}
			<NavigationContainer>
				<AppBody>
					<MenuProvider>
						<StatusBar barStyle={theme.name !== 'light' ? 'light-content' : 'dark-content'} />
						<RootNavigator />
					</MenuProvider>
				</AppBody>
			</NavigationContainer>
		</ThemeProvider>
	);
};

const AppBody = styled.View`
	flex: 1;
	background-color: black;
`;
