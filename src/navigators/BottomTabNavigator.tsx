import React, { useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
	Account,
	Profile,
	SearchFriend,
	FriendRequests,
	Conversations,
	DirectMessage,
	NewConversation,
	Events,
	StatusDetail,
	ManageFriends,
	Event,
	EditProfile,
} from '../screens';
import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';

import { Block } from '@parts';
import core, { TabStackNavParamList } from '@core';
import { useTheme } from '@hooks';

const TabsStackNavigator = createNativeStackNavigator<TabStackNavParamList>();

export const BottomTabNavigator: React.FC = () => {
	const { isDarkMode } = useTheme();
	// const current_tab_state = usePulse(core.app.TAB_STATE);
	const o: NativeStackNavigationOptions = {
		gestureEnabled: false,
		animation: 'none',
		contentStyle: { backgroundColor: 'black' },
	};

	const sh2 = StyleSheet.flatten<ViewStyle>([
		{ position: 'absolute', bottom: 0, height: 80, width: '100%', zIndex: 2, opacity: 1 },
	]);
	const [focusState, setFocusState] = useState<any>();

	return (
		<Block color="black">
			<TabsStackNavigator.Navigator
				screenListeners={{
					focus: (v: any) => {
						setFocusState(v);
					},
				}}
				screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
				initialRouteName={'friends'}>
				<TabsStackNavigator.Screen name="account" component={Account} options={o} />
				<TabsStackNavigator.Screen name="events" component={Events} options={o} />
				<TabsStackNavigator.Screen name="conversations" component={Conversations} options={o} />
				<TabsStackNavigator.Screen
					name="profile"
					component={Profile}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="StatusDetail"
					component={StatusDetail}
					options={{ gestureEnabled: true }}
				/>

				<TabsStackNavigator.Screen
					name="directmessage"
					component={DirectMessage}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="SearchFriend"
					component={SearchFriend}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="FriendRequests"
					component={FriendRequests}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="newconversation"
					component={NewConversation}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="ManageFriends"
					component={ManageFriends}
					options={{ gestureEnabled: true }}
				/>

				<TabsStackNavigator.Screen
					name="Event"
					component={Event}
					options={{ gestureEnabled: true }}
				/>
				<TabsStackNavigator.Screen
					name="EditProfile"
					component={EditProfile}
					options={{ gestureEnabled: true }}
				/>
			</TabsStackNavigator.Navigator>
			<BlurView style={sh2} intensity={30} tint={isDarkMode ? 'dark' : 'light'} />
		</Block>
	);
};
