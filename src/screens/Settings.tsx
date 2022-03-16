import React from 'react';
import { Block, Fill, Icon, IconButton, Spacer, Text, TextButton } from '@parts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { SettingsNotifications } from './Settings/index';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { SettingsSessions } from './Settings/SettingsSessions';
import { StyleSheet } from 'react-native';

const SettingsStack = createNativeStackNavigator();

const settingSections = [
	{ text: 'Notifications', route: 'settingsNotifications' },
	{ text: 'Sessions', route: 'settingsSessions' },
];

const MainScreen = () => {
	const theme = useTheme();
	const nav = useNavigation();

	return (
		<Block paddingHorizontal={20} color={theme.background}>
			<Spacer size={20} />
			{settingSections.map((item, index) => (
				<SettingItem key={index} text={item.text} onPress={() => nav.navigate(item.route as never)} />
			))}
			{/* <Text>{theme_name}</Text> */}
			{/* <TextButton onPress={toggleTheme}>toggle theme</TextButton> */}
		</Block>
	);
};

export const Settings = () => {
	const theme = useTheme();
	const theme_name = usePulse(core.ui.current_theme);
	const nav = useNavigation();

	const toggleTheme = () => {
		core.ui.current_theme.set(theme_name === 'light' ? 'dark' : 'light');
	};
	const sh = StyleSheet.flatten([{ height: 50, paddingHorizontal: 20, borderBottomColor: theme.darker, borderBottomWidth: 1 }]);

	return (
		<>
			<Block row flex={0} style={sh} color={theme.backgroundDarker} hCenter vCenter>
				<TextButton text={'Close'} onPress={() => nav.goBack()} style={{ alignSelf: 'center' }} />

				<Fill />

				<Text bold size={16} center>
					Settings
				</Text>
				<Fill />

				<IconButton name="moon" size={22} iconSize={14} color={theme.text} backgroundColor={theme.darker1} onPress={() => toggleTheme()} />
			</Block>
			{/* <Block color="black" flex={0}>
				<IconButton name="arrow-big" size={25} color="white" onPress={() => toggleTheme()} />
			</Block> */}
			<SettingsStack.Navigator initialRouteName="settingsMain" screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
				<SettingsStack.Screen name="settingsMain" component={MainScreen} />
				<SettingsStack.Screen name="settingsNotifications" component={SettingsNotifications} />
				<SettingsStack.Screen name="settingsSessions" component={SettingsSessions} options={{ gestureEnabled: true }} />
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
	const theme = useTheme();

	return (
		<Block
			style={{ paddingVertical: 15, marginBottom: 10, paddingHorizontal: 15, borderRadius: 12 }}
			flex={0}
			onPress={onPress}
			color={theme.darker}
			hCenter
			press
			row>
			<Text color={theme.text} weight="600" size={14}>
				{text}
			</Text>

			<Fill />
			<Icon name="chevron" size={15} color={theme.textFadeLight} style={{ transform: [{ rotate: '180deg' }] }} />
		</Block>
	);
};
