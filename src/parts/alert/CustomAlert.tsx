import core from '@core';
import { Spacer, Text } from '@parts';
import { useEvent } from '@pulsejs/react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export interface AlertDataType {
	title: string;
	success: boolean;
	desc?: string;
}

export const CustomAlert: React.FC = () => {
	const alertHeight = useRef(new Animated.Value(-100)).current;

	const [AlertData, setAlertData] = useState<AlertDataType>();

	useEvent(core.app.event.notification, (v) => {
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
				<Text weight="semi-bold" color="white" size={17}>
					{AlertData.title}
				</Text>
				<Spacer size={2} />
				<Text weight="medium" color="white" style={{ opacity: 0.8 }} size={14}>
					{AlertData.desc}
				</Text>
			</TouchableOpacity>
		</CustomAlertBody>
	);
};

const CustomAlertBody = styled(Animated.View)<AlertDataType>`
	position: absolute;
	height: 100px;
	width: 100%;
	background: ${({ success }) => (success ? '#4cad5e' : '#f35b5b')};
	transform: translateY(-100px);
	padding: 0px 20px;
	padding-top: 45px;
	z-index: 1;
`;
