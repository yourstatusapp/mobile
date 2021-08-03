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
	padding?: number;
	color?: string;

	style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = (p) => {
	return (
		<IconButtonBody {...p} onPress={p.onPress}>
			<Icon name={p.name || ''} color={p.color} size={p.size || 20} />
		</IconButtonBody>
	);
};

const IconButtonBody = styled(TouchableOpacity)<IconButtonProps>`
	justify-content: center;
	align-items: center;
	${({ padding }) => (padding ? 'padding: ' + padding + 'px;' : '')};
	height: ${({ size }) => size || 20}px;
	width: ${({ size }) => size || 20}px;
	border-radius: ${({ size }) => size || 20}px;
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
