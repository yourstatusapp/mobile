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
	medium,
	extraBold,
	...props
}) => {
	const theme = useTheme();
	const StyleH = StyleSheet.flatten<TextStyle>([
		style,
		{ color: color ?? theme.text },
		!!bold && { fontWeight: 'bold' },
		!!medium && { fontWeight: '600' },
		!!extraBold && { fontWeight: '800' },
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
