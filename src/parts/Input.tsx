import * as React from 'react';
import { ViewStyle, TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface InputProps extends TextInputProps {
	placeholder?: string;
	placeholderTextColor?: string;

	// styling
	shrink?: boolean;
	selectionColor?: string;
	style?: ViewStyle;
}

export const Input: React.FC<InputProps> = (p) => {
	const { style } = p;

	return <InputBody {...p} style={style} />;
};

const InputBody = styled.TextInput<InputProps>`
	height: 60px;
	color: black;
	font-weight: 500;
	font-size: 16px;
	border-radius: 18px;
	flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
`;

export const SmallInput: React.FC<InputProps> = (p) => {
	const theme = useTheme();
	return <SmallInputbody {...p} placeholderTextColor={theme.textFade}></SmallInputbody>;
};

const SmallInputbody = styled(Input)`
	background-color: ${({ theme }) => theme.step1};
	color: ${({ theme }) => theme.text};
	align-self: center;
	width: 100%;

	height: 40px;
	justify-content: center;
	padding: 3px 10px;
	border-radius: 10px;
`;

export const RegularInput: React.FC<InputProps> = (p) => {
	const {} = p;

	return <RegularInputbody {...p} />;
};

const RegularInputbody = styled(Input)`
	background-color: ${({ theme }) => theme.step1};
	align-self: center;
	color: ${({ theme }) => theme.text};
	width: 100%;

	height: 50px;
	justify-content: center;
	padding: 3px 10px;
	border-radius: 13px;
`;
