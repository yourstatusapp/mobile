import { Text } from '@parts';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface TextButtonProps {
	text?: string;
	textColor?: string;
	textSize?: number;
	onPress?: () => void;
	style?: ViewStyle;
	disabled?: boolean;
}

export const TextButton = ({ text, onPress, style, disabled, textColor, textSize }: TextButtonProps) => {
	const sh = StyleSheet.flatten([style]);

	return (
		<TouchableOpacity style={sh} onPress={onPress} disabled={disabled}>
			<Text bold color={textColor} size={textSize}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};
