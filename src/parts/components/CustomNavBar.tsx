import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { hasNotch } from 'react-native-device-info';
import { Text, Icon, Spacer } from '../../parts';
import { TouchableOpacity } from 'react-native';

interface CustomTabBarProps extends BottomTabBarProps {}

export const CustomNavBar: React.FC<CustomTabBarProps> = (props) => {
	const { state } = props;
	const isIphoneX = hasNotch();
	const theme = useTheme();
	const nav = useNavigation();

	const [Current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(state.index);
	}, [state]);

	useEffect(() => {
		// if
		console.log(props.state);
	}, [props]);

	const tabs = [
		{ name: 'Messages', path: 'messages', icon: 'conversation' },
		{ name: 'Friends', path: 'friends', icon: 'friends' },
		// { name: 'other', path: 'other', icon: 'info' },
		{ name: 'Global', path: 'discovery', icon: 'global' },
		{ name: 'Account', path: 'account', icon: 'person' },
	];

	return (
		<CustomTabBarBody isIphoneX={isIphoneX} tabIndex={props.state.index}>
			<TabContainer>
				{tabs.map((v, i) => (
					<TabButton key={i} onPress={() => nav.navigate(v.path)} activeOpacity={0.5}>
						<Icon name={v.icon} size={25} color={Current === i ? theme.primary : theme.navBarFade} />
						<Spacer size={5} />
						<Text size={12} style={{ color: Current === i ? theme.primary : theme.navBarFade }}>
							{v.name}
						</Text>
					</TabButton>
				))}
			</TabContainer>
		</CustomTabBarBody>
	);
};

const CustomTabBarBody = styled.View<{ isIphoneX: boolean; tabIndex: boolean }>`
	height: ${(p) => (p.isIphoneX ? 80 : 60)}px;
	padding: 0px 20px;
	background-color: ${({ theme }) => theme.navBar};
	display: ${({ tabIndex }) => (tabIndex === 4 ? 'none' : 'flex')};

	padding-bottom: 25px;
	align-items: center;
	/* border-top-width: 1px; */
	/* border-top-color: #eeeeee; */
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
