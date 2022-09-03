import styled from 'styled-components/native';

import React, { useCallback } from 'react';
import { Linking, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';

import { request, StatusType, StatusTypes } from '@core';

import { useNavigation, useTheme } from '@hooks';

import { Icon, Text } from '@parts';

interface IStatusProps {
	self?: boolean;
	disableTap?: boolean;
	style?: ViewStyle;
	status: StatusType;
	username?: string;
}

interface StatusTypesColors {
	[index: string]: {
		key_name: string;
		color: string;
		backColor: string;
	};
}

export const StatusColors: { light: StatusTypesColors; dark: StatusTypesColors } = {
	light: {
		1: {
			key_name: 'DEFAULT',
			color: '#1E2B68',
			backColor: '#A9C6FE',
		},
		2: {
			key_name: 'DISCORD_GUILD',
			color: '#363B74',
			backColor: '#7C86F8',
		},
		3: {
			key_name: 'EVENT',
			color: '#1E4622',
			backColor: '#73D77D',
		},
	},
	dark: {
		1: {
			key_name: 'DEFAULT',
			color: '#3D60FD',
			backColor: '#0B1B37',
		},
		2: {
			key_name: 'DISCORD_GUILD',
			color: '#738BD7',
			backColor: '#1E2846',
		},
		3: {
			key_name: 'EVENT',
			color: '#73D77D',
			backColor: '#1E4622',
		},
	},
};

export const Status = React.memo(({ status, style, disableTap, username }: IStatusProps) => {
	// const theme_name = usePulse(core.ui.ThemeObject).name;
	const { theme } = useTheme();
	const nav = useNavigation();

	const wrapperStyle = StyleSheet.flatten([style]);

	// const offset = useSharedValue(0);
	// const opacity = useSharedValue(0);
	// const zIndex = useSharedValue(wrapperStyle?.zIndex ? 2 - wrapperStyle?.zIndex : -50);

	const BaseRender = (
		<StatusBody
			style={wrapperStyle}
			backColor={StatusColors[theme.name][status.type].backColor}
			textColor={StatusColors[theme.name][status.type].color}>
			{status.type === 2 && (
				<Icon name="discord" size={14} color={StatusColors[theme.name][status.type].color} style={{ marginRight: 4 }} />
			)}
			{status.type === 3 && (
				<Icon name="flag" size={11} color={StatusColors[theme.name][status.type].color} style={{ marginRight: 5 }} />
			)}
			<Text medium size={13} color={StatusColors[theme.name][status.type].color} style={{ lineHeight: 16 }}>
				{status.data?.name || status.data?.message}
			</Text>
		</StatusBody>
	);

	const onPressHandle = useCallback(async () => {
		console.log('tap');

		if (status.taped === false) {
			const res = await request('post', `/status/${status?.id}/tap`);
			if (res.data) {
				console.log('-> ', res.data);
				// TODO: fix this tap number update
				// let newList = core.lists.friends.getData(status.account_id).value.status?.map(item => {
				// 	if (item.type === 0) {
				// 		item.taps = 1 + item.taps;
				// 		item.taped = true;
				// 	}

				// 	return item;
				// });

				// TODO: fix these bottom 2
				// core.lists.friends.update(status.account_id, { status: newList });
				// core.lists.friends.rebuildGroupsThatInclude(status.account_id);
			} else {
				// silent errors
				// AppAlert(false, res.message);
			}
		}

		if (status.type === 1) {
			nav.navigate('ReplyStatus', { username: username || '', status: status });
		}

		if (status.type === 2) {
			Linking.openURL('https://discord.gg/' + status?.data?.code);
		}
	}, [status, username, nav]);

	const PressStyle = ({ pressed }: { pressed: boolean }) => [
		{
			opacity: pressed ? 0.6 : 1,
		},
	];

	const tap = Gesture.Tap()
		.numberOfTaps(2)
		.onStart(() => {
			console.log('Yay, double tap!');
		});

	return (
		// <GestureDetector gesture={tap} >
		<Pressable disabled={disableTap === true} style={PressStyle} onPress={onPressHandle}>
			{BaseRender}
		</Pressable>
		// </GestureDetector>
	);
});

const StatusBody = styled.View<{ backColor: string; textColor: string }>`
	background-color: ${({ backColor }) => backColor};
	border: solid 1.3px ${({ textColor }) => textColor}25;
	padding: 4px 8px;
	align-self: flex-start;
	border-radius: 6px;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 27px;
`;
