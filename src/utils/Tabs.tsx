import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTheme } from 'styled-components';
import { CustomNavBar } from '../parts/components/CustomNavBar';
import { Account } from '../screens/account/Account';
import { Discovery } from '../screens/discovery/Discovery';
import { Friends } from '../screens/friends/Friends';
import { Messages } from '../screens/messages/Messages';

const Tab = createBottomTabNavigator();

export const Tabs: React.FC = () => {
	const theme = useTheme();
	const sceneContainerStyle = { backgroundColor: theme.background };

	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} backBehavior={'history'}>
			<Tab.Screen name="messages" component={Messages} />
			<Tab.Screen name="friends" component={Friends} />
			<Tab.Screen name="discovery" component={Discovery} />
			<Tab.Screen name="account" component={Account} />
		</Tab.Navigator>
	);
};
