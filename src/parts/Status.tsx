import { AppAlert, request } from '@core';
import { Press, Text } from '@parts';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface StatusType {
	style?: ViewStyle;
	demo?: boolean;
	status: {
		id: string;
		content: string;
		type: number;
		taps: number;
		taped?: boolean;
	};

	onPress?: () => void;
}

enum StatusEventTypes {
	DEFAULT,
	STORIES_COLLECTION,
}

interface StatusTypesColors {
	[index: string]: {
		key_name: string;
		color: string;
		backColor: string;
	};
}

const StatusColors: StatusTypesColors = {
	0: {
		key_name: 'DEFAULT',
		color: '#3D60FF',
		backColor: '#0c1b37',
	},
	1: {
		key_name: 'STORIES_COLLECTION',
		color: '#3D60FF',
		backColor: '#0c1b37',
	},
};

export const Status = React.memo(({ status, style, demo, onPress }: StatusType) => {
	const { colors } = useTheme();

	const wrapperStyle = StyleSheet.flatten([style]);

	const offset = useSharedValue(0);
	const zIndex = useSharedValue(wrapperStyle?.zIndex ? 2 - wrapperStyle?.zIndex : -50);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			height: '100%',
			position: 'absolute',
			backgroundColor: colors.white20,
			right: offset.value,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 5,
			flex: 1,
			width: 30,
			zIndex: zIndex.value,
		};
	});

	const tapStatus = async () => {
		if (demo) {
			offset.value = withSpring(-20);
			setTimeout(() => {
				offset.value = withSpring(0);
			}, 500);
			return;
		}

		const res = await request('post', `/status/${status.id}/tap`);
		if (res.data) {
			offset.value = withSpring(-20);
			setTimeout(() => {
				offset.value = withSpring(0);
			}, 500);
		} else {
		}
	};

	const animate = async () => {
		offset.value = withSpring(-20);
		setTimeout(() => {
			offset.value = withSpring(0);
		}, 500);
	};

	const StatusRender = (
		<StatusBody style={{ zIndex: zIndex.value }} backColor={StatusColors[status.type].backColor}>
			<Text weight="600" size={13} color={StatusColors[status.type].color}>
				{status.content}
			</Text>
		</StatusBody>
	);

	if (!!onPress && status.type === 0 && status.taped === false) {
		return (
			<Animated.View style={wrapperStyle}>
				<Pressable
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.6 : 1,
						},
					]}
					onPress={() => {
						animate();
						onPress();
					}}>
					<Animated.View style={animatedStyles}>
						<Text center marginLeft={10} size={12} bold color={colors.white}>
							{status.taps}
						</Text>
					</Animated.View>
					{StatusRender}
				</Pressable>
			</Animated.View>
		);
	}

	return <View style={wrapperStyle}>{StatusRender}</View>;
});

const StatusBody = styled.View<{ backColor: string }>`
	background-color: ${({ backColor }) => backColor};
	padding: 4px 7px;
	align-self: flex-start;
	border-radius: 4px;
	justify-content: center;
`;
