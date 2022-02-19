import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ButtonType {
	onPress?: () => void;
	disabled?: boolean;
	style?: ViewStyle;
}

export const Press: React.FC<ButtonType> = ({ onPress, disabled, style, children }) => {
	const opacityValue = useSharedValue(1);

	const sh = StyleSheet.flatten([style]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(opacityValue.value),
		};
	});

	return (
		<Animated.View style={[animatedStyle]}>
			<Pressable
				onPress={onPress}
				disabled={disabled}
				style={({ pressed }) => [
					sh,
					{
						opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
					},
				]}>
				{children}
			</Pressable>
		</Animated.View>
	);
};
