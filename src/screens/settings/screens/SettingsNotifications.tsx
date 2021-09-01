import core, { request } from '@core';
import { Fill, Row, SidePadding, SmallButton, Spacer, Text, TopHeading } from '@parts';
import { usePulse } from '@pulsejs/react';
import * as React from 'react';
import { View, Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface SettingsNotificationsProps {}

export const SettingsNotifications: React.FC<SettingsNotificationsProps> = () => {
	const theme = useTheme();
	const notificationsEnabled = usePulse(core.app.state.notifications_enabled);
	// const toggleTheme = () => {};

	const enableNotifications = async () => {
		const deviceToken = core.app.state.device_push_token.value;
		const deviceID = core.app.state.device_id.value;

		await request('post', `/account/devices/${deviceID}/notifications`, { data: { token: deviceToken } });
		core.app.state.notifications_enabled.set(1);
	};

	return (
		<SettingsNotificationsBody>
			<TopHeading text="Notifications" />
			<SidePadding>
				{notificationsEnabled === 0 && (
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
					<Switch />
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
