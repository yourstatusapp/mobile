import * as React from 'react';
import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AvatarProps {
	src: string;
	size?: number;
	style?: any;

	storie_availible?: boolean;
	onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
	const { src, storie_availible, onPress, style } = props;

	const IMG: React.FC<any> = (p) => (
		<ClickArea {...p} onPress={onPress} style={{ ...style, ...p.style }}>
			{src ? <Image {...p} source={{ uri: src }} /> : <Circle {...p} />}
		</ClickArea>
	);

	if (storie_availible) {
		return (
			<StorieCricle {...props}>
				<IMG {...props} source={{ uri: src }} style={{}} />
			</StorieCricle>
		);
	}

	return <IMG style={{ padding: 3 }} {...props} source={{ uri: src }} />;
};

const ClickArea = styled(TouchableOpacity)`
	/* padding: 1px; */
`;

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

const StorieCricle = styled.View<AvatarProps>`
	justify-content: center;
	align-items: center;
	${({ size, theme }) => `
		border-color: ${theme.primary};
		border-width: 2px;
		border-radius: ${(size || 50) + 6}px;
		height: ${(size || 50) + 6}px;
		width: ${(size || 50) + 6}px;
	`}
`;
