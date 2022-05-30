import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import core, { RootstackParamList } from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import {
	Auth,
	Camera,
	EditProfile,
	Magic,
	NewStatus,
	Settings,
	NewMoment,
	PreloaderView,
	VerifyAccount,
	Explanation,
	ManageStatus,
	CreateEvent,
} from '../screens';
import { NewProject } from '../screens/NewProject';
import { RealtimeMomentHistory } from '../screens/RealtimeMomentHistory';
import { Block } from '@parts';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator<RootstackParamList>();

export const RootNavigator = () => {
	useLinking();

	const loggedIn = usePulse(core.account.logged_in);
	const [PreloaderReady, setPreloaderReady] = useState(false);

	// Wait for the preloader and logged_in compute state
	if (PreloaderReady === false) {
		return <PreloaderView loaded={() => setPreloaderReady(true)} />;
	} else {
		return (
			<Block flex={1}>
				<RootStack.Navigator
					initialRouteName={loggedIn ? 'tabs' : 'auth'}
					screenOptions={{ headerShown: false, contentStyle: { zIndex: 24 } }}>
					<RootStack.Screen name="tabs" component={BottomTabNavigator} />
					<RootStack.Screen name="auth" component={Auth} />
					<RootStack.Screen name="magic" component={Magic} />
					<RootStack.Screen
						name="new_moment"
						component={NewMoment}
						options={{ animation: 'fade' }}
					/>
					{/* <RootStack.Screen name="camera" component={Camera} options={{ animation: 'fade', gestureEnabled: false }} /> */}
					<RootStack.Screen
						name="create_status"
						component={NewStatus}
						options={{ gestureEnabled: true }}
					/>
					<RootStack.Screen
						name="CreateEvent"
						component={CreateEvent}
						options={{ gestureEnabled: true }}
					/>
					<RootStack.Screen
						name="newproject"
						component={NewProject}
						options={{
							headerShown: false,
							gestureEnabled: true,
							animationTypeForReplace: 'push',
						}}
					/>
					<RootStack.Screen
						name="edit_profile"
						component={EditProfile}
						options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }}
					/>
					<RootStack.Screen
						name="settings"
						component={Settings}
						options={{
							gestureEnabled: true,
							animation: 'default',
							presentation: 'modal',
							contentStyle: { zIndex: 25 },
						}}
					/>
					<RootStack.Screen name="Camera" component={Camera} />

					<RootStack.Screen
						name="manage_status"
						component={ManageStatus}
						options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }}
					/>
					<RootStack.Screen
						name="explanation"
						component={Explanation}
						options={{ gestureEnabled: false, animation: 'default', presentation: 'modal' }}
					/>
					<RootStack.Screen
						name="realtime_history"
						component={RealtimeMomentHistory}
						options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }}
					/>
					<RootStack.Screen
						name="verify_account"
						component={VerifyAccount}
						options={{ gestureEnabled: true, animation: 'default', presentation: 'modal' }}
					/>
				</RootStack.Navigator>
			</Block>
		);
	}
};
