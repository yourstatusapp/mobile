
import React from 'react';
import { ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as icons from '../assets/icons';

interface IIconProps {
	name: Icons;
	size?: number;
	color?: string;
	style?: ViewStyle;
}

export type Icons = 'arrow_big' | 'arrow_thin' | 'arrow' | 'bell' | 'brush' | 'camera_flip' | 'camera_flip2' | 'camera' | 'chat' | 'checkmark' | 'chevron' | 'clipboard' | 'cog' | 'conversation' | 'dev' | 'discord' | 'eclipse' | 'eyes' | 'finger' | 'flag_add' | 'flag' | 'flashlight' | 'friends' | 'global' | 'heart_outline' | 'heart' | 'history' | 'image' | 'incoming' | 'info' | 'leave' | 'link' | 'location' | 'map_marker' | 'map' | 'message' | 'moon' | 'pencil' | 'person' | 'phone' | 'plus' | 'quil' | 'sad_face' | 'search' | 'send' | 'settings' | 'sparkle' | 'spotify' | 'switch' | 'times' | 'trash' | 'twitter' | 'user_add' | 'verified' ;

export const Icon = (props: IIconProps) => {
	const s = props?.size || 20;
	return (
		<SvgXml
			xml={icons[props.name]}
			height={s}
			width={s}
			color={props?.color || 'black'}
			style={props?.style}
		/>
	);
};