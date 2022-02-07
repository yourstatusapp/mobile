import React from 'react';
import { BlockType } from '@core';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

export const Block: React.FC<BlockType> = ({ scroll, children, vCenter, hCenter, color, safe, paddingHorizontal, style, row, flex, press, onPress }) => {
	const blockStyle = StyleSheet.flatten<ViewStyle>([
		!!paddingHorizontal && { paddingHorizontal },
		{ backgroundColor: color ?? 'hsl(0, 0%, 0%)' },
		{ flex: flex ?? 1, width: '100%', flexDirection: 'column' },
		!!vCenter && { justifyContent: 'center' },
		!!hCenter && { alignItems: 'center' },
		!!row && { flexDirection: 'row' },
		style,
	]);

	if (press) {
		return (
			<TouchableOpacity onPress={onPress} activeOpacity={0.6} style={blockStyle}>
				{children}
			</TouchableOpacity>
		);
	} else if (safe) {
		return (
			<SafeAreaView style={{ flex: blockStyle.flex, backgroundColor: blockStyle.backgroundColor }}>
				<View style={blockStyle}>{children}</View>
			</SafeAreaView>
		);
	} else if (scroll) {
		return (
			<ScrollView scrollEnabled={true} style={blockStyle}>
				{children}
			</ScrollView>
		);
	} else {
		return <View style={blockStyle}>{children}</View>;
	}
};
