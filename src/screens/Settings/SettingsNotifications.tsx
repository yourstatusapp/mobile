import * as React from 'react';
import core, { AppAlert, request } from '@core';
import { Block, Fill, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';

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
			data: { notifications, push_token: notifications ? core.app.state.device_push_token.value : null },
		});

		core.account.collection.devices.update(device.id, { notifications });
	};

	return (
		<Block paddingHorizontal={20}>
			<Spacer size={20} />
			<Text bold size={26}>
				Notifications
			</Text>
			<Spacer size={20} />
			{/* <Text>{a}</Text> */}
			{notificationsEnabled === 2 ? (
				<Block flex={0}>
					<Text color="white" weight="700" size={18}>
						Notifications are disabled
					</Text>
					<Spacer size={20} />
					<Block flex={0} row>
						<TextButton text="Enable" textColor="white" onPress={() => enableNotifications()} />
						<Fill />
					</Block>
				</Block>
			) : (
				notificationsEnabled === 1 && (
					<Block flex={0}>
						<Text color="white" weight="700" size={18}>
							Notifications are disabled
						</Text>
						<Spacer size={20} />
						<Block flex={0} row>
							<TextButton text="Enable" textColor="white" onPress={() => enableNotifications()} />
							<Fill />
						</Block>
					</Block>
				)
			)}

			<Block flex={0} row>
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
