import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';
import { CustomNavBar } from '../parts/components/CustomNavBar';
import { Account } from '../screens/account/Account';
import { Conversation } from '../screens/conversation/Conversation';
import { Discovery } from '../screens/discovery/Discovery';
import { EditProfile } from '../screens/edit_profile/EditProfile';
import { Friendrequests } from '../screens/friendrequests/Friendrequests';
import { Friends } from '../screens/friends/Friends';
import { Newuser } from '../screens/newuser/Newuser';
import { Messages } from '../screens/messages/Messages';
import { Profile } from '../screens/profile/Profile';
import { Search } from '../screens/search/Search';
import { Settings } from '../screens/settings/Settings';
import { Status } from '../screens/status/Status';
import { useLinking } from './Linking';

const Tab = createBottomTabNavigator();
export const AppStack = createStackNavigator();

export const AppStacks: React.FC = () => {
	const theme = useTheme();
	useLinking;
	// return (
	// 	<View style={{ flex: 1 }}>
	// 		<Spacer size={43} />
	// 		<Text color="black">dsadsa</Text>
	// 	</View>
	// );
	return (
		<AppStack.Navigator
			initialRouteName="AppTabs"
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
				headerShown: false,
				gestureEnabled: true,
				gestureResponseDistance: { vertical: 150 },
				cardOverlayEnabled: true,
				cardStyle: { backgroundColor: 'red' },
			}}
			mode="modal"
			headerMode="float"
		>
			<AppStack.Screen name="AppTabs" component={Tabs} />
			<AppStack.Screen name="CreateStatus" component={Status} />
			<AppStack.Screen name="Profile" component={Profile} />
			<AppStack.Screen name="Settings" component={Settings} />
			<AppStack.Screen name="Friendrequests" component={Friendrequests} />
			<AppStack.Screen name="SearchPeople" component={Search} />
			<AppStack.Screen name="EditProfile" component={EditProfile} />
			<AppStack.Screen name="NewUser" component={Newuser} />

		</AppStack.Navigator>
	);
};

export const Tabs: React.FC = () => {
	const theme = useTheme();
	const sceneContainerStyle = { backgroundColor: 'red' };

	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} tabBarOptions={{ style: { opacity: 0 } }}>
			<Tab.Screen name="messages" component={Messages} options={{}} />
			<Tab.Screen name="friends" component={Friends} />
			<Tab.Screen name="discovery" component={Discovery} />
			<Tab.Screen name="account" component={Account} />
			<Tab.Screen name="conversation" component={Conversation} />
		</Tab.Navigator>
	);
};
