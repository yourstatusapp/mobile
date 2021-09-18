import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStacks } from './Tabs';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '../core';
import { StatusBar, StatusBarStyle } from 'react-native';
import { Preloader } from './Preloader';
import { Register } from '../screens/register/Register';
import { Verify } from '../screens/verify/Verify';
import { useLinking } from './Linking';
import { NewpostScreen } from '../screens/newpost/NewpostScreen';
import { useEffect } from 'react';

import { AuthScreen } from '../screens/auth/AuthScreen';
import { MagicView } from '../screens/magic/MagicView';
import { StoriesView } from '../screens/stories/StoriesView';
import { CameraView } from '../screens/camera/CameraView';
import { DebugView } from '../screens/debug/DebugView';
import { ConversationView } from '../screens/conversation/ConversationView';
import { StatusinfoScreen } from '../screens/statusinfo/StatusinfoScreen';
import { ProfileView } from '../screens/profile/ProfileView';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	useLinking;
	const theme = useTheme();
	const loggedIn = usePulse(core.account.state.logged_in);
	const ThemeMode = usePulse(core.ui.state.Theme);
	const debug_enabled = usePulse(core.app.state.debug_enabled);

	const barStyle = ((ThemeMode === 'light' ? 'dark' : 'light') + '-content') as StatusBarStyle;

	const [Loaded, setLoaded] = React.useState(false);
	const [PreloaderReady, setPreloaderReady] = React.useState(false);

	// Checking for logged_in
	core.account.state.logged_in.onNext(() => {
		setLoaded(true);
	});

	useEffect(() => {
		setTimeout(() => setLoaded(true), 2000);
	}, []);

	// Wait for the preloader and logged_in compute state
	if (Loaded === false ?? PreloaderReady === false) {
		return <Preloader loaded={() => setPreloaderReady(true)} />;
	}

	return (
		<RouterBody>
			<StatusBar barStyle={barStyle} />
			{debug_enabled && <DebugView />}
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={loggedIn ? 'App' : 'Auth'}
					screenOptions={{
						headerShown: false,
						headerTitleStyle: { backgroundColor: theme.background },
						cardStyle: { backgroundColor: theme.step0 },
						cardOverlayEnabled: false,
					}}
					detachInactiveScreens
				>
					<Stack.Screen name="Auth" component={AuthScreen} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Verify" component={Verify} />
					<Stack.Screen name="Magic" component={MagicView} />
					<Stack.Screen name="App" component={AppStacks} />
					<Stack.Screen name="Newpost" component={NewpostScreen} />

					<Stack.Screen name="Camera" component={CameraView} />
					<Stack.Screen name="Stories" component={StoriesView} />
					<Stack.Screen name="conversation" component={ConversationView} />
					<Stack.Screen name="Statusinfo" component={StatusinfoScreen} />
					{/* <Stack.Screen name="Profile" component={ProfileView} /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</RouterBody>
	);
};

const RouterBody = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
`;
