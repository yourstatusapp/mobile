import core, { AppAlert, request } from '@core';
import { Icon, Press, Text } from '@parts';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Linking, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePulse } from '@pulsejs/react';

interface StatusType {
	style?: ViewStyle;
	demo?: boolean;
	status: {
		id: string;
		account_id: string;
		data: any;
		type: number;
		taps?: number;
		taped?: boolean;
	};
}

enum StatusEventTypes {
	DEFAULT,
	DISCORD_GUILD,
}

interface StatusTypesColors {
	[index: string]: {
		key_name: string;
		color: string;
		backColor: string;
	};
}

const StatusColors: { light: StatusTypesColors; dark: StatusTypesColors } = {
	light: {
		0: {
			key_name: 'DEFAULT',
			color: '#1E2B68',
			backColor: '#A9C6FE',
		},
		1: {
			key_name: 'DISCORD_GUILD',
			color: '#363B74',
			backColor: '#7C86F8',
		},
	},
	dark: {
		0: {
			key_name: 'DEFAULT',
			color: '#3D60FD',
			backColor: '#0B1B37',
		},
		1: {
			key_name: 'DISCORD_GUILD',
			color: '#738BD7',
			backColor: '#1E2846',
		},
	},
};

export const Status = React.memo(({ status, style, demo }: StatusType) => {
	const theme = useTheme();

	const wrapperStyle = StyleSheet.flatten([style]);

	const offset = useSharedValue(0);
	const zIndex = useSharedValue(wrapperStyle?.zIndex ? 2 - wrapperStyle?.zIndex : -50);

	// const animatedStyles = useAnimatedStyle(() => {
	// 	return {
	// 		height: '100%',
	// 		position: 'absolute',
	// 		backgroundColor: theme.white20,
	// 		right: offset.value,
	// 		justifyContent: 'center',
	// 		alignItems: 'center',
	// 		borderRadius: 5,
	// 		flex: 1,
	// 		width: 30,
	// 		zIndex: zIndex.value,
	// 	};
	// });

	// const tapStatus = async () => {
	// 	if (demo) {
	// 		offset.value = withSpring(-20);
	// 		setTimeout(() => {
	// 			offset.value = withSpring(0);
	// 		}, 500);
	// 		return;
	// 	}

	// if (status.type === 0) {
	// 	const res = await request('post', `/status/${status.id}/tap`);
	// 	if (res.data) {
	// 		offset.value = withSpring(-20);
	// 		setTimeout(() => {
	// 			offset.value = withSpring(0);
	// 		}, 500);
	// 	} else {
	// 		AppAlert(false, res.message);
	// 	}
	// }

	// 	// if (status.type === 1) {
	// 	// 	Linking.canOpenURL(`https://discord.gg/${status?.content?.invite_code}`);
	// 	// }
	// };

	const animate = async (countedUp?: boolean) => {
		offset.value = withSpring(-20);
		setTimeout(() => {
			offset.value = withSpring(0);
		}, 380 + (countedUp ? 450 : 0));
	};

	const onStatusPress = async () => {
		// let newList = core.lists.friends.getData(status.account_id).value.status.map(item => {
		// 	item.taps = 1 + item.taps;
		// 	item.taped = true;
		// 	return item;
		// });
		// core.lists.friends.update(status.account_id, { status: newList });
		// core.lists.profiles.groups.friends.remove(status.account_id);
		// core.lists.friends.groups.friends.patch({ account_id: status.account_id, status: [] }, { deep: false });
		// core.lists.friends.rebuildGroupsThatInclude('friends');
		// core.lists.friends.groups.friends.rebuildOne(status.account_id);
		// core.lists.friends.getData(status.account_id).patch({ status: [] }, { deep: true });
		// const res = await request('post', `/status/${status?.id}/tap`);
		// if (res.data) {
		// 	core.lists.status.getData(status.id).patch({ taped: true });
		// } else {
		// 	AppAlert(false, res.message);
		// }
	};
	const theme_name = usePulse(core.ui.current_theme);
	const StatusRender = (
		<StatusBody style={{ zIndex: zIndex.value }} backColor={StatusColors[theme_name][status.type].backColor}>
			{status.type === 1 && <Icon name="discord" size={18} color={StatusColors[theme_name][status.type].color} style={{ marginRight: 4 }} />}
			<Text weight="600" size={13} color={StatusColors[theme_name][status.type].color}>
				{status.data?.name || status.data?.message}
			</Text>
		</StatusBody>
	);

	if (status?.type === 1) {
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => {
					Linking.openURL('https://discord.gg/' + status?.data?.code);
				}}>
				{StatusRender}
			</TouchableOpacity>
		);
	}

	return (
		<Animated.View style={wrapperStyle}>
			<Pressable
				disabled={true}
				style={({ pressed }) => [
					{
						opacity: pressed ? 0.6 : 1,
					},
				]}
				onPress={() => {
					animate(!status?.taped);
					onStatusPress();
					// if (status.taped === false) onStatusPress();
				}}>
				{/* <Animated.View style={animatedStyles}>
					<Text center marginLeft={10} size={12} bold color={theme.white}>
						{status.taps}
					</Text>
				</Animated.View> */}
				{StatusRender}
			</Pressable>
		</Animated.View>
	);

	// if (!!onPress && status.type === 0 && status.taped === false) {
	// 	return (
	// 		<Animated.View style={wrapperStyle}>
	// 			<Pressable
	// 				style={({ pressed }) => [
	// 					{
	// 						opacity: pressed ? 0.6 : 1,
	// 					},
	// 				]}
	// 				onPress={() => {
	// 					animate();
	// 					onPress();
	// 				}}>
	// 				<Animated.View style={animatedStyles}>
	// 					<Text center marginLeft={10} size={12} bold color={theme.white}>
	// 						{status.taps}
	// 					</Text>
	// 				</Animated.View>
	// 				{StatusRender}
	// 			</Pressable>
	// 		</Animated.View>
	// 	);
	// } else {
	// 	return <View style={wrapperStyle}>{StatusRender}</View>;
	// }
});

const StatusBody = styled.View<{ backColor: string }>`
	background-color: ${({ backColor }) => backColor};
	padding: 4px 7px;
	align-self: flex-start;
	border-radius: 6px;
	justify-content: center;
	flex-direction: row;
	align-items: center;
`;
