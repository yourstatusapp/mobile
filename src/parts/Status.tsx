import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Linking, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { request, StatusType } from '@core';
import { useNavigation, useTheme } from '@hooks';
import { Block, Icon, Text } from '@parts';

interface IStatusProps {
	self?: boolean;
	disableTap?: boolean;
	onTapped?: () => void;
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

export const Status = React.memo(({ status, style, disableTap, username, onTapped }: IStatusProps) => {
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
			textColor={StatusColors[theme.name][status.type].color}
			taped={disableTap === true || status.taped}>
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
		// Check if not taped yet, so we can register the tap
		if (status.taped === false) {
			await request('post', `/status/${status?.id}/tap`);
			if (onTapped) onTapped();
		}

		if (status.type === 1) {
			nav.navigate('ReplyStatus', { username: username || '', status: status });
		}

		if (status.type === 2) {
			Linking.openURL('https://discord.gg/' + status?.data?.code);
		}
	}, [status, onTapped, nav, username]);

	const PressStyle = ({ pressed }: { pressed: boolean }) => [
		{
			opacity: pressed ? 0.6 : 1,
		},
	];

	const NotYetTappedComp = () => <Block height={30} width={30} style={{ borderRadius: 30 }} color="red"></Block>;

	return (
		<Pressable disabled={disableTap === true} style={PressStyle} onPress={onPressHandle}>
			{BaseRender}
			{/* {status?.taped === false && !!onTapped && <NotYetTappedComp />} */}
		</Pressable>
	);
});

const StatusBody = styled.View<{ backColor: string; textColor: string; taped?: boolean }>`
	background-color: ${({ backColor }) => backColor};
	/* border: solid 1.3px ${({ textColor }) => textColor}25; */
	border: solid 1.3px ${({ textColor, backColor, taped }) => (taped ? backColor : textColor + '15')};
	padding: 4px 8px;
	align-self: flex-start;
	border-radius: 6px;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 27px;
`;
