import React from 'react';
import { BlockType } from '@core';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

export const Block: React.FC<BlockType> = ({ children, vCenter, hCenter, color, safe, paddingHorizontal, style, row }) => {
	const blockStyle = StyleSheet.flatten<ViewStyle>([
		{ backgroundColor: color || '#000000' },
		{ flex: 1, width: '100%', flexDirection: 'column' },
		!!vCenter && { justifyContent: 'center' },
		!!hCenter && { alignItems: 'center' },
		!!paddingHorizontal && { paddingHorizontal },
		!!row && { flexDirection: 'row' },
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
