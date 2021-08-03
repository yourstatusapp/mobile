import * as React from 'react';
import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';

interface AvatarProps {
	src: string;
	size?: number;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
	const { src } = props;

	if (!src) {
		return <Circle {...props} />;
	}

	return <Image source={{ uri: src }} {...props} />;
};

const Image = styled(FastImage)<AvatarProps>`
	${({ size }) => `
	height: ${size || 50}px;
	width: ${size || 50}px;
	border-radius: ${size || 50}px;
	`}
	border-radius: 100px;
	background-color: ${({ theme }) => theme.step2};
`;

const Circle = styled.View<AvatarProps>`
	${({ size }) => `
	height: ${size || 50}px;
	width: ${size || 50}px;
	border-radius: ${size || 50}px;
	`}
	background-color: ${({ theme }) => theme.step2};
`;
