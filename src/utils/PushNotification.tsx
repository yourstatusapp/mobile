import React, { useEffect, useState } from 'react';
import PushNotificationIOS, { PushNotification as PushNotificationType } from '@react-native-community/push-notification-ios';

export const PushNotifications = () => {
	const [permissions, setPermissions] = useState({});

	useEffect(() => {
		PushNotificationIOS.addEventListener('notification', onRemoteNotification);
	});

	const onRemoteNotification = (notification: PushNotificationType) => {
		const isClicked = notification.getData().userInteraction === 1;

		if (isClicked) {
			// Navigate user to another screen
		} else {
			// Do something else with push notification
		}
	};
	return <></>;
};
