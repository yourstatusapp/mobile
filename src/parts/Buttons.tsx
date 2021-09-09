import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
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
	name: string;
	size: number;
	onPress?: () => void;
	color?: string;
	backgroundColor?: string;
	noPadding?: boolean;
	noBackground?: boolean;
	iconSize?: number;

	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = (p) => {
	return (
		<IconButtonBody style={{ opacity: p.disabled ? 0.4 : 1 }} onPress={p.onPress} disabled={p.disabled} {...p}>
			<Icon name={p.name || ''} color={p.color} size={p.size + (p.iconSize || 0)} />
		</IconButtonBody>
	);
};

const IconButtonBody = styled(TouchableOpacity)<IconButtonProps>`
	justify-content: center;
	align-items: center;

	${({ backgroundColor, theme, size, noBackground, noPadding }) => `
		background-color: ${noBackground ? 'transparent' : backgroundColor || theme.step1};
		height: ${size + (noPadding === true ? 0 : 10)}px;
		width: ${size + (noPadding === true ? 0 : 10)}px;
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
	disabled?: boolean;
}

export const WideButton: React.FC<WideButtonProps> = (p) => {
	return (
		<WideButtonBody {...p} onPress={p.onPress} disabled={p.disabled} style={{ opacity: p.disabled ? 0.5 : 1 }}>
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

interface SmallButtonProps {
	text: string;
	textColor?: string;
	onPress?: () => void;
	disabled?: boolean;

	backgroundColor?: string;
	style?: any;
}

export const SmallButton: React.FC<SmallButtonProps> = (p) => {
	const theme = useTheme();
	return (
		<SmallButtonBody {...p} onPress={p.onPress} activeOpacity={0.5} disabled={p.disabled} style={{ ...p.style, opacity: p.disabled ? 0.5 : 1 }}>
			<Text style={{ alignSelf: 'center' }} color={p.textColor || theme.text} weight="medium">
				{p.text}
			</Text>
		</SmallButtonBody>
	);
};

const SmallButtonBody = styled(TouchableOpacity)<SmallButtonProps>`
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.step1};
	align-self: center;
	height: 31px;
	justify-content: center;
	padding: 0px 10px;
	border-radius: 10px;
`;
