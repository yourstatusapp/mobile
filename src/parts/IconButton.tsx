import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from './icons/Icon';

interface IconButtonProps {
	name: string;
	size: number;
	onPress?: () => void;
	color?: string;
	backgroundColor?: string;
	noPadding?: boolean;
	noBackground?: boolean;
	iconSize?: number;

	style?: StyleProp<ViewStyle>;
	iconStyle?: ViewStyle;
	disabled?: boolean;
	removeFadeWhenDisalbed?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
	name,
	color,
	iconSize,
	size,
	iconStyle,
	disabled,
	onPress,
	removeFadeWhenDisalbed,
	backgroundColor,
	noBackground,
	style,
}) => {
	return (
		<IconButtonBody {...{ name, color, iconSize, size, iconStyle, disabled, onPress, removeFadeWhenDisalbed, backgroundColor, noBackground, style }}>
			<Icon name={name || ''} color={color} size={iconSize || 0 + (size - 5)} style={iconStyle} />
		</IconButtonBody>
	);
};

const IconButtonBody = styled(TouchableOpacity)<IconButtonProps>`
	justify-content: center;
	align-items: center;

	${({ backgroundColor, size, noBackground, noPadding, removeFadeWhenDisalbed, disabled }) => `
		opacity: ${removeFadeWhenDisalbed ? 1 : disabled ? 0.4 : 1};
		background-color: ${noBackground === true ? 'transparent' : backgroundColor};
		height: ${size + (noPadding === true ? 0 : 10)}px;
		width: ${size + (noPadding === true ? 0 : 10)}px;
		border-radius: ${size || 30};
	`}
`;
