import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import { AuthView, MagicView, NewStatus, Settings } from '../screens';
import { PreloaderView } from '../screens/Preloader';
import { NewProject } from '../screens/NewProject';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
	useLinking();
	const loggedIn = usePulse(core.account.state.logged_in);
	const [Loaded, SetLoaded] = useState(false);
	const [PreloaderReady, setPreloaderReady] = useState(false);

	const mounted = () => setTimeout(() => SetLoaded(true));

	// useEffect(() => {
	// 	// mounted();
	// }, []);

	// useEffect(() => {
	// 	if (loggedIn) {
	// 		SetLoaded(true);
	// 	}
	// }, [loggedIn]);

	// Wait for the preloader and logged_in compute state
	if (PreloaderReady === false) {
		return <PreloaderView loaded={() => setPreloaderReady(true)} />;
	} else {
		return (
			<RootStack.Navigator initialRouteName={loggedIn ? 'tabs' : 'auth'} screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="tabs" component={BottomTabNavigator} />
				<RootStack.Screen name="auth" component={AuthView} />
				<RootStack.Screen name="magic" component={MagicView} />
				<RootStack.Screen name="create_status" component={NewStatus} options={{ gestureEnabled: true }} />
				<RootStack.Screen
					name="newproject"
					component={NewProject}
					options={{
						headerShown: false,
						gestureEnabled: true,
						animationTypeForReplace: 'push',
						// gestureResponseDistance: { vertical: 150 },
						// cardOverlayEnabled: true,
					}}
				/>
				<RootStack.Screen name="settings" component={Settings} options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }} />
			</RootStack.Navigator>
		);
	}
};
