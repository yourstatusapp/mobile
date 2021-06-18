import * as React from 'react';
import styled from 'styled-components/native';

interface InputProps {
	placeholder?: string;
	placeholderTextColor?: string;

	// styling
	shrink?: boolean;
	selectionColor?: string;
}

export const Input: React.FC<InputProps> = (p) => {
	const {} = p;

	return <InputBody {...p} placeholderTextColor={p.placeholderTextColor || ''} placeholder={p.placeholder || ''} selectionColor={p.selectionColor || 'red'} />;
};

const InputBody = styled.TextInput<InputProps>`
	height: 60px;
	background-color: #141414;
	color: white;
	padding-left: 30px;
	font-weight: 600;
	border-radius: 18px;
	flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
	width: 100%;
`;
