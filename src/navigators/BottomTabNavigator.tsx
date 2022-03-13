import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import { Account, Friends, Profile, SearchFriend, FriendRequests } from '../screens';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';

import { Avatar, Block, Icon, IconButton } from '@parts';
import core from '@core';

const TabsStackNavigator = createNativeStackNavigator();

export const BottomTabNavigator: React.FC = () => {
	const current_tab_state = usePulse(core.app.TAB_STATE);
	const isDarkMode = usePulse(core.ui.isDarkMode);
	const o: NativeStackNavigationOptions = {
		gestureEnabled: false,
		animation: 'none',
		contentStyle: { backgroundColor: 'black' },
	};

	const sh2 = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', bottom: 0, height: 80, width: '100%', zIndex: 0, opacity: 1 }]);

	return (
		<Block color="black">
			<TabsStackNavigator.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_left' }} initialRouteName={current_tab_state.path_name}>
				<TabsStackNavigator.Screen name="account" component={Account} options={o} />
				<TabsStackNavigator.Screen name="friends" component={Friends} options={o} />
				{/* <TabsStackNavigator.Screen name="moments" component={Moments} options={o} /> */}
				<TabsStackNavigator.Screen name="profile" component={Profile} options={{ gestureEnabled: true }} />
				{/* <TabsStackNavigator.Screen name="ManageFriends" component={Profile} options={{ gestureEnabled: true }} /> */}
				<TabsStackNavigator.Screen name="SearchFriend" component={SearchFriend} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="FriendRequests" component={FriendRequests} options={{ gestureEnabled: true }} />
			</TabsStackNavigator.Navigator>

			{/* <BlurView style={sh2} blurType="extraDark" blurAmount={5} blurRadius={10} /> */}
			<BlurView style={sh2} intensity={80} tint={isDarkMode ? 'dark' : 'light'} />
			<CustomNavBar />
		</Block>
	);
};

const CustomNavBar = () => {
	const acc = usePulse(core.account.account);
	const nav = useNavigation();
	const { colors, theme } = useTheme();
	const current_tab_state = usePulse(core.app.TAB_STATE);
	const isDarkMode = usePulse(core.ui.isDarkMode);

	const sh = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: 80, width: '100%', zIndex: 10, opacity: 1 }]);

	const tabs = [
		{ name: 'Friends', path: 'friends', icon: 'friends' },
		// { name: 'moments', path: 'moments', icon: 'map' },
	];

	const navigate = (name: string, s: number) => {
		core.app.TAB_STATE.set({ state: s + 1, path_name: name });
		nav.navigate(name as never);
		// nav.reset({ index: 0, routes: [{ name: name as never }] });
	};

	const theme_name = usePulse(core.ui.current_theme);

	const toggleTheme = () => {
		core.ui.current_theme.set(theme_name === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		console.log('render');
	}, []);

	return (
		<CustomTabBarBody>
			<TabContainer>
				{tabs.map((item, index) => (
					<IconTabBtn
						key={index}
						icon={item.icon}
						route={item.path}
						active={index + 1 === current_tab_state.state}
						onPress={() => navigate(item.path, index)}
						name={item.name}
					/>
				))}

				<IconTabBtnBody
					onPress={() => {
						core.app.TAB_STATE.set({ path_name: 'account', state: 3 });
						nav.reset({ index: 1, routes: [{ name: 'account' as never }] });
					}}>
					<AvatarTabBtn active={current_tab_state.state === 3} account={acc} />
				</IconTabBtnBody>
			</TabContainer>

			<DimmingOverlay height={80} />

			<FloatingPostBtn
				name="plus"
				size={30}
				color={colors.backgroundDarker}
				backgroundColor={colors.darker2}
				iconSize={20}
				onPress={() => nav.navigate('create_status' as never)}
				// onPress={() => toggleTheme()}
			/>
			{/* <BlurView style={sh} blurType="extraDark" blurAmount={20} overlayColor={'#000000'} /> */}
		</CustomTabBarBody>
	);
};

const FloatingPostBtn = styled(IconButton)`
	position: absolute;
	bottom: 95px;
	right: 15px;
`;

const DimmingOverlay = styled.View<{ height: number }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	/* background-color: rgba(0, 0, 0, 0.65); */
	background-color: rgba(0, 0, 0, 0.05);
	// todo: fix this for light and dark mode
	/* border-top-color: ${({ theme }) => theme.colors.text}; */
	/* border-top-width: 1px; */
	opacity: 1;
	height: ${props => props.height}px;
`;

const CustomTabBarBody = styled.View<{ isIphoneX?: boolean }>`
	height: 80px;
	bottom: 0px;
	align-items: center;
	position: absolute;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
`;

const TabContainer = styled.View`
	flex-direction: row;
	width: 100%;
	height: 60px;
	padding: 0px 20px;
	z-index: 11;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	/* background-color: rgba(0, 0, 0, 1); */
`;

const AvatarTabBtn: React.FC<{ active: boolean; account: any }> = c => {
	const acc = usePulse(core.account.account);
	const profile = usePulse(core.profile.profile);
	const { theme } = useTheme();

	return (
		<AvatarBody active={c.active}>
			<Avatar src={[acc?.id, profile?.avatar]} size={33} />
		</AvatarBody>
	);
};

const AvatarBody = styled.View<{ active: boolean }>`
	border-radius: 50px;
	background-color: ${({ active, theme }) => (active ? theme.colors.text : theme.colors.textFade)};
	height: 35px;
	width: 35px;
	align-items: center;
	justify-content: center;
`;

const IconTabBtn: React.FC<{ route: string; icon: string; active?: boolean; onPress: () => void; name: string }> = c => {
	const { colors } = useTheme();

	return (
		<IconTabBtnBody onPress={c.onPress}>
			<Icon name={c.icon} size={22} color={c.active ? colors.text : colors.textFade} />
		</IconTabBtnBody>
	);
};

const IconTabBtnBody = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
	height: 100%;
	align-items: center;
	width: 55px;
	justify-content: center;
`;
