import React, { useEffect } from 'react';
import PushNotificationIOS, { PushNotification as PushNotificationType } from '@react-native-community/push-notification-ios';
import core, { AppAlert, request } from '@core';
import { Platform } from 'react-native';
import { usePulse } from '@pulsejs/react';

export const removeNotificationPermissions = () => {
	if (Platform.OS === 'ios') {
		PushNotificationIOS.abandonPermissions();
	}
};

export const requestPermissions = async () => {
	if (Platform.OS === 'ios') {
		const res = await PushNotificationIOS.requestPermissions({ alert: true, badge: true, sound: true });

		if (res.authorizationStatus === 2) {
			core.app.notification_permission.set(1);
		}
	}
};

export const PushNotifications = () => {
	const loggedIn = usePulse(core.account.logged_in);
	const pushNotifyPerm = usePulse(core.app.notification_permission);

	const onRegisterDevice = async (deviceToken: string) => {
		if (!deviceToken) return;
		AppAlert(true, deviceToken);

		core.app.device_push_token.set(deviceToken);

		// check if the user is logged into the device
		const logged_in = core.account.logged_in.value;

		if (!logged_in) {
			return;
		}

		const current_device = core.lists.devices.selectors.current;

		if (!current_device?.id) {
			return;
		}

		// Update the sessions token and notification on true
		await request('patch', '/account/devices/' + current_device.id, {
			data: {
				notifications: true,
				push_token: deviceToken,
			},
		});

		core.lists.devices.update(current_device.id, { notifications: true });
	};

	const onRegisterError = (error: { message: string; code: number; details: any }) => {
		// error handling
		console.log(error);
	};

	const onRemoteNotification = async (notification: PushNotificationType) => {
		const isClicked = notification.getData().userInteraction === 1;
		const data = notification.getData();
		const notificationId = notification.getActionIdentifier();

		if (isClicked) {
			// Navigate user to another screen
			await request('post', `/notifications/${data.id}/open`);

			if (!notificationId) return;
			PushNotificationIOS.removeDeliveredNotifications([notificationId]);
		} else {
			// Do something else with push notification
		}
	};

	useEffect(() => {
		if (Platform.OS === 'ios') {
			PushNotificationIOS.addEventListener('notification', onRemoteNotification);
			PushNotificationIOS.addEventListener('register', onRegisterDevice);
			PushNotificationIOS.addEventListener('registrationError', onRegisterError);

			if (loggedIn === true && pushNotifyPerm === 0) {
				PushNotificationIOS.requestPermissions();
			}

			return () => {
				PushNotificationIOS.removeEventListener('notification');
				PushNotificationIOS.removeEventListener('register');
				PushNotificationIOS.removeEventListener('registrationError');
			};
		}
	}, []);
	return <></>;
};
