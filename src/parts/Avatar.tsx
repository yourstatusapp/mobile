import * as React from 'react';
import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';

interface AvatarProps {
	src: string;
	size?: number;
	dot_status?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
	const { src, dot_status } = props;

	const IMG: React.FC<any> = (p) => (src ? <Image {...p} source={{ uri: src }} {...props} /> : <Circle {...p} {...props} />);

	// if (!src) {
	// 	return <Circle {...props} />;
	// }

	if (!dot_status) {
		return <IMG {...props} style={{ margin: 5 }} source={{ uri: src }} />;
	}

	return (
		<AvatarBody dot_status={dot_status}>
			<IMG source={{ uri: src }} {...props} />
			{/* <Dot dot_status={dot_status} /> */}
		</AvatarBody>
	);

	// if (dot_status) {
	// 	return (
	// 		<AvatarBody dot_status={dot_status}>
	// 			<IMG source={{ uri: src }} {...props} />
	// 			{/* <Dot dot_status={dot_status} /> */}
	// 		</AvatarBody>
	// 	);
	// } else {
	// 	return <IMG source={{ uri: src }} {...props} />;
	// }
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

const Dot = styled.View<{ dot_status: string }>`
	height: 18px;
	width: 18px;
	background-color: ${({ dot_status }) => (dot_status === 'available' ? '#6ed457' : dot_status === 'dnd' && '#FE4D4D')};
	border-radius: 20px;
	position: absolute;
	bottom: 0px;
	right: 0px;
	border: solid 3px ${({ theme }) => theme.background};
`;

const AvatarBody = styled.View<any>`
	position: relative;
	align-self: flex-start;
	border-radius: 500px;
	padding: 3px;
	border: solid 2px ${({ dot_status }) => (dot_status === 'available' ? '#82db6e' : dot_status === 'dnd' ? '#f96565' : 'transparent')};
`;
