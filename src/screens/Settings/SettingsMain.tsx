import { Block, Spacer, Fill, Icon, Text } from '@parts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SettingItem } from './index';

const settingSections = [
	{ text: 'Notifications', route: 'settingsNotifications', icon: 'bell' },
	{ text: 'Sessions', route: 'settingsSessions', icon: 'phone' },
	{ text: 'Theme', route: 'settingsTheming', icon: 'brush' },
];

export const SettingsMain = () => {
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<Block color={theme.backgroundDarker}>
			<Spacer size={20} />
			{settingSections.map((item, index) => (
				<SettingItem key={index} icon={item.icon} text={item.text} onPress={() => nav.navigate(item.route as never)} style={{}} />
			))}

			<Block paddingHorizontal={20}>
				<Fill />
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
