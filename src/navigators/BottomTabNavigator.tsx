import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import styled, { useTheme } from 'styled-components/native';
import { HeadingBlurOverlay, Icon } from '@parts';
import FastImage from 'react-native-fast-image';
import core from '@core';
import { usePulse } from '@pulsejs/react';
import { Account, Friends, Projects } from '../screens';
import { BlurView, VibrancyView } from '@react-native-community/blur';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<BottomTab.Navigator initialRouteName="account" tabBar={props => <CustomNavBar {...props} />} screenOptions={{ headerShown: false }}>
				<BottomTab.Screen name="account" component={Account} />
				<BottomTab.Screen name="friends" component={Friends} />
				<BottomTab.Screen name="projects" component={Projects} />
			</BottomTab.Navigator>
		</View>
	);
};

const CustomNavBar: React.FC<BottomTabBarProps> = props => {
	const { state } = props;
	const acc = usePulse(core.account.state.account);
	const nav = useNavigation();
	const [Current, setCurrent] = useState(3);
	const sh = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', top: 0, height: 80, width: '100%', zIndex: 10, opacity: 1 }]);

	const tabs = [
		{ name: 'Projects', path: 'projects', icon: 'map' },
		{ name: 'Friends', path: 'friends', icon: 'friends' },
	];

	useEffect(() => {
		console.log(Current);
	}, [Current]);

	return (
		<CustomTabBarBody tabIndex={state.index}>
			<TabContainer>
				{tabs.map((item, index) => (
					<IconTabBtn key={index} icon={item.icon} route={item.path} active={index + 1 === Current} onPress={() => setCurrent(index + 1)} name={item.name} />
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

const CustomTabBarBody = styled.View<{ isIphoneX?: boolean; tabIndex: number }>`
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
	// const profile = usePulse(core.account);
	const { theme } = useTheme();

	return (
		<AvatarBody active={c.active}>
			{acc.avatar ? (
				<Avatar source={{ uri: `https://cdn.yourstatus.app/profile/${acc?.id}/${acc?.avatar}` }} />
			) : (
				<Icon name="person" size={14} color={c.active ? theme.primary : '#000000'} />
			)}
		</AvatarBody>
	);
};

const Avatar = styled(FastImage)`
	height: 40px;
	width: 40px;
	border-radius: 50px;
`;

const AvatarBody = styled.View<{ active: boolean }>`
	border-radius: 50px;
	/* border: solid 2px ${({ active, theme }) => (active ? theme.theme.primary : 'black')}; */
	background-color: ${({ active }) => (active ? '#ffffff32' : '#303030')};
	height: 35px;
	width: 35px;
	align-items: center;
	justify-content: center;
`;

const IconTabBtn: React.FC<{ route: string; icon: string; active?: boolean; onPress: () => void; name: string }> = c => {
	const nav = useNavigation();
	const { theme } = useTheme();

	return (
		<IconTabBtnBody
			onPress={() => {
				nav.navigate(c.route as never);
				c.onPress();
			}}>
			<Icon name={c.icon} size={22} color={c.active ? theme.primary : 'rgba(255,255,255,0.5)'} />
		</IconTabBtnBody>
	);
};

const IconTabBtnBody = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
	height: 100%;
	align-items: center;
	width: 55px;
	justify-content: center;
`;
