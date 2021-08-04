import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { account, ui } from '../../core/modules';
import { request } from '../../core/utils';
import { Fill, Icon, Row, Spacer, Text } from '../../parts';
import { IconButton, TextButton } from '../../parts/Buttons';
import { SettingsAccount } from './screens/SettingsAccount';
import { SettingsApp } from './screens/SettingsApp';
import { SettingsAppearance } from './screens/SettingsAppearance';

const SettingsStack = createStackNavigator();

export const Settings: React.FC = () => {
	const theme = useTheme();
	const cardStyle = { backgroundColor: theme.background };
	return (
		<SettingsStack.Navigator headerMode="none" initialRouteName="SettingsMain" screenOptions={{ cardStyle }}>
			<SettingsStack.Screen name="SettingsMain" component={SettingsMain} />
			<SettingsStack.Screen name="SettingsAccount" component={SettingsAccount} />
			<SettingsStack.Screen name="SettingsAppearance" component={SettingsAppearance} />
			<SettingsStack.Screen name="SettingsInfo" component={SettingsApp} />
		</SettingsStack.Navigator>
	);
};

const SettingsMain: React.FC = () => {
	const theme = useTheme();
	const nav = useNavigation();

	const logout = async () => {
	 	request('delete', '/auth/revoke/');
		// nav.reset({ routes: [{ name: 'Auth' }] });
		nav.goBack();
		account.state.ACCOUNT.reset();
		nav.reset({ index: 0, routes: [{ name: 'Auth' }] });
	};

	const currentTheme = usePulse(ui.state.Theme);

	const toggleTheme = () => {
		ui.state.Theme.set(currentTheme === 'light' ? 'dark' : 'light');
	};

	return (
		<SettingsBody>
			<Row>
				<Text size={30} weight="bold">
					Settings
				</Text>
				<Fill />
				<IconButton onPress={() => toggleTheme()} name="moon" size={33} iconSize={18} color={theme.textFade} />
				<Spacer size={15} />
				<TextButton size={18} weight="bold" text="close" onPress={() => nav.goBack()} />
			</Row>
			<Spacer size={30} />
			<SettingsButton text="Account" routeName="Account" icon="person" />
			<SettingsButton text="Appearance" routeName="Appearance" icon="quil" />
			<SettingsButton text="App Info" routeName="Info" icon="info" />
			<Spacer size={10} />
			<SettingsButton text="Logout" action={() => logout()} textColor="#FF4B4B" />
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
			<Text weight="medium" color={textColor || theme.textFade}>
				{text}
			</Text>
			<Fill />
			{icon && <Icon name={icon} size={20} color={theme.step4} />}
		</SettingsButtonBody>
	);
};

const SettingsButtonBody = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.step1};
	border-radius: 8px;
	height: 45px;
	padding: 0px 15px;
	align-items: center;
	margin-bottom: 10px;
	flex-direction: row;
`;
