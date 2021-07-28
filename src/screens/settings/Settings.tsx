import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { account, ui } from '../../core/modules';
import { request } from '../../core/utils';
import { Fill, Row, Spacer, Text } from '../../parts';
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
		await request('delete', '/auth/revoke/');
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
				<IconButton onPress={() => toggleTheme()} name="moon" size={24} color={theme.text} />
				<Spacer size={10} />
				<TextButton size={18} weight="bold" text="close" onPress={() => nav.goBack()} />
			</Row>
			<Spacer size={30} />
			<SettingsButton text="Account" routeName="Account" icon="person" />
			<SettingsButton text="Appearance" routeName="Appearance" icon="quil" />
			<SettingsButton text="App Info" routeName="Info" icon="info" />
			<Spacer size={50} />
			<TextButton onPress={() => logout()} weight="semi-bold" size={18} text="Logout" color="#FF4B4B" />
		</SettingsBody>
	);
};

const SettingsBody = styled.View`
	flex: 1;
	padding: 20px;
`;

interface SettingsButtonProps {
	text: string;
	icon: string;
	routeName: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ text, routeName }) => {
	const nav = useNavigation();
	const theme = useTheme();

	return (
		<SettingsButtonBody onPress={() => nav.navigate('Settings' + routeName)}>
			<Text weight="medium" color={theme.text}>
				{text}
			</Text>
			{/* <Fill /> */}
			{/* <Icon name={icon} size={26} color={theme.step4} /> */}
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
