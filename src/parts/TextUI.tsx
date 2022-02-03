import React from 'react';
import { StyleSheet, TextStyle, Text } from 'react-native';
import { TextType } from '@core';

export const TextCustom: React.FC<TextType> = ({ style, color, size, weight, children, center, italic, bold, ...props }) => {
	const StyleH = StyleSheet.flatten<TextStyle>([
		{ color: color || 'white' },
		!!bold && { fontWeight: 'bold' },
		!!italic && { fontStyle: 'italic' },
		!!weight && { fontWeight: weight },
		!!size && { fontSize: size },
		!!center && { textAlign: 'center' },
		style,
	]);

	return (
		<Text style={StyleH} {...props}>
			{children}
		</Text>
	);
};
