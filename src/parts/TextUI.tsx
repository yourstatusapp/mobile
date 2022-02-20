import React from 'react';
import { StyleSheet, TextStyle, Text } from 'react-native';
import { TextType } from '@core';
import { useTheme } from 'styled-components/native';

export const TextCustom: React.FC<TextType> = ({
	style,
	color,
	size,
	weight,
	children,
	center,
	italic,
	bold,
	marginBottom,
	marginLeft,
	marginRight,
	marginTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
	paddingTop,
	...props
}) => {
	const { colors } = useTheme();
	const StyleH = StyleSheet.flatten<TextStyle>([
		style,
		{ color: color ?? colors.white },
		!!bold && { fontWeight: 'bold' },
		!!italic && { fontStyle: 'italic' },
		!!weight && { fontWeight: weight },
		!!size && { fontSize: size },
		!!center && { textAlign: 'center' },
		{ marginBottom },
		{ marginLeft },
		{ marginRight },
		{ marginTop },
		{ paddingBottom },
		{ paddingLeft },
		{ paddingRight },
		{ paddingTop },
	]);

	return (
		<Text style={StyleH} {...props}>
			{children}
		</Text>
	);
};
