import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface LineType {
	size: number;
	color?: string;
	spacing?: number;
}

export const Line = ({ color, size, spacing }: LineType) => {
	const sh = StyleSheet.flatten<ViewStyle>([
		{ width: '100%', borderRadius: size, height: size },
		!!color && { backgroundColor: color },
		!!spacing && { marginVertical: spacing },
	]);
	return <View style={sh} />;
};
