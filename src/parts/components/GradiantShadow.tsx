import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components/native';

interface GradiantShadowProps {
	height: number;
	style: ViewStyle;
}
export const GradiantShadow: React.FC<GradiantShadowProps> = ({ height, style }) => {
	const theme = useTheme();
	const sh = StyleSheet.flatten([{ width: '100%', height }, style]);

	return <LinearGradient pointerEvents="none" colors={[theme.background, theme.name === 'dark' ? '#00000000' : '#FFFFFF00']} style={sh} />;
};
