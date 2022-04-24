import core from '@core';
import { Block, IconButton, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

interface TabbarHeaderProps {
	color?: string;
}

export const TabbarHeader: React.FC<TabbarHeaderProps> = ({ color }) => {
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	const isDarkMode = usePulse(core.ui.isDarkMode);
	const sh2 = StyleSheet.flatten<ViewStyle>([
		{
			position: 'absolute',
			top: 0,
			width: '100%',
			zIndex: 10,
			opacity: 1,
			borderBottomWidth: 1,
			borderBottomColor: theme.backgroundDarker,
		},
	]);

	return (
		<Block flex={0} style={{ height: insets.top, backgroundColor: color ?? theme.background }}>
			{/* <BlurView style={sh2} tint={isDarkMode ? 'dark' : 'light'} intensity={30} /> */}
		</Block>
	);
};
