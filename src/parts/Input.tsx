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
	const { placeholderTextColor, placeholder, selectionColor, style } = p;

	return <InputBody {...p} style={style} placeholderTextColor={placeholderTextColor} placeholder={placeholder} selectionColor={selectionColor} />;
};

const InputBody = styled.TextInput<InputProps>`
	height: 60px;
	color: black;
	font-weight: 600;
	border-radius: 18px;
	flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
`;
