import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from '../screens/auth/Auth';
import { Tabs } from './Tabs';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '../core';
import { StatusBar, StatusBarStyle } from 'react-native';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	// const theme = useTheme();
	const loggedIn = usePulse(core.account.state.LOGGED_IN);
	const ThemeMode = usePulse(core.ui.state.Theme);
	const barStyle = (ThemeMode + '-content') as StatusBarStyle;

	return (
		<RouterContainer>
			<StatusBar barStyle={barStyle} />
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="auth"
					screenOptions={{
						headerShown: false,
					}}
				>
					{!loggedIn ? <Stack.Screen name="auth" component={Auth} /> : <Stack.Screen name="App" component={Tabs} />}
				</Stack.Navigator>
			</NavigationContainer>
		</RouterContainer>
	);
};

const RouterContainer = styled.View`
	flex: 1;
	/* background-color: ${({ theme }) => theme.background}; */
`;
