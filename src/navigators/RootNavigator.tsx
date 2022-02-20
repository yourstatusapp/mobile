import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import core, { AppAlert, request } from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Auth, Camera, EditProfile, Magic, NewStatus, Settings, NewMoment, PreloaderView } from '../screens';
import { NewProject } from '../screens/NewProject';
import PushNotificationIOS, { PushNotification as PushNotificationType } from '@react-native-community/push-notification-ios';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator();

export const RootNavigator = () => {
	useLinking();
	const loggedIn = usePulse(core.account.logged_in);
	const [PreloaderReady, setPreloaderReady] = useState(false);
	const pushNotifyPerm = usePulse(core.app.notification_permission);
	const device = usePulse(core.lists.devices.selectors.current);

	const onRegister = React.useCallback(
		async (deviceToken: string) => {
			core.app.notification_permission.set(1);
			core.app.device_push_token.set(deviceToken);

			if (deviceToken && loggedIn) {
				await request('patch', '/account/devices/' + device.id, {
					data: { notifications: true, push_token: deviceToken },
				});
				core.lists.devices.update(device.id, { notifications: true });
			}
		},
		[loggedIn],
	);

	const onNotification = (a: PushNotificationType) => {
		AppAlert(true, a.getActionIdentifier() || '');
	};

	const onRegisterError = (error: { message: string; code: number; details: any }) => {
		core.app.notification_permission.set(2);
		AppAlert(false, error.message, error.code + ' - ' + error.details);
	};

	useEffect(() => {
		if (loggedIn === true && pushNotifyPerm === 0) {
			PushNotificationIOS.requestPermissions();
		}
	}, [loggedIn]);

	useEffect(() => {
		PushNotificationIOS.addEventListener('register', onRegister);
		PushNotificationIOS.addEventListener('notification', onNotification);
		PushNotificationIOS.addEventListener('registrationError', onRegisterError);
		return () => {
			PushNotificationIOS.removeEventListener('register');
			PushNotificationIOS.removeEventListener('notification');
			PushNotificationIOS.removeEventListener('registrationError');
		};
	}, []);

	// Wait for the preloader and logged_in compute state
	if (PreloaderReady === false) {
		return <PreloaderView loaded={() => setPreloaderReady(true)} />;
	} else {
		return (
			<RootStack.Navigator initialRouteName={loggedIn ? 'tabs' : 'auth'} screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="tabs" component={BottomTabNavigator} />
				<RootStack.Screen name="auth" component={Auth} />
				<RootStack.Screen name="magic" component={Magic} />
				<RootStack.Screen name="new_moment" component={NewMoment} options={{ animation: 'fade' }} />
				<RootStack.Screen name="camera" component={Camera} options={{ animation: 'fade', gestureEnabled: false }} />
				<RootStack.Screen name="create_status" component={NewStatus} options={{ gestureEnabled: true }} />
				<RootStack.Screen
					name="newproject"
					component={NewProject}
					options={{
						headerShown: false,
						gestureEnabled: true,
						animationTypeForReplace: 'push',
					}}
				/>
				<RootStack.Screen name="edit_profile" component={EditProfile} options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }} />
				<RootStack.Screen name="settings" component={Settings} options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }} />
			</RootStack.Navigator>
		);
	}
};
