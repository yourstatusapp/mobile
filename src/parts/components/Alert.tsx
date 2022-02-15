import * as React from 'react';
import core from '@core';
import { Spacer, Text } from '@parts';
import { useEvent } from '@pulsejs/react';
import { useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export const CustomAlert = () => {
	const alertHeight = useRef(new Animated.Value(-100)).current;
	const [AlertData, setAlertData] = useState<AlertDataType>();

	useEvent(core.app.event.notification, v => {
		console.log(v);
		openAlert(v);
	});

	const openAlert = (alertData: AlertDataType) => {
		setAlertData(alertData);
		Animated.timing(alertHeight, {
			toValue: 0,
			duration: 220,
			useNativeDriver: true,
		}).start(() => {
			setTimeout(() => {
				if (!alertData) return;
				forceClose();
			}, 2000);
		});
	};

	const forceClose = () => {
		Animated.timing(alertHeight, {
			toValue: -100,
			duration: 350,
			useNativeDriver: true,
		}).start(() => {
			setAlertData(undefined);
		});
	};

	useEffect(() => {}, []);

	// if no alert is running
	if (!AlertData) {
		return <></>;
	}

	return (
		<CustomAlertBody {...AlertData} style={{ transform: [{ translateY: alertHeight }] }}>
			<TouchableOpacity activeOpacity={0.8} onPress={forceClose}>
				<Text weight="600" color="white" size={16}>
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
	z-index: 91;
`;
