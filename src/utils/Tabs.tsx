import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from 'styled-components';

import { CustomNavBar } from '../parts/components/CustomNavBar';
import { AccountView } from '../screens/account/AccountView';
import { Discovery } from '../screens/discovery/Discovery';
import { EditProfile } from '../screens/edit_profile/EditProfile';
import { Friendrequests } from '../screens/friendrequests/Friendrequests';
import { FriendsView } from '../screens/friends/FriendsView';
import { NewuserView } from '../screens/newuser/NewuserView';
import { MessagesScreen } from '../screens/messages/MessagesScreen';
import { Profile } from '../screens/profile/Profile';
import { SearchScreen } from '../screens/search/SearchScreen';
import { SettingsView } from '../screens/settings/SettingsView';
import { StatusScreen } from '../screens/status/StatusScreen';
import { Newfriends } from '../screens/newfriends/Newfriends';
import { Notifications } from '../screens/notifications/Notifications';
import { Newconversation } from '../screens/newconversation/Newconversation';
import { StatusinfoScreen } from '../screens/statusinfo/StatusinfoScreen';

const Tab = createBottomTabNavigator();
export const AppStack = createStackNavigator();

export const AppStacks: React.FC = () => {
	const theme = useTheme();

	return (
		<AppStack.Navigator
			initialRouteName="AppTabs"
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
				headerShown: false,
				gestureEnabled: true,
				gestureResponseDistance: { vertical: 150 },
				cardOverlayEnabled: true,
				cardStyle: { backgroundColor: theme.background },
			}}
			mode="modal"
			headerMode="float"
		>
			<AppStack.Screen name="AppTabs" component={Tabs} />
			<AppStack.Screen name="CreateStatus" component={StatusScreen} />
			<AppStack.Screen name="Profile" component={Profile} />
			<AppStack.Screen name="Settings" component={SettingsView} />
			<AppStack.Screen name="Friendrequests" component={Friendrequests} />
			<AppStack.Screen name="SearchPeople" component={SearchScreen} />
			<AppStack.Screen name="EditProfile" component={EditProfile} />
			<AppStack.Screen name="NewUser" component={NewuserView} />
			<AppStack.Screen name="NewConversation" component={Newconversation} />
			<AppStack.Screen name="Statusinfo" component={StatusinfoScreen} />
		</AppStack.Navigator>
	);
};

export const Tabs: React.FC = () => {
	const theme = useTheme();
	const sceneContainerStyle = { backgroundColor: theme.background };

	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} tabBarOptions={{ style: { opacity: 0 } }}>
			<Tab.Screen name="messages" component={MessagesScreen} />
			<Tab.Screen name="friends" component={FriendsView} />
			<Tab.Screen name="discovery" component={Discovery} />
			<Tab.Screen name="account" component={AccountView} />
			<Tab.Screen name="newfriends" component={Newfriends} />
			<AppStack.Screen name="notifications" component={Notifications} />
		</Tab.Navigator>
	);
};
