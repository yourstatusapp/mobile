import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { Block, Fill, IconButton, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PushNotifications, requestPermissions } from '../../utils/PushNotification';

export const SettingsNotifications: React.FC = () => {
	const theme = useTheme();
	const notificationsEnabled = usePulse(core.app.notification_permission);
	const CURRENT_DEVICE = usePulse(core.lists.devices.selectors.current);

	const enableNotifications = async () => {
		PushNotifications();
	};

	const UpdateDevice = async (notifications: boolean) => {
		if (!CURRENT_DEVICE?.id) {
			AppAlert(false, 'Faild', 'no device id found');
			return;
		}
		if (core.app.device_push_token?.value) {
			return;
		}

		const res = await request('patch', '/account/devices/' + CURRENT_DEVICE.id, {
			data: { notifications, push_token: notifications ? core.app.device_push_token?.value : '' },
		});
		if (res.data) {
			core.lists.devices.update(CURRENT_DEVICE.id, { notifications });
			core.lists.devices.rebuildGroupsThatInclude(CURRENT_DEVICE.id);
		}
	};

	return (
		<Block paddingHorizontal={20} color={theme.background}>
			<Spacer size={20} />
			<Text bold size={26}>
				Notifications
			</Text>
			{notificationsEnabled === 2 && (
				<Block flex={0} color="#FF6666" style={{ padding: 10, borderRadius: 8 }}>
					<Text color={theme.text} weight="600" size={14}>
						Note that you have disabled notifications
					</Text>
					<Spacer size={15} />
					<TextButton
						onPress={() => enableNotifications()}
						textSize={12}
						textColor={theme.text}
						style={{ backgroundColor: '#00000032', padding: 6, borderRadius: 4 }}>
						Allow notifications
					</TextButton>
				</Block>
			)}
			{notificationsEnabled === 0 && <TextButton onPress={() => requestPermissions()}>Allow Notifications</TextButton>}
			<Text>{JSON.stringify(core.app.device_push_token.value)}</Text>

			<Block flex={0} row paddingTop={40}>
				<Block>
					<Text size={16} bold>
						Enable Notifications
					</Text>
				</Block>
				<Fill />
				<Switch value={CURRENT_DEVICE?.notifications} onValueChange={v => UpdateDevice(v)} />
			</Block>
		</Block>
	);
};
