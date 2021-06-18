import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from '../screens/auth/Auth';
import { Tabs } from './Tabs';
import styled from 'styled-components/native';

const Stack = createStackNavigator();

export const Router: React.FC = () => {
	let loggedIn = false;

	return (
		<RouterContainer>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="auth"
					screenOptions={{
						headerShown: false,
					}}
				>
					{loggedIn ? <Stack.Screen name="auth" component={Auth} /> : <Stack.Screen name="App" component={Tabs} />}
				</Stack.Navigator>
			</NavigationContainer>
		</RouterContainer>
	);
};

const RouterContainer = styled.View`
	flex: 1;
`;
