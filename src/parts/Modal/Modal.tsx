import core from '@core';
import { useEvent } from '@pulsejs/react';
import * as React from 'react';
import { useRef } from 'react';
import { Animated, PanResponder, Text } from 'react-native';
import styled from 'styled-components/native';

interface ModalProps {}

export const Modal: React.FC<ModalProps> = (props) => {
	const {} = props;

	const height = useRef(new Animated.Value(0)).current;
	const pan = useRef(new Animated.ValueXY()).current;

	useEvent(core.app.event.modal, (v) => {
		console.log(v);
		Animated.timing(height, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		});
	});

	const close = () => {
		Animated.timing(height, {
			toValue: 200,
			duration: 900,
			useNativeDriver: true,
		}).start();
	};

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				// @ts-ignore
				console.log('dsa', pan.y._value);

				pan.setOffset({
					// @ts-ignore
					x: pan.x._value,
					// @ts-ignore
					y: pan.y._value,
				});
			},
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
			onPanResponderRelease: () => {
				console.log('realesed');

				pan.flattenOffset();
			},
		})
	).current;

	return (
		<ModalBody style={{ transform: [{ translateY: pan.y }] }} {...panResponder.panHandlers}>
			<ModalContainer></ModalContainer>
		</ModalBody>
	);
};

const ModalBody = styled(Animated.View)`
	position: absolute;
	z-index: 10px;
	bottom: 0px;
	height: 200px;
	width: 100%;
	padding: 25px 15px;
`;

const ModalContainer = styled.View`
	background-color: red;
	width: 100%;
	border-radius: 20px;
	flex: 1;
`;
