import React from 'react';
import core, { SettingsStackParamList } from '@core';
import { Block, Spacer, Fill, Icon, Text } from '@parts';
import { Linking } from 'react-native';
// import { removeNotificationPermissions } from '../../utils/PushNotification';
import { SettingItemMenu } from './index';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { useNavigation, useTheme } from '@hooks';
import { Icons } from '../../parts/Icon';

const settingSections: {
	text: string;
	route: keyof SettingsStackParamList;
	icon: Icons;
}[] = [
	{ text: 'Notifications', route: 'settingsNotifications', icon: 'bell' },
	{ text: 'Sessions', route: 'settingsSessions', icon: 'phone' },
	{ text: 'Appearance', route: 'settingsTheming', icon: 'brush' },
];

export const SettingsMain = () => {
	const nav = useNavigation();
	const { theme } = useTheme();
	const logout = () => {};

	return (
		<Block color={theme.background} flex={1}>
			<Spacer size={20} />
			{settingSections.map((item, index) => (
				<SettingItemMenu key={index} icon={item.icon} text={item.text} onPress={() => nav.navigate(item.route)} />
			))}
			{process.env.NODE_ENV === 'development' && (
				<>
					<Spacer size={30} />
					<SettingItemMenu icon="leave" text="UI Preview" onPress={() => nav.navigate('settingsUI')} />
				</>
			)}
			<Spacer size={30} />
			<SettingItemMenu
				icon="leave"
				text="Logout"
				textColor="#FF4848"
				iconColor="#FF4848"
				onPress={() => {
					// TODO: remove notification permissions
					// removeNotificationPermissions();
					nav.reset({ index: 1, routes: [{ name: 'Auth' }] });
					core.account.setValue(null);
					core.profile.setValue(null);
					core.myStatus.setValue([]);
					// removeNotificationPermissions();
					// nav.reset({ index: 1, routes: [{ name: 'auth' }] });
					// TODO: reset some logic
					// core.account.account.reset();
					// core.lists.devices.reset();
					// core.profile.profile.reset();
					// core.app.device_push_token.reset();
					// core.app.notification_permission.reset();
				}}
			/>
			<Block paddingHorizontal={20}>
				<Fill />
				<Block row flex={0} vCenter marginBottom={10}>
					<Text color={theme.darker2} marginRight={2} medium>
						V
					</Text>
					<Text color={theme.darker2} marginRight={8}>
						{getVersion()}
					</Text>

					<Text color={theme.darker2} bold marginRight={2} medium>
						Build:
					</Text>
					<Text color={theme.darker2}>{getBuildNumber()}</Text>
				</Block>

				<Block
					flex={0}
					row
					press
					onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')}
					marginBottom={50}
					vCenter>
					<Icon name="twitter" size={22} color="#1C9BF0" />

					<Text color="#1C9BF0" bold marginTop={3} paddingLeft={5}>
						@YourStatus
					</Text>
				</Block>
			</Block>
		</Block>
	);
};
