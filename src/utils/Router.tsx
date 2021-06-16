import * as React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from '../screens/auth/Auth';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	return (
		<NavigationContainer independent>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="auth">
				<Stack.Screen name="auth" component={Auth} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
