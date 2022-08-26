import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreens } from '../screens/settings';

const SettingsStack = createNativeStackNavigator();

export const SettingsNavigator: React.FC<{
	onNavigationStateChange: (e: any) => void;
}> = ({ onNavigationStateChange }) => {
	return (
		<SettingsStack.Navigator
			initialRouteName="settingsMain"
			screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
			screenListeners={{
				state: e => {
					onNavigationStateChange(e.data);
				},
			}}>
			<SettingsStack.Screen
				name="settingsMain"
				component={SettingsScreens.SettingsMain}
			/>
			<SettingsStack.Screen
				name="settingsNotifications"
				component={SettingsScreens.SettingsNotifications}
			/>
			<SettingsStack.Screen
				name="settingsSessions"
				component={SettingsScreens.SettingsSessions}
				options={{ gestureEnabled: true }}
			/>
			<SettingsStack.Screen
				name="settingsTheming"
				component={SettingsScreens.SettingsTheming}
				options={{ gestureEnabled: true }}
			/>
			<SettingsStack.Screen
				name="settingsUI"
				component={SettingsScreens.SettingsUI}
				options={{ gestureEnabled: true }}
			/>
		</SettingsStack.Navigator>
	);
};
