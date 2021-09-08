import core, { request } from '@core';
import { Fill, Row, SidePadding, SmallButton, Spacer, Text, TopHeading } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { View, Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { configureNotifications } from '../../../utils/Notifications';

interface SettingsNotificationsProps {}

export const SettingsNotifications: React.FC<SettingsNotificationsProps> = () => {
	const theme = useTheme();
	const notificationsEnabled = usePulse(core.app.state.notifications_enabled);
	const device = usePulse(core.account.collection.devices.selectors.current);
	// const toggleTheme = () => {};

	const enableNotifications = async () => {
		configureNotifications();
		// const device_push_token = core.app.state.device_push_token.value;

		// await request('post', `/account/devices/${device.id}`, {
		// 	data: {
		// 		notifications: true,
		// 		push_token: device_push_token,
		// 	},
		// });

		// core.app.state.notifications_enabled.set(1);
		// core.account.collection.devices.update(device.id, { notifications: true });
	};

	const UpdateDevice = async (notifications: boolean) => {
		await request('patch', '/account/devices/' + device.id, { data: { notifications } });
		core.account.collection.devices.update(device.id, { notifications });
	};

	return (
		<SettingsNotificationsBody>
			<TopHeading text="Notifications" />
			<SidePadding>
				<SmallButton text="Enable" backgroundColor="#245496" textColor="white" onPress={() => enableNotifications()} />
				{notificationsEnabled === 2 && (
					<NoticiationBoxAlert>
						<Text color="white" weight="semi-bold" size={18}>
							Notifications are disabled
						</Text>
						<Spacer size={20} />
						<Row>
							<SmallButton text="Enable" backgroundColor="#245496" textColor="white" onPress={() => enableNotifications()} />
							<Fill />
						</Row>
					</NoticiationBoxAlert>
				)}
				<Spacer size={20} />
				<Row>
					<View>
						<Text weight="semi-bold">Enable Notifications</Text>
						<Spacer size={3} />
						<Text size={14} color={theme.textFade}>
							Getting notified whenever
						</Text>
					</View>
					<Fill />
					<Switch value={device?.notifications} onValueChange={(v) => UpdateDevice(v)} />
				</Row>
			</SidePadding>
		</SettingsNotificationsBody>
	);
};

const SettingsNotificationsBody = styled.View`
	flex: 1;
`;

const NoticiationBoxAlert = styled.View`
	/* border: solid 1px #255598; */
	background-color: #3985ef;
	margin-top: 5px;
	padding: 12px;
	border-radius: 12px;
`;
