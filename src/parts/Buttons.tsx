import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from './icons/Icon';

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
	color?: string;

	backgroundColor?: string;
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
	padding: 5px;
	justify-content: center;
	align-items: center;
	height: ${({ size }) => size || 1 * 4}px;
	width: ${({ size }) => size || 1 * 4}px;
	/* align-self: center; */
	border-radius: 12px;
	background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
`;
