import { Text } from '@parts';
import * as React from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { abs, add, Clock, cond, diff, divide, eq, lessThan, multiply, set, startClock, stopClock, Value } from 'react-native-reanimated';
import styled from 'styled-components/native';

interface CustomAlertProps {}

interface AlertConfig {
	title?: string;
	subText?: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = (p) => {
	const {} = p;
	const [CurrentData, setCurrentData] = React.useState<AlertConfig>();

	let alertY = React.useRef(new Animated.Value(0)).current;

	const onPanGestureEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationY: alertY,
				},
			},
		],
		{ useNativeDriver: true }
	);

	const createAlert = (c: AlertConfig) => {
		setCurrentData(c);
	};

	const rotate = alertY.interpolate({
		inputRange: [-100, 100],
		outputRange: ['-25deg', '25deg'],
	});

	const translateY = alertY.interpolate({
		inputRange: [50, 200],
		outputRange: ['50', '200'],
	});

	const closeAlert = () => {};
	const onEnded = (v) => {
		console.log(v);
		alertY.setValue(0);
	};

	React.useEffect(() => {
		createAlert({ title: 'Twan sent you a friend request' });
	}, []);

	return (
		<CustomAlertBody>
			{/* <PanGestureHandler onGestureEvent={onPanGestureEvent} onEnded={onEnded} enabled={true}>
				<AlertBody style={{ transform: [{ translateY }] }}>
					<AlertContainer>
						<Text>Twan sent you a friend request</Text>
					</AlertContainer>
				</AlertBody>
			</PanGestureHandler> */}
			{p.children}
		</CustomAlertBody>
	);
};

const CustomAlertBody = styled.View`
	flex: 1;
`;

const AlertBody = styled(Animated.View)`
	position: absolute;
	top: 50;
	width: 100%;
	z-index: 10;
`;

const AlertContainer = styled.View`
	/* position: absolute; */
	/* top: 50; */
	width: 95%;
	margin: 0px auto;
	/* z-index: 10; */
	background-color: ${({ theme }) => theme.step1};
	border: solid 2px ${({ theme }) => theme.step3};
	padding: 10px;
	border-radius: 10px;
	height: 80px;
`;
