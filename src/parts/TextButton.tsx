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

export const TextButton: React.FC<TextButtonProps> = ({ text, onPress, style, disabled, textColor, textSize, children }) => {
	const sh = StyleSheet.flatten<ViewStyle>([{ alignSelf: 'flex-start' }, style]);

	return (
		<TouchableOpacity style={sh} onPress={onPress} disabled={disabled}>
			<Text bold color={textColor} size={textSize}>
				{text || children}
			</Text>
		</TouchableOpacity>
	);
};
