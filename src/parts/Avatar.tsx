import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

interface AvatarProps {
	src?: string;
	srcObj?: [string, string];
	style?: ImageStyle;
	size?: number;
}

export const Avatar = ({ src, srcObj, style, size }: AvatarProps) => {
	const s = StyleSheet.flatten([style, { height: size || 45, width: size || 45, borderRadius: 55 }]);

	const image_src = srcObj ? `https://cdn.yourstatus.app/profile/${srcObj[0]}/${srcObj[1]}` : src;

	return <FastImage source={{ uri: image_src || '', cache: 'cacheOnly' }} style={s} />;
};
