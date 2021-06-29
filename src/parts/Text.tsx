import * as React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

interface TextProps {
	style?: TextStyle;

	size?: number;
	center?: boolean;
}
export const Text: React.FC<TextProps> = (p) => {
	const { style, children } = p;

	return (
		<TextBody style={style} {...p}>
			{children}
		</TextBody>
	);
};

const TextBody = styled.Text<TextProps>`
	font-family: 'SF Pro';
	font-weight: 500;
	font-size: ${({ size }) => size || 16}px;
	${({ center }) => center && 'text-align: center;'}

	color: white;
`;
