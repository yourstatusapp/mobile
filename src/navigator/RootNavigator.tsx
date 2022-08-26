import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import core, { RootstackParamList } from '@core';
import { createNavigationContainerRef } from '@react-navigation/native';

import { Block } from '@parts';
import { StatusBar } from 'react-native';
import { useSimple } from 'simple-core-state';
import {
	Auth,
	CreateStatus,
	EditProfile,
	FriendRequests,
	FriendsList,
	Magic,
	ManageStatus,
	Preloader,
	Profile,
	SearchProfile,
	StatusDetail,
} from '../screens';
import { TabsNavigator } from './TabsNavigator';
import { useLinking } from '@hooks';
import { SettingsScreens } from '../screens/settings';
import { Settings } from '../screens/settings/Settings';

export const navigationRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator<RootstackParamList>();

export const RootNavigator = () => {
	useLinking();
	const themeName = useSimple(core.currentTheme);

	return (
		<Block flex={1}>
			<StatusBar barStyle={themeName === 'light' ? 'dark-content' : 'light-content'} />
			<RootStack.Navigator
				initialRouteName={'Preloader'}
				screenOptions={{
					headerShown: false,
					contentStyle: { zIndex: 24 },
				}}>
				<RootStack.Screen name="Auth" component={Auth} />
				<RootStack.Screen name="Magic" component={Magic} />
				<RootStack.Screen name="Preloader" component={Preloader} />
				<RootStack.Screen name="Tabs" component={TabsNavigator} />
				<RootStack.Screen name="Profile" component={Profile} />
				<RootStack.Screen name="CreateStatus" component={CreateStatus} />
				<RootStack.Screen name="StatusDetail" component={StatusDetail} />
				<RootStack.Screen name="EditProfile" component={EditProfile} />
				<RootStack.Screen name="FriendsList" component={FriendsList} />
				<RootStack.Screen name="SearchProfile" component={SearchProfile} />
				<RootStack.Screen name="Settings" component={Settings} />
				<RootStack.Screen name="FriendRequests" component={FriendRequests} />
				<RootStack.Screen name="ManageStatus" component={ManageStatus} />
				{/* <RootStack.Screen name="Auth" component={Test} /> */}
			</RootStack.Navigator>
		</Block>
	);
	// }
};
