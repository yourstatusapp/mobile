import core from '@core';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { account, profile, ui } from '../../core/modules';
import { request } from '../../core/utils';
import { Fill, Icon, Row, Spacer, Text } from '../../parts';
import { IconButton, TextButton } from '../../parts/Buttons';
import DeviceInfo from 'react-native-device-info';
import { SettingsAccount, SettingsApp, SettingsAppearance, SettingsConnections, SettingsNotifications } from './screens';

const SettingsStack = createStackNavigator();

export const SettingsView: React.FC = () => {
	const theme = useTheme();
	const cardStyle = { backgroundColor: theme.background };
	return (
		<SettingsStack.Navigator headerMode="none" initialRouteName="SettingsMain" screenOptions={{ cardStyle }}>
			<SettingsStack.Screen name="SettingsMain" component={SettingsMain} />
			<SettingsStack.Screen name="SettingsAccount" component={SettingsAccount} />
			<SettingsStack.Screen name="SettingsAppearance" component={SettingsAppearance} />
			<SettingsStack.Screen name="SettingsInfo" component={SettingsApp} />
			<SettingsStack.Screen name="SettingsNotifications" component={SettingsNotifications} />
			<SettingsStack.Screen name="SettingsConnections" component={SettingsConnections} />
		</SettingsStack.Navigator>
	);
};

interface SettingsMainProps {
	navigation: {
		popToTop: Function;
	};
	route: {
		key: string;
		name: string;
		params: any;
	};
}

const SettingsMain: React.FC<SettingsMainProps> = (props) => {
	const theme = useTheme();
	const nav = useNavigation();

	React.useEffect(() => {
		console.log(props);
	}, [props]);

	const logout = async () => {
		await request('delete', '/account/devices/current/revoke');
		nav.reset({ index: 0, routes: [{ name: 'Auth' }] });

		setTimeout(() => {
			account.state.ACCOUNT.reset();
			profile.state.PROFILE.reset();
			core.conversations.collection.reset();
			core.message.collection.reset();
			core.app.state.device_id.reset();
			core.app.state.notifications_enabled.reset();
		}, 500);
	};

	const currentTheme = usePulse(ui.state.Theme);

	const toggleTheme = () => {
		core.app.state.use_system_theme.set(false);
		ui.state.Theme.set(currentTheme === 'light' ? 'dark' : 'light');
	};

	// const toggleDebug = () => core.app.state.debug_enabled.set(!core.app.state.debug_enabled.value);

	return (
		<SettingsBody>
			<Row>
				<Text size={30} weight="bold">
					Settings
				</Text>
				<Fill />
				<IconButton onPress={() => toggleTheme()} name="moon" size={33} color={theme.text} />
				<Spacer size={15} />
				<TextButton size={18} weight="semi-bold" text="close" onPress={() => nav.goBack()} />
			</Row>
			<Spacer size={20} />

			<SettingsButton text="Account" routeName="Account" icon="person" />
			<SettingsButton text="Notifications" routeName="Notifications" icon="bell" />
			<SettingsButton text="Appearance" routeName="Appearance" icon="quil" />
			{/* <SettingsButton text="Connections" routeName="Connections" icon="link" /> */}
			<SettingsButton text="App Info" routeName="Info" icon="info" />
			{/* <SettingsButton text="Toggle Debug" action={() => toggleDebug()} textColor="#4b9fff" /> */}
			<Spacer size={20} />
			<SettingsButton text="Logout" action={() => logout()} textColor="#FF4B4B" />
			<Spacer size={20} />
			<Text center size={12} color={theme.textFade}>
				version: beta.{DeviceInfo?.getBuildNumber()}
			</Text>
			<Spacer size={50} />
		</SettingsBody>
	);
};

const SettingsBody = styled.View`
	flex: 1;
	padding: 20px;
`;

interface SettingsButtonProps {
	text: string;
	textColor?: string;
	icon?: string;
	routeName?: string;
	action?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ text, routeName, icon, action, textColor }) => {
	const nav = useNavigation();
	const theme = useTheme();

	return (
		<SettingsButtonBody onPress={() => (action ? action() : nav.navigate('Settings' + routeName))}>
			<Text weight="medium" size={16} color={textColor || theme.text}>
				{text}
			</Text>
			<Fill />
			{icon && <Icon name={icon} size={20} color={theme.textFade} />}
		</SettingsButtonBody>
	);
};

const SettingsButtonBody = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.step1};
	border-radius: 8px;
	height: 50px;
	padding: 0px 15px;
	align-items: center;
	margin-bottom: 10px;
	flex-direction: row;
`;
