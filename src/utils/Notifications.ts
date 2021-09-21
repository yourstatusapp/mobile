// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import core, { request } from '@core';
import PushNotification from 'react-native-push-notification';
import { app } from '../core/modules';

export const configureNotifications = () => {
	// if (!force && core.app.state.notifications_enabled.value === 2) {
	// 	return;
	// }

	PushNotification.configure({
		onRegister: async (token) => {
			console.log('REGISTER  => ', token);
			app.state.device_push_token.set(token.token);

			const current_device = core.account.collection.devices.selectors.current;

			if (current_device.id) {
				// Update the sessions token and notification on true
				await request('patch', '/account/devices/' + current_device.id, {
					data: {
						notifications: true,
						push_token: token.token,
					},
				});
			}

			core.account.collection.devices.update(current_device.id, { notifications: true });
		},
		onRegistrationError: (error) => {
			console.log('REGISTER ERROR => ', error);
		},

		onAction: async (n) => {
			await request('post', `/notifications/${n.data.payload.id}/open`);
		},

		onNotification: async (notification) => {
			console.log('NOTIFICATION => ', notification);
		},

		// IOS ONLY
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		requestPermissions: true,
	});
};
