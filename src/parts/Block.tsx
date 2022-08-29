import React from 'react';
import { BlockType, MarginType, PaddingType } from '@core';
import { Animated, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

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
	padding,
	paddingBottom,
	paddingLeft,
	paddingRight,
	paddingTop,
	animate,
	activeOpacity,
	disabled,
	width,
	height,
}) => {
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
		{ padding },
		{ paddingBottom },
		{ paddingLeft },
		{ paddingRight },
		{ paddingTop },
		{ width },
		{ height },
		style,
	]);

	if (press) {
		return (
			<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity || 0.6} style={blockStyle} disabled={disabled}>
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
			<ScrollView scrollEnabled={true} style={blockStyle} keyboardShouldPersistTaps="always">
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

interface BlockScrollType extends PaddingType, MarginType {
	style?: ViewStyle;
	contentContainerStyle?: ViewStyle;
}

export const BlockScroll: React.FC<BlockScrollType> = ({ children, contentContainerStyle, style, ...props }) => {
	const BlockScrollStyle = StyleSheet.flatten<ViewStyle>([style, props]);

	return (
		<ScrollView scrollEnabled={true} style={BlockScrollStyle} contentContainerStyle={contentContainerStyle}>
			{children}
		</ScrollView>
	);
};

interface BlockScrollType extends PaddingType, MarginType {
	vCenter?: boolean;
	hCenter?: boolean;
	color?: string;
	safe?: boolean;
	press?: boolean;
	scroll?: boolean;
	animate?: boolean;
	onPress?: () => void;
	paddingHorizontal?: number;
	style?: ViewStyle;
	row?: boolean;
	opacity?: number;
	flex?: 1 | 0;
	activeOpacity?: number;
}

export const BlockNew = ({
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
