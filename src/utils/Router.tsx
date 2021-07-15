import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Auth } from '../screens/auth/Auth';
import { Tabs } from './Tabs';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '../core';
import { StatusBar, StatusBarStyle } from 'react-native';
import { Profile } from '../screens/profile/Profile';
import { Settings } from '../screens/settings/Settings';
import { Text } from '../parts';
import { Preloader } from './Preloader';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	const loggedIn = usePulse(core.account.state.LOGGED_IN);
	const ThemeMode = usePulse(core.ui.state.Theme);
	const barStyle = ((ThemeMode === 'light' ? 'dark' : 'light') + '-content') as StatusBarStyle;

	const [Loaded, setLoaded] = React.useState(false);
	const [PreloaderReady, setPreloaderReady] = React.useState(false);

	// Checking for logged_in
	core.account.state.LOGGED_IN.onNext(() => {
		setLoaded(true);
	});

	// Wait for the preloader and logged_in compute state
	if (PreloaderReady === false || Loaded === false) {
		return <Preloader loaded={() => setPreloaderReady(true)} />;
	}

	return (
		<RouterContainer>
			<StatusBar barStyle={barStyle} />
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={loggedIn ? 'App' : 'auth'}
					screenOptions={{
						...TransitionPresets.ModalPresentationIOS,
						headerShown: false,
						gestureEnabled: true,
						gestureResponseDistance: { vertical: 150 },
						cardOverlayEnabled: true,
						cardStyle: { backgroundColor: 'white' },
					}}
					mode="modal"
					headerMode="float"
				>
					{!loggedIn ? <Stack.Screen name="auth" component={Auth} /> : <Stack.Screen name="App" component={Tabs} />}
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Settings" component={Settings} />
				</Stack.Navigator>
			</NavigationContainer>
		</RouterContainer>
	);
};

const RouterContainer = styled.View`
	flex: 1;
	/* background-color: ${({ theme }) => theme.background}; */
`;
