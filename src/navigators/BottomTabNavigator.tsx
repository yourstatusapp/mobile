import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { usePulse } from '@pulsejs/react';
import {
	Account,
	Friends,
	Profile,
	SearchFriend,
	FriendRequests,
	Conversations,
	DirectMessage,
	NewConversation,
	Events,
	StatusDetail,
	ManageFriends,
} from '../screens';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';

import { Avatar, Block, Icon, IconButton } from '@parts';
import core, { TabStackNavParamList } from '@core';
import { useNavigation } from '@hooks';

const TabsStackNavigator = createNativeStackNavigator<TabStackNavParamList>();

export const BottomTabNavigator: React.FC = () => {
	const current_tab_state = usePulse(core.app.TAB_STATE);
	const isDarkMode = usePulse(core.ui.isDarkMode);
	const o: NativeStackNavigationOptions = {
		gestureEnabled: false,
		animation: 'none',
		contentStyle: { backgroundColor: 'black' },
	};

	const sh2 = StyleSheet.flatten<ViewStyle>([{ position: 'absolute', bottom: 0, height: 80, width: '100%', zIndex: 2, opacity: 1 }]);
	const [focusState, setFocusState] = useState<any>();

	return (
		<Block color="black">
			<TabsStackNavigator.Navigator
				screenListeners={{
					focus: (v: any) => {
						setFocusState(v);
					},
				}}
				screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
				initialRouteName={current_tab_state.path_name}>
				<TabsStackNavigator.Screen name="account" component={Account} options={o} />
				<TabsStackNavigator.Screen name="events" component={Events} options={o} />
				<TabsStackNavigator.Screen name="friends" component={Friends} options={o} />
				<TabsStackNavigator.Screen name="conversations" component={Conversations} options={o} />
				<TabsStackNavigator.Screen name="profile" component={Profile} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="StatusDetail" component={StatusDetail} options={{ gestureEnabled: true }} />

				<TabsStackNavigator.Screen name="directmessage" component={DirectMessage} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="SearchFriend" component={SearchFriend} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="FriendRequests" component={FriendRequests} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="newconversation" component={NewConversation} options={{ gestureEnabled: true }} />
				<TabsStackNavigator.Screen name="ManageFriends" component={ManageFriends} options={{ gestureEnabled: true }} />
			</TabsStackNavigator.Navigator>
			<BlurView style={sh2} intensity={30} tint={isDarkMode ? 'dark' : 'light'} />
			<CustomNavBar focusState={focusState} />
		</Block>
	);
};

interface CustomNavBarProps {
	focusState: any;
}

const CustomNavBar = ({ focusState }: CustomNavBarProps) => {
	const acc = usePulse(core.account.account);
	const nav = useNavigation();
	const theme = useTheme();
	const current_tab_state = usePulse(core.app.TAB_STATE);
	// const newMessage = usePulse(core.lists.conversations.groups.new_messages);
	const [hideFloatingbtn, setHideFloatingbtn] = useState(false);

	const navigate = (name: keyof TabStackNavParamList, s: number) => {
		core.app.TAB_STATE.set({ state: s + 1, path_name: name });
		nav.navigate(name as never);
		// nav.reset({ index: 0, routes: [{ name: name as never }] });
	};

	useEffect(() => {
		setHideFloatingbtn(focusState?.target?.split('-')[0] === 'StatusDetail');
	}, [focusState]);

	return (
		<CustomTabBarBody>
			<DimmingOverlay height={80} />
			<TabContainer>
				<IconTabBtn
					key={0}
					icon={'friends'}
					route={'friends'}
					active={0 + 1 === current_tab_state.state}
					onPress={() => navigate('friends', 0)}
					name={'Friends'}
				/>
				{/* {!!newMessage?.length && <Text color="red">new emssage</Text>} */}
				<IconTabBtn
					key={1}
					icon={'flag'}
					iconSize={18}
					route={'events'}
					active={1 + 1 === current_tab_state.state}
					onPress={() => navigate('events', 1)}
					name={'Events'}
				/>
				{/* <IconTabBtn
					key={1}
					icon={'conversation'}
					route={'conversations'}
					active={1 + 1 === current_tab_state.state}
					onPress={() => navigate('conversations', 1)}
					name={'Messages'}
				/> */}
				{/* <IconTabBtn
					key={2}
					icon={'conversation'}
					route={'conversations'}
					active={2 + 1 === current_tab_state.state}
					onPress={() => navigate('conversations', 2)}
					name={'Messages'}
				/> */}

				<IconTabBtnBody
					onPress={() => {
						core.app.TAB_STATE.set({ path_name: 'account', state: 3 });
						nav.reset({ index: 1, routes: [{ name: 'account' as never }] });
					}}>
					<AvatarTabBtn active={current_tab_state.state === 3} account={acc} />
				</IconTabBtnBody>
			</TabContainer>

			{!hideFloatingbtn && [1].includes(current_tab_state.state) && (
				<FloatingPostBtn
					name="plus"
					size={30}
					color={theme.textFadeLight}
					backgroundColor={theme.darker}
					iconSize={20}
					onPress={() => nav.navigate('create_status' as never)}
				/>
			)}
			{!hideFloatingbtn && [2].includes(current_tab_state.state) && (
				<FloatingPostBtn
					name="flag-add"
					size={30}
					color={theme.textFadeLight}
					backgroundColor={theme.darker}
					iconSize={22}
					onPress={() => nav.navigate('CreateEvent')}
				/>
			)}
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
	z-index: 1;
	background-color: ${({ theme }) => theme.background};
	opacity: 0.8;

	height: ${props => props.height}px;
	bottom: 0;
	left: 0;
	width: 100%;
`;

const CustomTabBarBody = styled.View<{ isIphoneX?: boolean }>`
	height: 81px;
	bottom: 0px;
	align-items: center;
	position: absolute;
	position: absolute;
	z-index: 3;
	border-top-color: ${({ theme }) => theme.backgroundDarker};
	border-top-width: 1px;
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
	z-index: 20;
`;

const AvatarTabBtn: React.FC<{ active: boolean; account: any }> = c => {
	const acc = usePulse(core.account.account);
	const profile = usePulse(core.profile.profile);
	return (
		<AvatarBody active={c.active}>
			<Avatar src={[acc?.id, profile?.avatar]} size={33} />
		</AvatarBody>
	);
};

const AvatarBody = styled.View<{ active: boolean }>`
	border-radius: 50px;
	background-color: ${({ active, theme }) => (active ? theme.darker2 : theme.backgroundDarker)};
	height: 35px;
	width: 35px;
	align-items: center;
	justify-content: center;
`;

const IconTabBtn: React.FC<{ route: string; icon: string; iconSize?: number; active?: boolean; onPress: () => void; name: string }> = c => {
	const theme = useTheme();

	return (
		<IconTabBtnBody onPress={c.onPress}>
			<Icon name={c.icon} size={c?.iconSize || 22} color={c.active ? theme.text : theme.darker} />
		</IconTabBtnBody>
	);
};

const IconTabBtnBody = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
	height: 100%;
	align-items: center;
	width: 55px;
	justify-content: center;
`;
