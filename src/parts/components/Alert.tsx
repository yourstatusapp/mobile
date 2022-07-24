import * as React from 'react';
import core from '@core';
import { Spacer, Text } from '@parts';
import { useEvent } from '@pulsejs/react';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAlert } from '@hooks';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export const CustomAlert = () => {
	const { clear, current } = useAlert();

	const heightOffset = useSharedValue(-100);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: heightOffset.value }],
		};
	});

	const forceClose = useCallback(() => {
		heightOffset.value = withTiming(-100, { duration: 350 });

		setTimeout(() => {
			clear();
		}, 350);
	}, [clear, heightOffset]);

	useEffect(() => {
		heightOffset.value = withTiming(0, { duration: 220 });

		setTimeout(() => {
			if (!current) {
				return;
			}
			forceClose();
		}, 2000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// if no alert is running
	if (!current) {
		return <></>;
	}

	return (
		// <CustomAlertBody {...AlertData} style={{ transform: [{ translateY: alertHeight }] }}>
		<CustomAlertBody {...current} style={animatedStyles}>
			<TouchableOpacity activeOpacity={0.8} onPress={forceClose}>
				<Text weight="700" color="white" size={16}>
					{current.title}
				</Text>
				<Spacer size={2} />
				{current.desc && (
					<Text color="white" style={{ opacity: 0.8 }}>
						{current.desc}
					</Text>
				)}
			</TouchableOpacity>
		</CustomAlertBody>
	);
};

const CustomAlertBody = styled(Animated.View)<AlertDataType>`
	position: absolute;
	top: 0;
	height: ${({ desc }) => (!desc ? 80 : 100)}px;
	width: 100%;
	background: ${({ success }) => (success ? '#579c63' : '#f35b5b')};
	padding: 0px 20px;
	padding-top: 45px;
	z-index: 900000;
`;
