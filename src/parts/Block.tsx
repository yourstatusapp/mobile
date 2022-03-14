import React from 'react';
import { BlockType } from '@core';
import { Animated, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Block: React.FC<BlockType> = ({
	scroll,
	children,
	vCenter,
	hCenter,
	color,
	safe,
	opacity,
	paddingHorizontal,
	style,
	row,
	flex,
	press,
	onPress,
	marginBottom,
	marginLeft,
	marginRight,
	marginTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
	paddingTop,
	animate,
	activeOpacity,
}) => {
	const theme = useTheme();
	const blockStyle = StyleSheet.flatten<ViewStyle>([
		!!paddingHorizontal && { paddingHorizontal },
		// { backgroundColor: color ?? theme.black },
		{ flex: flex ?? 1, width: '100%', flexDirection: 'column' },
		!!color && { backgroundColor: color },
		!!vCenter && { justifyContent: 'center' },
		!!hCenter && { alignItems: 'center' },
		!!row && { flexDirection: 'row' },
		!!opacity && { opacity },
		{ marginBottom },
		{ marginLeft },
		{ marginRight },
		{ marginTop },
		{ paddingBottom },
		{ paddingLeft },
		{ paddingRight },
		{ paddingTop },
		style,
	]);

	if (press) {
		return (
			<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity || 0.6} style={blockStyle}>
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
		if (animate) {
			return <Animated.View style={blockStyle}>{children}</Animated.View>;
		} else {
			return <View style={blockStyle}>{children}</View>;
		}
	}
};
