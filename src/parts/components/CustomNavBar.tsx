import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { hasNotch } from 'react-native-device-info';
import { Text, Icon, Spacer } from '../../parts';
import { TouchableOpacity } from 'react-native';
import { IconButton } from '../Buttons';
import { usePulse } from '@pulsejs/react';
import core from '@core';

interface CustomTabBarProps extends BottomTabBarProps {}

export const CustomNavBar: React.FC<CustomTabBarProps> = (props) => {
	const { state } = props;
	const tabbar_show_text = usePulse(core.app.state.tabbar_show_text);

	const isIphoneX = hasNotch();
	const theme = useTheme();
	const nav = useNavigation();

	const [Current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(state.index);
	}, [state]);

	// useEffect(() => {
	// 	// if
	// 	console.log(props.state);
	// }, [props]);

	const tabs = [
		// { name: 'Messages', path: 'messages', icon: 'conversation' },
		{ name: 'Friends', path: 'friends', icon: 'friends' },
		// { name: 'New', path: 'new', icon: 'plus' },
		{ name: 'Account', path: 'account', icon: 'person' },
		// { name: 'Global', path: 'discovery', icon: 'global' },
	];

	return (
		<CustomTabBarBody isIphoneX={isIphoneX} tabIndex={state.index}>
			<HoverButton name="plus" color={theme.primary} size={28} iconSize={-5} backgroundColor={theme.step1} onPress={() => nav.navigate('CreateStatus')} />
			{/* {state.index === 3 && <HoverButton name="send" color="black" size={45} iconSize={25} />} */}
			<TabContainer>
				{tabs.map((v, i) => (
					<TabButton key={i} onPress={() => nav.navigate(v.path)} activeOpacity={0.5}>
						<Icon name={v.icon} size={tabbar_show_text ? 23 : 26} color={Current === i ? theme.primary : theme.navBarFade} />
						{tabbar_show_text && (
							<>
								<Spacer size={5} />
								<Text size={12} style={{ color: Current === i ? theme.primary : theme.navBarFade }}>
									{v.name}
								</Text>
							</>
						)}
					</TabButton>
				))}
			</TabContainer>
		</CustomTabBarBody>
	);
};

const HoverButton = styled(IconButton)`
	position: absolute;
	right: 20;
	top: -60;
	z-index: 20;
`;

const CustomTabBarBody = styled.View<{ isIphoneX: boolean; tabIndex: number }>`
	height: ${(p) => (p.isIphoneX ? 80 : 60)}px;
	padding: 0px 20px;
	background-color: ${({ theme }) => theme.navBar};
	display: ${({ tabIndex }) => (tabIndex === 4 ? 'none' : 'flex')};

	padding-bottom: 25px;
	align-items: center;
	position: relative;
`;

const TabContainer = styled.View`
	flex-direction: row;
	width: 100%;
	height: 100%;
	justify-content: space-between;
`;

const TabButton = styled(TouchableOpacity)`
	flex: 1;
	padding-top: 10px;
	justify-content: center;
	align-items: center;
	width: 60px;
`;
