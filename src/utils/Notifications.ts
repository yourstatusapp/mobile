import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { app } from '../core/modules';

PushNotification.configure({
	onRegister: (token) => {
		console.log('REGISTER  => ', token);
    // const a = app.state.notifications_enabled.value;
    // if (a === 0) 
	},
	onRegistrationError: (error) => {
		console.log('REGISTER ERROR => ', error);
	},

	onNotification: (notification) => {
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
