import core from '@core';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { account } from '../../core/modules';
import { Fill, Icon, Row, Spacer, Text } from '../../parts';
import { TextButton } from '../../parts/Buttons';
import { SettingsAccount } from './screens/SettingsAccount';
import { SettingsApp } from './screens/SettingsApp';
import { SettingsAppearance } from './screens/SettingsAppearance';

const SettingsStack = createStackNavigator();

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = (props) => {
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
		// await request('delete', '/auth/revoke/');
		// nav.reset({ routes: [{ name: 'Auth' }] });
		nav.goBack();
		account.state.ACCOUNT.reset();
		nav.reset({ index: 0, routes: [{ name: 'Auth' }] });
	};

	return (
		<SettingsBody>
			<Row>
				<Text size={30} weight="bold">
					Settings
				</Text>
				<Fill />
				<TextButton size={18} weight="bold" text="close" onPress={() => nav.goBack()} />
			</Row>
			<Spacer size={30} />
			<SettingsButton text="Account" routeName="Account" icon="person" />
			<SettingsButton text="Appearance" routeName="Appearance" icon="quil" />
			<SettingsButton text="App Info" routeName="Info" icon="info" />
			{/* <IconButton /> */}
			<TextButton onPress={() => logout()} weight="semi-bold" text="logout" color="#FF4B4B" />
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

const SettingsButton: React.FC<SettingsButtonProps> = ({ icon, text, routeName }) => {
	const nav = useNavigation();

	return (
		<SettingsButtonBody onPress={() => nav.navigate('Settings' + routeName)}>
			<Text weight="semi-bold" color="#363636">
				{text}
			</Text>
			<Fill />
			<Icon name={icon} size={26} color="#626e72" />
		</SettingsButtonBody>
	);
};

const SettingsButtonBody = styled(TouchableOpacity)`
	background-color: #f5f5f5;
	border-radius: 8px;
	height: 50px;
	padding: 0px 10px;
	align-items: center;
	margin-bottom: 10px;
	flex-direction: row;
`;
