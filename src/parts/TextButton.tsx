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
	children?: React.ReactNode;
}

export const TextButton: React.FC<TextButtonProps> = ({
	text,
	onPress,
	style,
	disabled,
	textColor,
	textSize,
	children,
}) => {
	const sh = StyleSheet.flatten<ViewStyle>([{ alignSelf: 'flex-start', opacity: disabled ? 0.6 : 1 }, style]);

	return (
		<TouchableOpacity style={sh} onPress={onPress} disabled={disabled}>
			<Text bold color={textColor} size={textSize} style={{ letterSpacing: -0.6 }}>
				{text || children}
			</Text>
		</TouchableOpacity>
	);
};
