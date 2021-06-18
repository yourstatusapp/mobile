import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Auth } from '../screens/auth/Auth';
import { Tabs } from './Tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Router: React.FC = () => {
	let loggedIn = false;

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer independent>
				<Stack.Navigator>{loggedIn ? <Stack.Screen name="auth" component={Auth} /> : <Stack.Screen name="App" component={Tabs} />}</Stack.Navigator>
			</NavigationContainer>
		</View>
	);

	// return (
	// 	<NavigationContainer independent>
	// 		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="tabs">
	// 			{/* <Stack.Screen name="tabs" component={Tabs} /> */}
	// 			<Stack.Screen name="auth" component={Auth} />
	// 		</Stack.Navigator>
	// 	</NavigationContainer>
	// );
};
