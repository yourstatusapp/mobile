import React from 'react';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { hasNotch } from 'react-native-device-info';
import { useTheme } from '@hooks';

interface HeadingBlurOverlayProps {
	height?: number;
}

export const HeadingBlurOverlay: React.FC<HeadingBlurOverlayProps> = ({ height }) => {
	const { theme, isDarkMode } = useTheme();
	const topHeight = hasNotch() ? 44 : 40;

	const sh2 = StyleSheet.flatten<ViewStyle>([
		{
			height: topHeight,
			width: '100%',
			zIndex: 10,
			opacity: 1,
			borderBottomWidth: 1,
			borderBottomColor: theme.backgroundDarker,
		},
	]);

	const baseStyle: ViewStyle = {
		flex: 0,
		height: topHeight,
		width: '100%',
		top: 0,
		position: 'absolute',
		zIndex: 10,
		borderBottomColor: theme.darker,
		borderBottomWidth: 1,
	};

	return (
		<View style={baseStyle}>
			<BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} />
			<DimmingOverlay height={topHeight} />
		</View>
	);
};

const DimmingOverlay = styled.View<{ height?: number }>`
	position: absolute;
	z-index: 15;
	background-color: ${({ theme }) => theme.background};
	opacity: 0.8;

	height: ${props => props.height}px;
	bottom: 0;
	left: 0;
	width: 100%;
`;
