import { useTheme } from '@hooks';
import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradiantShadowProps {
	height: number;
	style: ViewStyle;
	colors?: string[];
}
export const GradiantShadow: React.FC<GradiantShadowProps> = ({ height, style, colors }) => {
	const { theme } = useTheme();
	const sh = StyleSheet.flatten([{ width: '100%', height }, style]);

	// const c = useMemo(
	// 	() => (!!colors?.length ? colors : [theme.background, theme.name === 'dark' ? '#00000000' : '#FFFFFF00']),
	// 	[colors, theme.background, theme.name],
	// );

	const c = colors?.length
		? colors
		: [theme.background, theme.name === 'dark' ? '#00000000' : '#FFFFFF00'];

	// return <LinearGradient pointerEvents="none" colors={[theme.background, theme.name === 'dark' ? '#00000000' : '#FFFFFF00']} style={sh} />;
	return <LinearGradient pointerEvents="none" colors={c} style={sh} />;
};
