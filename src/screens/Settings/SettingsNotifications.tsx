import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const SettingsNotifications: React.FC = () => {
	const { colors } = useTheme();
	const a = usePulse(core.account.collection.devices.selectors.current);
	const notificationsEnabled = usePulse(core.app.state.notification_permission);
	const device = usePulse(core.account.collection.devices.selectors.current);

	const enableNotifications = async () => {
		// configureNotifications();
	};

	const UpdateDevice = async (notifications: boolean) => {
		if (!device?.id) {
			AppAlert(false, 'Faild', 'no device id found');
			return;
		}

		await request('patch', '/account/devices/' + device.id, {
			data: { notifications, push_token: notifications ? core.app.state.device_push_token.value : '' },
		});

		core.account.collection.devices.update(device.id, { notifications });
	};

	return (
		<Block paddingHorizontal={20}>
			<Spacer size={20} />
			<Text bold size={26}>
				Notifications
			</Text>
			{notificationsEnabled === 2 && (
				<Block flex={0} color="#FF6666" style={{ padding: 10, borderRadius: 8 }}>
					<Text color={colors.black} weight="600" size={14}>
						Note that you have disabled notifications
					</Text>
					<Spacer size={15} />
					<TextButton textSize={12} textColor={colors.white} style={{ backgroundColor: '#00000032', padding: 6, borderRadius: 4 }}>
						Allow notifications
					</TextButton>
				</Block>
			)}
			{notificationsEnabled === 0 && (
				<TextButton onPress={() => PushNotificationIOS.requestPermissions({ alert: true, badge: true, sound: true })}>Allow Notifications</TextButton>
			)}

			<Block flex={0} row paddingTop={40}>
				<Block>
					<Text size={14} weight="600">
						Enable Notifications
					</Text>
					<Text size={12} color={colors.white60} paddingTop={0}>
						Getting notified whenever
					</Text>
				</Block>
				<Fill />
				<Switch value={device?.notifications} onValueChange={v => UpdateDevice(v)} />
			</Block>
		</Block>
	);
};
