import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import { AuthView, MagicView } from '../screens';
import { PreloaderView } from '../screens/Preloader';
import { NewProject } from '../screens/NewProject';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
	useLinking();
	const loggedIn = usePulse(core.account.state.logged_in);
	const [Loaded, SetLoaded] = React.useState(false);
	const [PreloaderReady, setPreloaderReady] = React.useState(false);

	const mounted = () => setTimeout(() => SetLoaded(true));

	useEffect(() => {
		mounted();
	}, []);

	useEffect(() => {
		if (loggedIn) {
			SetLoaded(true);
		}
	}, [loggedIn]);

	// Wait for the preloader and logged_in compute state
	if (Loaded === false ?? PreloaderReady === false) {
		return <PreloaderView loaded={() => setPreloaderReady(true)} />;
	}

	return (
		<RootStack.Navigator initialRouteName={loggedIn ? 'tabs' : 'auth'} screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="tabs" component={BottomTabNavigator} />
			<RootStack.Screen name="auth" component={AuthView} />
			<RootStack.Screen name="magic" component={MagicView} />
			<RootStack.Screen name="newproject" component={NewProject} options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
		</RootStack.Navigator>
	);
};
