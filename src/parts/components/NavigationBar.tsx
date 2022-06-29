import core from '@core';
import { useNavigation } from '@hooks';
import { Avatar, Icon, IconButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export type NavbarScreens = 'friends' | 'events' | 'account';

interface CustomNavBarProps {
	onTabChange: (v: NavbarScreens) => void;
	tabState: NavbarScreens;
}

export const CustomNavBar = ({ focusState, onTabChange, tabState }: CustomNavBarProps) => {
	const acc = usePulse(core.account.account);
	const nav = useNavigation();
	const theme = useTheme();

	const [hideFloatingbtn, setHideFloatingbtn] = useState(false);

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
					active={tabState === 'friends'}
					onPress={() => onTabChange('friends')}
					name={'Friends'}
				/>
				{/* {!!newMessage?.length && <Text color="red">new emssage</Text>} */}
				<IconTabBtn
					key={1}
					icon={'flag'}
					iconSize={18}
					route={'events'}
					active={tabState === 'events'}
					onPress={() => onTabChange('events')}
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
						// core.app.TAB_STATE.set({ path_name: 'account', state: 3 });
						// nav.reset({ index: 1, routes: [{ name: 'account' as never }] });
						onTabChange('account');
					}}>
					<AvatarTabBtn active={tabState === 'account'} account={acc} />
				</IconTabBtnBody>
			</TabContainer>

			{tabState === 'friends' && (
				<FloatingPostBtn
					name="plus"
					size={30}
					color={theme.textFadeLight}
					backgroundColor={theme.darker}
					iconSize={20}
					onPress={() => nav.navigate('create_status' as never)}
				/>
			)}
			{tabState === 'events' && (
				<FloatingPostBtn
					name="flag-add"
					size={30}
					color={theme.textFadeLight}
					backgroundColor={theme.darker}
					iconSize={22}
					onPress={() => nav.navigate('CreateEvent')}
				/>
			)}
			<BlurView
				style={{
					height: 80,
					width: '100%',
					bottom: 0,
					position: 'absolute',
					zIndex: 10,
					opacity: 1,
					borderTopWidth: 1,
					borderTopColor: theme.backgroundDarker,
				}}
				tint={theme.name}
				intensity={30}
			/>
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
	background-color: ${({ theme }) => theme.backgroundDark};
	opacity: 0.85;

	height: ${props => props.height}px;
	bottom: 0;
	left: 0;
	width: 100%;
`;

const CustomTabBarBody = styled.View<{ isIphoneX?: boolean }>`
	height: 80px;
	bottom: 0px;
	align-items: center;
	position: absolute;
	z-index: 3;
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
	background-color: ${({ active, theme }) => (active ? theme.text : theme.backgroundDarker)};
	height: 35px;
	width: 35px;
	align-items: center;
	justify-content: center;
`;

const IconTabBtn: React.FC<{
	route: string;
	icon: string;
	iconSize?: number;
	active?: boolean;
	onPress: () => void;
	name: string;
}> = c => {
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
