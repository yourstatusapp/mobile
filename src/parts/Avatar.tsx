import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { useTheme } from 'styled-components/native';

interface AvatarProps {
	src: [string?, string?];
	style?: ImageStyle;
	size?: number;
}

export const Avatar = ({ src, style, size }: AvatarProps) => {
	const theme = useTheme();
	const s = StyleSheet.flatten([style, { height: size ?? 45, width: size ?? 45, borderRadius: size ?? 45, backgroundColor: theme.backgroundDarker }]);
	const defaultImg = src[0] === null ?? src[1] === null;

	const image_src = `https://cdn.yourstatus.app/profile/${src[0]}/${src[1]}`;

	return defaultImg ? <View style={s} /> : <FastImage source={{ uri: image_src ?? '' }} style={s} />;
};
