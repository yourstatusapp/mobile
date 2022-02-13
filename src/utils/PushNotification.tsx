import React, { useEffect } from 'react';
import PushNotificationIOS, { PushNotification as PushNotificationType } from '@react-native-community/push-notification-ios';
import core, { AppAlert, request } from '@core';

export const PushNotifications = () => {
	const onRegisterDevice = async (deviceToken: string) => {
		AppAlert(true, 'onRegisterDevice');
		AppAlert(true, deviceToken);
		if (!deviceToken) return;

		core.app.state.device_push_token.set(deviceToken);

		const current_device = core.account.collection.devices.selectors.current;

		// Update the sessions token and notification on true
		await request('patch', '/account/devices/' + current_device.id, {
			data: {
				notifications: true,
				push_token: deviceToken,
			},
		});

		core.account.collection.devices.update(current_device.id, { notifications: true });
	};

	const onRegisterError = (error: { message: string; code: number; details: any }) => {
		// error handling
		console.log(error);
	};

	useEffect(() => {
		PushNotificationIOS.addEventListener('notification', onRemoteNotification);
		PushNotificationIOS.addEventListener('register', onRegisterDevice);
		PushNotificationIOS.addEventListener('registrationError', onRegisterError);

		return () => {
			PushNotificationIOS.removeEventListener('notification');
			PushNotificationIOS.removeEventListener('register');
			PushNotificationIOS.removeEventListener('registrationError');
		};
	});

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
};
