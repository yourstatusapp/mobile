import core from '@core';
import { Text } from '@parts';
import { useEvent } from '@pulsejs/react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { Animated, PanResponder, Modal, View, Alert, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ModalProps {}

export const ModalComponent: React.FC<ModalProps> = (props) => {
	const {} = props;
	const [modalVisible, setModalVisible] = useState(false);

	// const height = useRef(new Animated.Value(0)).current;

	// const pan = useRef(new Animated.ValueXY()).current;

	useEvent(core.app.event.modal, (v) => {
		console.log(v);
		setModalVisible(true);
		// Animated.timing(height, {
		// 	toValue: 0,
		// 	duration: 200,
		// 	useNativeDriver: true,
		// });
	});

	// const close = () => {
	// 	Animated.timing(height, {
	// 		toValue: 200,
	// 		duration: 900,
	// 		useNativeDriver: true,
	// 	}).start();
	// };

	// const panResponder = useRef(
	// 	PanResponder.create({
	// 		onMoveShouldSetPanResponder: () => true,
	// 		onPanResponderGrant: () => {
	// 			// @ts-ignore
	// 			console.log('dsa', pan.y._value);

	// 			pan.setOffset({
	// 				// @ts-ignore
	// 				x: pan.x._value,
	// 				// @ts-ignore
	// 				y: pan.y._value,
	// 			});
	// 		},
	// 		onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
	// 		onPanResponderRelease: () => {
	// 			console.log('realesed');

	// 			pan.flattenOffset();
	// 		},
	// 	})
	// ).current;

	return (
		<ModalComponentBody>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(false);
				}}
			>
				<ModalBody>
					<ModalView></ModalView>
				</ModalBody>
			</Modal>
		</ModalComponentBody>
	);

	// return (
	// 	<ModalBody style={{ transform: [{ translateY: pan.y }] }} {...panResponder.panHandlers}>
	// 		<ModalContainer></ModalContainer>
	// 	</ModalBody>
	// );
};

const ModalComponentBody = styled.View`
	flex: 1;
	position: absolute;
`;

const ModalBody = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	/* position: absolute; */
	/* z-index: 10px; */
	/* bottom: 30px; */
	/* height: 200px; */
	/* width: 100%; */
	/* padding: 25px 15px; */
	background-color: #0000003e;
	padding: 10px;
	width: 100%;
	height: 40px;
	/* marg */
`;

const ModalView = styled.View`
	background-color: #ffffff;
	border-radius: 14px;
	padding: 15px;
	width: 80%;
`;
