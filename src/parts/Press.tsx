import { Text } from '@parts';
import React, { ReactNode, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ButtonType {
	onPress?: () => void;
	disabled?: boolean;
	style?: ViewStyle;
}

export const Press: React.FC<ButtonType> = ({ onPress, disabled, style, children }) => {
	const opacityValue = useSharedValue(1);
	const { colors } = useTheme();
	const sh = StyleSheet.flatten([style]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(opacityValue.value),
		};
	});

	return (
		<Animated.View style={[animatedStyle]}>
			<ButtonBody
				onPress={onPress}
				disabled={disabled}
				style={({ pressed }) => [
					sh,
					{
						opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
					},
				]}>
				{children}
			</ButtonBody>
		</Animated.View>
	);
};

const ButtonBody = styled.Pressable``;
