import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/core';
import { Text, TouchableOpacity } from 'react-native';

interface CustomTabBarProps extends BottomTabBarProps {}

export const CustomNavBar: React.FC<CustomTabBarProps> = (props) => {
	const { state } = props;
	const isIphoneX = DeviceInfo.hasNotch();
	const nav = useNavigation();

	const [Current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(state.index);
	}, [state]);

	const tabs = [
		{ name: 'Friends', path: 'friends' },
		{ name: 'Global', path: 'discovery' },
		{ name: 'Account', path: 'Account' },
	];

	return (
		<CustomTabBarBody isIphoneX={isIphoneX}>
			<TabContainer>
				{tabs.map((v, i) => (
					<TabButton key={i} onPress={() => nav.navigate(v.path)}>
						<Text style={{ color: Current === i ? '#F3F98D' : 'white' }}>{v.name}</Text>
					</TabButton>
				))}
			</TabContainer>
		</CustomTabBarBody>
	);
};

const CustomTabBarBody = styled.View<{ isIphoneX: boolean }>`
	height: ${(p) => (p.isIphoneX ? 80 : 60)}px;
	padding: 0px 20px;
	background-color: #12121a;
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
	justify-content: center;
	align-items: center;
	width: 60px;
`;
