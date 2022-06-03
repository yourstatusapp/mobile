import { Text } from '@parts';
import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { StyleSheet, ViewStyle } from 'react-native';

interface ButtonType {
	text?: string;
	color?: string;
	onPress?: () => void;
	disabled?: boolean;
	backgroundColor?: string;
	style?: ViewStyle;
}

export const Button: React.FC<ButtonType> = ({ text, onPress, color, disabled, style }) => {
	const theme = useTheme();
	const sh = StyleSheet.flatten([style]);

	return (
		<ButtonBody
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				sh,
				{
					opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
				},
			]}>
			<Text center size={16} weight="700" color={color || theme.text}>
				{text}
			</Text>
		</ButtonBody>
	);
};

const ButtonBody = styled.Pressable`
	padding: 6px 10px;
	height: 52px;
	border-radius: 100px;
	background-color: #3f5ce7;
	align-self: center;
	opacity: 0.3;
	justify-content: center;
	width: 100%;
`;

interface SmallButtonProps {
	text: string;
	onPress: () => void;
	color?: string;
	backgroundColor?: string;
	disabled?: boolean;
}

export const SmallButton: React.FC<SmallButtonProps> = ({
	onPress,
	text,
	color,
	backgroundColor,
	disabled,
}) => {
	const theme = useTheme();
	return (
		<SmallButtonBody
			onPress={onPress}
			style={({ pressed }) => [
				{
					backgroundColor: backgroundColor || theme.primary,
					opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
				},
			]}>
			<Text color={theme.background} bold>
				{text}
			</Text>
		</SmallButtonBody>
	);
};

const SmallButtonBody = styled.Pressable`
	/* padding: 6px 10px; */
	height: 25px;
	padding: 0px 12px;
	border-radius: 100px;
	/* background-color: #3f5ce7; */
	align-self: center;
	/* opacity: 0.3; */
	justify-content: center;
`;
