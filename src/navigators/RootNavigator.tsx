import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import core, { AppAlert, request } from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import { AuthView, EditProfile, MagicView, NewStatus, Settings } from '../screens';
import { PreloaderView } from '../screens/Preloader';
import { NewProject } from '../screens/NewProject';
import PushNotificationIOS, { PushNotification as PushNotificationType } from '@react-native-community/push-notification-ios';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
	useLinking();
	const loggedIn = usePulse(core.account.state.logged_in);
	const [Loaded, SetLoaded] = useState(false);
	const [PreloaderReady, setPreloaderReady] = useState(false);
	const pushNotifyPerm = usePulse(core.app.state.notification_permission);
	const device = usePulse(core.account.collection.devices.selectors.current);

	const mounted = () => setTimeout(() => SetLoaded(true));

	// useEffect(() => {
	// 	// mounted();
	// }, []);

	// useEffect(() => {
	// 	if (loggedIn) {
	// 		SetLoaded(true);
	// 	}
	// }, [loggedIn]);

	const onRegister = async (deviceToken: string) => {
		core.app.state.notification_permission.set(1);
		core.app.state.device_push_token.set(deviceToken);

		AppAlert(true, deviceToken);
		if (deviceToken && loggedIn) {
			await request('patch', '/account/devices/' + device.id, {
				data: { notifications: true, push_token: deviceToken },
			});
		}
	};

	const onNotification = (a: PushNotificationType) => {
		AppAlert(true, a.getActionIdentifier() || '');
	};

	const onRegisterError = (error: { message: string; code: number; details: any }) => {
		core.app.state.notification_permission.set(2);
		AppAlert(true, error.message, error.code + ' - ' + error.details);
	};

	useEffect(() => {
		if (loggedIn === true && PreloaderReady === true && pushNotifyPerm === 0) {
			// PushNotificationIOS.requestPermissions();
			PushNotificationIOS.addEventListener('register', onRegister);
			PushNotificationIOS.addEventListener('notification', onNotification);
			PushNotificationIOS.addEventListener('registrationError', onRegisterError);
		}

		return () => {
			PushNotificationIOS.removeEventListener('register');
			PushNotificationIOS.removeEventListener('notification');
		};
	}, [PreloaderReady, loggedIn, pushNotifyPerm]);

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
				<RootStack.Screen name="edit_profile" component={EditProfile} options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }} />
				<RootStack.Screen name="settings" component={Settings} options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }} />
			</RootStack.Navigator>
		);
	}
};
