import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from './icons/Icon';
import { Text, TextProps } from './Text';

interface ButtonProps {}

export const BaseButton: React.FC<ButtonProps> = ({ children }) => {
	return <ButtonBody>{children}</ButtonBody>;
};

const ButtonBody = styled.TouchableOpacity`
	flex: 1;
`;

interface IconButtonProps {
	onPress?: () => void;

	name?: string;
	size?: number;
	iconSize?: number;
	color?: string;
	backgroundColor?: string;
	noPadding?: boolean;
	noBackground?: boolean;

	style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = (p) => {
	return (
		<IconButtonBody {...p} onPress={p.onPress}>
			<Icon name={p.name || ''} color={p.color} size={p.iconSize || 20} />
		</IconButtonBody>
	);
};

const IconButtonBody = styled(TouchableOpacity)<IconButtonProps>`
	justify-content: center;
	align-items: center;

	${({ backgroundColor, theme, size, noPadding, iconSize, noBackground }) => `
		background-color: ${noBackground ? 'transparent' : backgroundColor || theme.step1};
		height: ${noPadding ? iconSize : size || 20}px;
		width: ${noPadding ? iconSize : size || 20}px;
		border-radius: ${size || 30};
	`}
`;

interface TextButtonProps extends Partial<TextProps> {
	text: string;
	onPress?: () => void;
}

export const TextButton: React.FC<TextButtonProps> = (p) => {
	const { onPress, text } = p;
	return (
		<TouchableOpacity onPress={onPress}>
			<Text {...p}>{text}</Text>
		</TouchableOpacity>
	);
};

interface WideButtonProps {
	onPress?: () => void;
	text?: string;
	textColor?: string;
	backgroundColor?: string;
}

export const WideButton: React.FC<WideButtonProps> = (p) => {
	return (
		<WideButtonBody {...p} onPress={p.onPress}>
			<Text weight="semi-bold" color={p.textColor}>
				{p.text}
			</Text>
		</WideButtonBody>
	);
};

const WideButtonBody = styled(TouchableOpacity)<WideButtonProps>`
	width: 100%;
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.step2};
	border-radius: 12px;
	justify-content: center;
	align-items: center;

	height: 55px;
`;
