import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import core, { RootstackParamList } from '@core';
import { usePulse } from '@pulsejs/react';
import { useLinking } from '../hooks';
import { createNavigationContainerRef } from '@react-navigation/native';
import {
	Auth,
	Camera,
	Magic,
	NewStatus,
	Settings,
	NewMoment,
	PreloaderView,
	VerifyAccount,
	Explanation,
	ManageStatus,
	CreateEvent,
	Profile,
	Event,
	StatusDetail,
	EditProfile,
	FriendRequests,
	SearchFriend,
	ManageFriends,
} from '../screens';
import { RealtimeMomentHistory } from '../screens/RealtimeMomentHistory';
import { Block } from '@parts';
import { TabsNavigator } from './TabsNavigator';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator<RootstackParamList>();

export const RootNavigator = () => {
	useLinking();

	const loggedIn = usePulse(core.account.logged_in);
	const [PreloaderReady, setPreloaderReady] = useState(false);

	// Wait for the preloader and logged_in compute state
	// if (PreloaderReady === false) {
	// 	return <PreloaderView loaded={() => setPreloaderReady(true)} />;
	// } else {
	return (
		<Block flex={1}>
			<RootStack.Navigator
				initialRouteName={'Preloader'}
				screenOptions={{ headerShown: false, contentStyle: { zIndex: 24 } }}>
				<RootStack.Screen name="Preloader" component={PreloaderView} />
				<RootStack.Screen name="tabs" component={TabsNavigator} />
				<RootStack.Screen name="auth" component={Auth} />
				<RootStack.Screen name="magic" component={Magic} />
				<RootStack.Screen name="new_moment" component={NewMoment} options={{ animation: 'fade' }} />
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
				<RootStack.Screen
					name="profile"
					component={Profile}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="Event"
					component={Event}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="StatusDetail"
					component={StatusDetail}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="EditProfile"
					component={EditProfile}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="FriendRequests"
					component={FriendRequests}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="SearchFriend"
					component={SearchFriend}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
				<RootStack.Screen
					name="ManageFriends"
					component={ManageFriends}
					options={{
						gestureEnabled: true,
						animation: 'slide_from_left',
						presentation: 'card',
					}}
				/>
			</RootStack.Navigator>
		</Block>
	);
	// }
};
