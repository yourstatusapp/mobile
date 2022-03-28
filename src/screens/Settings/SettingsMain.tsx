import core from '@core';
import { Block, Spacer, Fill, Icon, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking } from 'react-native';
import { removeNotificationPermissions } from '../../utils/PushNotification';
import { useTheme } from 'styled-components/native';
import { SettingItem, SettingItemMenu } from './index';
import { getBuildNumber, getVersion } from 'react-native-device-info';

const settingSections = [
	{ text: 'Notifications', route: 'settingsNotifications', icon: 'bell' },
	{ text: 'Sessions', route: 'settingsSessions', icon: 'phone' },
	{ text: 'Theme', route: 'settingsTheming', icon: 'brush' },
];

export const SettingsMain = () => {
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<Block color={theme.backgroundDarker} flex={1}>
			<Spacer size={20} />
			{settingSections.map((item, index) => (
				<SettingItemMenu key={index} icon={item.icon} text={item.text} onPress={() => nav.navigate(item.route as never)} style={{}} />
			))}

			<Spacer size={30} />
			<SettingItemMenu
				icon="leave"
				text="Logout"
				textColor="#FF4848"
				iconColor="#FF4848"
				onPress={() => {
					removeNotificationPermissions();
					nav.reset({ index: 1, routes: [{ name: 'auth' as never }] });
					core.account.account.reset();
					core.lists.devices.reset();
					core.profile.profile.reset();
					core.app.device_push_token.reset();
					core.app.notification_permission.reset();
				}}
			/>

			<Block paddingHorizontal={20}>
				<Fill />
				<Block row flex={0} vCenter marginBottom={10}>
					<Text color={theme.darker2} marginRight={2} weight="600">
						V
					</Text>
					<Text color={theme.darker2} marginRight={8}>
						{getVersion()}
					</Text>

					{/* <Text color={theme.darker1}>
						{` `}-{` `}
					</Text> */}
					<Text color={theme.darker2} bold marginRight={2} weight="600">
						Build:
					</Text>
					<Text color={theme.darker2}>{getBuildNumber()}</Text>
				</Block>

				<Block flex={0} row press onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')} marginBottom={50} vCenter>
					<Icon name="twitter" size={22} color="#1C9BF0" />

					<Text color="#1C9BF0" bold marginTop={3} paddingLeft={5}>
						@YourStatus
					</Text>
				</Block>
			</Block>
		</Block>
	);
};
