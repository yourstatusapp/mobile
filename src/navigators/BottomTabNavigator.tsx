import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { Block, Icon } from '@parts';
import FastImage from 'react-native-fast-image';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { Account, Friends, Projects, Profile } from '../screens';
import { BlurView } from '@react-native-community/blur';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

const TabsStackNavigator = createNativeStackNavigator();

export const BottomTabNavigator: React.FC = () => {
	const o: NativeStackNavigationOptions = {
		gestureEnabled: false,
		animation: 'none',
	};

	return (
		<Block color="black">
			<TabsStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="account">
				<TabsStackNavigator.Screen name="account" component={Account} options={o} />
				<TabsStackNavigator.Screen name="friends" component={Friends} options={o} />
				<TabsStackNavigator.Screen name="projects" component={Projects} options={o} />
				<TabsStackNavigator.Screen name="profile" component={Profile} options={{ gestureEnabled: true }} />
			</TabsStackNavigator.Navigator>
			<CustomNavBar />
		</Block>
	);
};

const CustomNavBar = () => {
	const acc = usePulse(core.account.state.account);
	const nav = useNavigation();
	const [Current, setCurrent] = useState(3);
	const sh = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: 80, width: '100%', zIndex: 10, opacity: 1 }]);

	const tabs = [
		{ name: 'Projects', path: 'projects', icon: 'map' },
		{ name: 'Friends', path: 'friends', icon: 'friends' },
	];

	const navigate = (name: string, s: number) => {
		setCurrent(s + 1);
		nav.navigate(name as never);
	};

	useEffect(() => {
		console.log(Current);
	}, [Current]);

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
						active={index + 1 === Current}
						onPress={() => navigate(item.path, index)}
						name={item.name}
					/>
				))}

				<IconTabBtnBody
					onPress={() => {
						setCurrent(3);
						nav.navigate('account' as never);
					}}>
					<AvatarTabBtn active={Current === 3} account={acc} />
				</IconTabBtnBody>
			</TabContainer>
			<DimmingOverlay height={80} />
			<BlurView style={sh} blurType="extraDark" blurAmount={20} overlayColor={'#000000'} />
		</CustomTabBarBody>
	);
};

const DimmingOverlay = styled.View<{ height: number }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.44);
	opacity: 1;
	height: ${props => props.height}px;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
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
`;

const AvatarTabBtn: React.FC<{ active: boolean; account: any }> = c => {
	const acc = usePulse(core.account.state.account);
	const profile = usePulse(core.profile.state.profile);
	const { theme } = useTheme();

	return (
		<AvatarBody active={c.active}>
			{profile.avatar ? (
				<Avatar source={{ uri: `https://cdn.yourstatus.app/profile/${acc?.id}/${profile?.avatar}` }} />
			) : (
				<Icon name="person" size={14} color={c.active ? theme.primary : '#000000'} />
			)}
		</AvatarBody>
	);
};

const Avatar = styled(FastImage)`
	height: 36px;
	width: 36px;
	border-radius: 50px;
`;

const AvatarBody = styled.View<{ active: boolean }>`
	border-radius: 50px;
	background-color: ${({ active }) => (active ? '#ffffff32' : '#303030')};
	height: 35px;
	width: 35px;
	align-items: center;
	justify-content: center;
`;

const IconTabBtn: React.FC<{ route: string; icon: string; active?: boolean; onPress: () => void; name: string }> = c => {
	const { colors } = useTheme();

	return (
		<IconTabBtnBody onPress={c.onPress}>
			<Icon name={c.icon} size={22} color={c.active ? colors.white40 : '#ffffff22'} />
		</IconTabBtnBody>
	);
};

const IconTabBtnBody = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
	height: 100%;
	align-items: center;
	width: 55px;
	justify-content: center;
`;
