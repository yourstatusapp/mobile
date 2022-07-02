import { Block } from '@parts';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

type IconName = 'discord' | 'message' | 'flag';
interface IconProps {
	name: IconName | string;
	color?: string;
	size?: number;
	style?: ViewStyle;
}

export const Icon2 = ({ name, color, size, style }: IconProps) => {
	return (
		<Block style={style} flex={1} height={size} width={size}>
			{/* <SvgXml xml={testSvg} height={size} width={size} /> */}
		</Block>
	);
};
