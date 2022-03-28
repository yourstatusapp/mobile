import React, { useEffect, useState } from 'react';
import { Block, Fill, IconButton, Text } from '@parts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { SettingsNotifications } from './Settings/index';
import { useNavigation } from '@react-navigation/native';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { SettingsSessions } from './Settings/SettingsSessions';
import { SettingsTheming } from './Settings/SettingsTheming';
import { SettingsMain } from './Settings/SettingsMain';

const SettingsStack = createNativeStackNavigator();

export const Settings = () => {
	const theme = useTheme();
	const theme_name = usePulse(core.ui.current_theme);
	const nav = useNavigation();
	const [NavigationState, SetNavigationState] = useState<any>();

	const toggleTheme = () => {
		core.ui.current_theme.set(theme_name === 'light' ? 'dark' : 'light');
	};
	useEffect(() => {
		console.log(NavigationState);
	}, [NavigationState]);

	return (
		<Block color={theme.backgroundDarker}>
			<Block
				row
				flex={0}
				style={{
					height: 50,
					paddingHorizontal: 20,
					paddingRight: 13,
					borderBottomColor: theme.background,
					borderBottomWidth: 1,
				}}
				color={theme.background}
				hCenter
				vCenter>
				<IconButton
					name="arrow-thin"
					size={22}
					color={theme.textFadeLight}
					onPress={() => nav.navigate('settingsMain' as never, { initial: false } as never)}
					backgroundColor="red"
					noBackground
					iconStyle={{ paddingRight: 15 }}
				/>
				<Fill />
				<Text bold size={16} center>
					Settings
				</Text>
				<Fill />

				<IconButton
					name="moon"
					size={22}
					iconSize={14}
					color={theme.textFade}
					backgroundColor={theme.backgroundDarker}
					onPress={() => toggleTheme()}
					noPadding
				/>
			</Block>

			<SettingsStack.Navigator
				initialRouteName="settingsMain"
				screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
				screenListeners={{ state: e => SetNavigationState(e.data) }}>
				<SettingsStack.Screen name="settingsMain" component={SettingsMain} />
				<SettingsStack.Screen name="settingsNotifications" component={SettingsNotifications} />
				<SettingsStack.Screen name="settingsSessions" component={SettingsSessions} options={{ gestureEnabled: true }} />
				<SettingsStack.Screen name="settingsTheming" component={SettingsTheming} options={{ gestureEnabled: true }} />
			</SettingsStack.Navigator>
		</Block>
	);
};
