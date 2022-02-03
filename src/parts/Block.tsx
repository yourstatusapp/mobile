import React from 'react';
import { BlockType } from '@core';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

export const Block: React.FC<BlockType> = ({ children, vCenter, hCenter, color, safe, paddingHorizontal, style }) => {
	const blockStyle = StyleSheet.flatten<ViewStyle>([
		!!vCenter && { justifyContent: 'center' },
		!!hCenter && { alignItems: 'center' },
		!!paddingHorizontal && { paddingHorizontal },
		{ backgroundColor: color || '#000000' },
		{ flex: 1, width: '100%', flexDirection: 'column' },
		style,
	]);

	if (safe) {
		return (
			<SafeAreaView style={blockStyle}>
				<View style={blockStyle}>{children}</View>
			</SafeAreaView>
		);
	}

	return <View style={blockStyle}>{children}</View>;
};
