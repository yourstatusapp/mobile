import * as React from 'react';
import { Block, Spacer, Text, TextButton } from '@parts';
import { AppState, Linking, Switch } from 'react-native';
import { SettingItem } from './index';
import { useTheme } from '@hooks';
import Notifee, { AuthorizationStatus } from '@notifee/react-native';
import { useState } from 'react';

export const SettingsNotifications: React.FC = () => {
	const { theme } = useTheme();
	const [notificationsAllowed, setNotificationsAllowed] = useState(false);
	const [showSettingsForNotifyChange, setShowSettingsForNotifyChange] = useState(false);

	const checkForNotificationPerms = async () => {
		const settings = await Notifee.getNotificationSettings();

		if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
			console.log('Notification permissions has been authorized');
			setNotificationsAllowed(true);
		} else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
			console.log('Notification permissions has been denied');
			setNotificationsAllowed(false);
		}
	};

	const allowNotifications = async () => {
		// Request for permissions
		const a = await Notifee.requestPermission();
		if (a.authorizationStatus === AuthorizationStatus.DENIED) {
			setShowSettingsForNotifyChange(true);
		}
	};

	const UpdateDevice = async (notifications: boolean) => {
		// TODO: Update device notification logic
		// const res = await request('patch', '/account/devices/' + CURRENT_DEVICE.id, {
		// 	data: { notifications, push_token: notifications ? core.app.device_push_token?.value : '' },
		// });
	};

	// listen for notification perms change
	React.useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			console.log('nextAppState', nextAppState);

			if (nextAppState === 'active') {
				checkForNotificationPerms();
			}
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<Block color={theme.background}>
			<Spacer size={20} />
			<Text bold size={26} paddingLeft={20} marginBottom={10}>
				Notifications
			</Text>
			{!notificationsAllowed && (
				<Block flex={0} paddingHorizontal={20} marginBottom={20}>
					<Block flex={0} color="#eb4a4a" marginTop={15} style={{ padding: 10, borderRadius: 8, marginHorizontal: 0 }}>
						<Text color={'#541A1A'} bold size={16}>
							The app needs device permission to allow notifications
						</Text>
						<Spacer size={15} />
						<Block row flex={0} style={{ justifyContent: 'space-between' }}>
							<TextButton
								onPress={() => allowNotifications()}
								disabled={showSettingsForNotifyChange}
								textSize={14}
								textColor={'#541A1A'}
								style={{ backgroundColor: '#00000032', padding: 5, borderRadius: 4 }}>
								Allow Notifications
							</TextButton>
							<TextButton
								onPress={() => Linking.openSettings()}
								textSize={14}
								textColor={'#541A1A'}
								style={{ backgroundColor: '#00000032', padding: 5, borderRadius: 4 }}>
								Open Settings
							</TextButton>
						</Block>
					</Block>
				</Block>
			)}

			<SettingItem
				text="Enable notifications"
				RightComponent={() => <Switch value={false} onValueChange={v => UpdateDevice(v)} />}
			/>
		</Block>
	);
};
