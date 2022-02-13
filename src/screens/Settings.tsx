import React from 'react';
import { Block, Fill, Icon, ModalHeader, Spacer, Text } from '@parts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { SettingsNotifications } from './Settings/index';
import { useNavigation } from '@react-navigation/native';

const SettingsStack = createNativeStackNavigator();

const settingSections = [
	{ text: 'Notifications', route: 'settingsNotifications' },
	{ text: 'Notifications', route: 'settingsNotifications' },
];

const MainScreen = () => {
	const nav = useNavigation();
	return (
		<Block paddingHorizontal={20}>
			<Spacer size={20} />
			{settingSections.map((item, index) => (
				<SettingItem key={index} text={item.text} onPress={() => nav.navigate(item.route as never)} />
			))}
		</Block>
	);
};

export const Settings = () => {
	const { colors, theme } = useTheme();
	return (
		<>
			<ModalHeader title="Settings" />
			<SettingsStack.Navigator initialRouteName="settingsMain" screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
				<SettingsStack.Screen name="settingsMain" component={MainScreen} />
				<SettingsStack.Screen name="settingsNotifications" component={SettingsNotifications} />
			</SettingsStack.Navigator>
			{/* <Block paddingHorizontal={20}>
				<Spacer size={25} />
				<Text>Coming More Soon</Text>
				<Spacer size={20} />
				<Row>
					<Block flex={0} vCenter hCenter row press onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')}>
						<Icon name="twitter" size={25} color="#1C9BF0" />
						<Spacer size={5} h />
						<Text color="#1C9BF0" bold>
							@YourStatus
						</Text>
					</Block>
				</Row>
			</Block> */}
		</>
	);
};

export const SettingItem = ({ text, onPress }: { text: string; onPress: () => void }) => {
	const { colors, theme } = useTheme();

	return (
		<Block
			style={{ paddingVertical: 15, marginBottom: 10, paddingHorizontal: 15, borderRadius: 12 }}
			flex={0}
			onPress={onPress}
			color={colors.white10}
			hCenter
			press
			row>
			<Icon name="bell" size={20} color={colors.white} />
			<Spacer size={15} h />
			<Text color={colors.white} weight="600">
				{text}
			</Text>
			<Fill />
			<Icon name="chevron" size={15} color={colors.white60} style={{ transform: [{ rotate: '180deg' }] }} />
		</Block>
	);
};
