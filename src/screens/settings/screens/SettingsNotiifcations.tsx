import { Fill, Row, SidePadding, Spacer, Text, TopHeading } from '@parts';
import * as React from 'react';
import { View, Switch } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface SettingsNotificationsProps {}

export const SettingsNotifications: React.FC<SettingsNotificationsProps> = (props) => {
	const theme = useTheme();

	const toggleTheme = () => {};

	return (
		<SettingsNotificationsBody>
			<TopHeading text="Notifications" />
			<SidePadding>
				<Row>
					<View>
						<Text weight="semi-bold">Enable Notifications</Text>
						<Spacer size={3} />
						<Text size={14} color={theme.textFade}>
							Getting notified whenever
						</Text>
					</View>
					<Fill />
					{/* <Switch
						trackColor={{ false: theme.background, true: theme.primary }}
						thumbColor={true ? theme.step1 : theme.background}
						ios_backgroundColor={theme.step1}
						onValueChange={toggleTheme}
						value={t === 'dark'}
						disabled={true === true}
					/> */}
				</Row>
			</SidePadding>
		</SettingsNotificationsBody>
	);
};

const SettingsNotificationsBody = styled.View`
	flex: 1;
`;
