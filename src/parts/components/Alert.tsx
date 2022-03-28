import * as React from 'react';
import core from '@core';
import { Spacer, Text } from '@parts';
import { useEvent } from '@pulsejs/react';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export const CustomAlert = () => {
	const [AlertData, setAlertData] = useState<AlertDataType>();

	useEvent(core.events.notification, v => {
		console.log(v);
		openAlert(v);
	});

	const heightOffset = useSharedValue(-100);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: heightOffset.value }],
		};
	});

	const openAlert = (alertData: AlertDataType) => {
		setAlertData(alertData);

		heightOffset.value = withTiming(0, { duration: 220 });

		setTimeout(() => {
			if (!alertData) return;
			forceClose();
		}, 2000);
	};

	const forceClose = () => {
		heightOffset.value = withTiming(-100, { duration: 350 });

		setTimeout(() => {
			setAlertData(undefined);
		}, 350);
	};

	useEffect(() => {}, []);

	// if no alert is running
	if (!AlertData) {
		return <></>;
	}

	return (
		// <CustomAlertBody {...AlertData} style={{ transform: [{ translateY: alertHeight }] }}>
		<CustomAlertBody {...AlertData} style={animatedStyles}>
			<TouchableOpacity activeOpacity={0.8} onPress={forceClose}>
				<Text weight="700" color="white" size={16}>
					{AlertData.title}
				</Text>
				<Spacer size={2} />
				{AlertData.desc && (
					<Text color="white" style={{ opacity: 0.8 }} size={14}>
						{AlertData.desc}
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
