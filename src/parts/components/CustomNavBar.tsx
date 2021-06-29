import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/core';
import { Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../Buttons';
import { Spacer } from '..';
import { Icon } from '../icons/Icon';

interface CustomTabBarProps extends BottomTabBarProps {}

export const CustomNavBar: React.FC<CustomTabBarProps> = (props) => {
	const { state } = props;
	const isIphoneX = DeviceInfo.hasNotch();
	const theme = useTheme();
	const nav = useNavigation();

	const [Current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(state.index);
	}, [state]);

	const tabs = [
		{ name: 'Friends', path: 'friends', icon: 'friends' },
		{ name: 'Global', path: 'discovery', icon: 'global' },
		{ name: 'Account', path: 'account', icon: 'person' },
	];

	return (
		<CustomTabBarBody isIphoneX={isIphoneX}>
			<TabContainer>
				{tabs.map((v, i) => (
					<TabButton key={i} onPress={() => nav.navigate(v.path)} activeOpacity={0.5}>
						<Icon name={v.icon} size={20} color={Current === i ? theme.primary : '#2e2e2e'} />
						<Spacer size={5} />
						<Text style={{ color: Current === i ? '#969696' : '#2e2e2e' }}>{v.name}</Text>
					</TabButton>
				))}
			</TabContainer>
		</CustomTabBarBody>
	);
};

const CustomTabBarBody = styled.View<{ isIphoneX: boolean }>`
	height: ${(p) => (p.isIphoneX ? 80 : 60)}px;
	padding: 0px 20px;
	/* background-color: #0b0b0b; */
	background-color: ${({ theme }) => theme.navBar};
	padding-bottom: 25px;
	align-items: center;
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
	/* background-color: red; */
`;
