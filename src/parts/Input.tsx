import * as React from 'react';
import { ViewStyle, TextInputProps } from 'react-native';
import styled from 'styled-components/native';

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
	font-weight: 600;
	border-radius: 18px;
	flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
`;

export const SmallInput: React.FC<InputProps> = (p) => {
	return <SmallInputbody {...p}></SmallInputbody>;
};

const SmallInputbody = styled(Input)`
	background-color: ${({ theme }) => theme.step1};
	align-self: center;
	width: 100%;

	height: 31px;
	justify-content: center;
	padding: 0px 10px;
	border-radius: 10px;
`;
