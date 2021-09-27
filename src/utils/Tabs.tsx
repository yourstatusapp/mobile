import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from 'styled-components';

import { CustomNavBar } from '../parts/components/CustomNavBar';
import { Friendrequests } from '../screens/friendrequests/Friendrequests';
import { Notifications } from '../screens/notifications/Notifications';
import { Newconversation } from '../screens/newconversation/Newconversation';
import { configureNotifications } from './Notifications';

import { EditProfileView } from '../screens/edit_profile/EditProfileView';
import { SearchView } from '../screens/search/SearchView';
import { StatusView } from '../screens/status/StatusView';
import { NewfriendsView } from '../screens/newfriends/NewfriendsView';
import { DiscoveryView } from '../screens/discovery/DiscoveryView';
import { MessagesView } from '../screens/messages/MessagesView';
import { AccountView } from '../screens/account/AccountView';
import { NewuserView } from '../screens/newuser/NewuserView';
import { FriendsView } from '../screens/friends/FriendsView';
import { ProfileView } from '../screens/profile/ProfileView';
import { SettingsView } from '../screens/settings/SettingsView';
import { BrowserView } from '../screens/browser/BrowserView';

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
			<AppStack.Screen name="CreateStatus" component={StatusView} />
			<AppStack.Screen name="Settings" component={SettingsView} />
			<AppStack.Screen name="Friendrequests" component={Friendrequests} />
			<AppStack.Screen name="SearchPeople" component={SearchView} />
			<AppStack.Screen name="EditProfile" component={EditProfileView} />
			<AppStack.Screen name="NewUser" component={NewuserView} />
			<AppStack.Screen name="NewConversation" component={Newconversation} />
			<AppStack.Screen name="Browser" component={BrowserView} />
			<AppStack.Screen name="newfriends" component={NewfriendsView} />
		</AppStack.Navigator>
	);
};

export const Tabs: React.FC = () => {
	const theme = useTheme();
	const sceneContainerStyle = { backgroundColor: theme.background };

	React.useEffect(() => {
		configureNotifications();
	}, []);

	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} tabBarOptions={{ style: { opacity: 0 } }}>
			{/* <Tab.Screen name="messages" component={MessagesView} /> */}
			<Tab.Screen name="friends" component={FriendsView} />
			{/* <Tab.Screen name="discovery" component={DiscoveryView} /> */}
			<Tab.Screen name="account" component={AccountView} />

			<Tab.Screen name="notifications" component={Notifications} />
		</Tab.Navigator>
	);
};
