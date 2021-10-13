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
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import { Statushistory } from '../screens/statushistory/Statushistory';

const Tab = createBottomTabNavigator();
export const AppStack = createStackNavigator();

export const Tabs: React.FC = () => {
	const theme = useTheme();
	const sceneContainerStyle = { backgroundColor: theme.step2 };

	React.useEffect(() => {
		configureNotifications();
	}, []);

	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} screenOptions={{ headerShown: false }}>
			{/* <Tab.Screen name="messages" component={MessagesView} /> */}
			<Tab.Screen name="friends" component={FriendsView} />
			{/* <Tab.Screen name="discovery" component={DiscoveryView} /> */}
			<Tab.Screen name="account" component={AccountView} />

			<Tab.Screen name="notifications" component={Notifications} />
		</Tab.Navigator>
	);
};

const routes = [
	{ name: 'AppTabs', component: Tabs },
	{ name: 'CreateStatus', component: StatusView },
	{ name: 'Settings', component: SettingsView },
	{ name: 'Friendrequests', component: Friendrequests },
	{ name: 'SearchPeople', component: SearchView },
	{ name: 'EditProfile', component: EditProfileView },
	{ name: 'NewUser', component: NewuserView },
	{ name: 'NewConversation', component: Newconversation },
	{ name: 'Browser', component: BrowserView },
	{ name: 'newfriends', component: NewfriendsView },
	{ name: 'StatusHistory', component: Statushistory },
];

export const AppStacks: React.FC = () => {
	const theme = useTheme();

	return (
		<AppStack.Navigator
			initialRouteName="AppTabs"
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
				headerShown: false,
				gestureEnabled: true,
				gestureResponseDistance: 150,
				// gestureResponseDistance: { vertical: 150 },
				// cardOverlayEnabled: true,
				cardStyle: { backgroundColor: theme.background },
			}}
		>
			{routes?.map((v, i) => (
				<AppStack.Screen key={i} name={v.name} component={v.component} />
			))}
		</AppStack.Navigator>
	);
};
