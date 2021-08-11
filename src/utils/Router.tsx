import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from '../screens/auth/Auth';
import { AppStacks } from './Tabs';
import { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import core from '../core';
import { StatusBar, StatusBarStyle } from 'react-native';
import { Preloader } from './Preloader';
import { Register } from '../screens/register/Register';
import { Verify } from '../screens/verify/Verify';
import { Magic } from '../screens/magic/Magic';
import { useLinking } from './Linking';
import { DebugView } from '../screens/debug/DebugView';
import { Camera } from '../screens/camera/Camera';
import { Newpost } from '../screens/newpost/Newpost';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	useLinking;
	const theme = useTheme();
	const loggedIn = usePulse(core.account.state.logged_in);
	const ThemeMode = usePulse(core.ui.state.Theme);
	const debug_enabled = usePulse(core.app.state.debug_enabled);

	const barStyle = ((ThemeMode === 'light' ? 'dark' : 'light') + '-content') as StatusBarStyle;

	const [RouterLoaded, setRouterLoaded] = React.useState(false);
	const [Loaded, setLoaded] = React.useState(false);
	const [PreloaderReady, setPreloaderReady] = React.useState(false);

	// Checking for logged_in
	core.account.state.logged_in.onNext((v) => {
		// console.log('logged_in', v);

		// if (v) console.log('account is loaded');
		setLoaded(true);
	});

	// Wait for the preloader and logged_in compute state
	if (Loaded === false || PreloaderReady === false) {
		return <Preloader loaded={() => setPreloaderReady(true)} />;
	}

	return (
		<>
			<StatusBar barStyle={barStyle} />
			{debug_enabled && <DebugView />}
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName={loggedIn ? 'App' : 'Auth'}
					screenOptions={{
						headerShown: false,
						headerTitleStyle: { backgroundColor: theme.background },
						cardStyle: { backgroundColor: theme.background },
						cardOverlayEnabled: false,
					}}
				>
					<Stack.Screen name="Auth" component={Auth} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="Verify" component={Verify} />
					<Stack.Screen name="Magic" component={Magic} />
					<Stack.Screen name="App" component={AppStacks} />
					<Stack.Screen name="Camera" component={Camera} />
					<Stack.Screen name="Newpost" component={Newpost} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};
