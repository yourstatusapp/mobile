import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { CustomNavBar } from '../parts/components/CustomNavBar';
import { Account } from '../screens/account/Account';
import { Friends } from '../screens/friends/Friends';

const Tab = createBottomTabNavigator();

export const Tabs: React.FC = () => {
	const sceneContainerStyle = { backgroundColor: 'black' };
	return (
		<Tab.Navigator initialRouteName="friends" sceneContainerStyle={sceneContainerStyle} tabBar={(props) => <CustomNavBar {...props} />} backBehavior={'history'}>
			<Tab.Screen name="friends" component={Friends} />
			<Tab.Screen name="account" component={Account} />
		</Tab.Navigator>
	);
};
