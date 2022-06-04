import { Text } from '@parts';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface RoundyInputProps {
	initialValue?: string;
	placeholder?: string;
	disabled?: boolean;
	onTextChange?: (e: string) => void;
	autoCorrect?: boolean;
	style?: ViewStyle;
	extend?: boolean;
	// number in seconds
	FinishTypingCooldown?: number;
	onFinishTyping?: (v: string) => void;
	updateValue?: string;
}

export const RoundyInput: React.FC<RoundyInputProps> = ({
	onTextChange,
	autoCorrect,
	disabled,
	style,
	placeholder,
	extend,
	initialValue,
	FinishTypingCooldown,
	onFinishTyping,
	updateValue,
}) => {
	const [v, setV] = useState('');
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
	const theme = useTheme();
	const sh = StyleSheet.flatten(style);

	const onChangeText = useCallback(
		(e: string) => {
			setV(e);
			if (onTextChange) {
				onTextChange(e);
			}

			// FutureSet
			if (onFinishTyping) {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				setTimeoutId(() =>
					setTimeout(() => {
						onFinishTyping(v);
					}, FinishTypingCooldown || 1000),
				);
			}
		},
		[FinishTypingCooldown, onFinishTyping, onTextChange, timeoutId, v],
	);

	const firstRender = useCallback(() => {
		if (initialValue) {
			setV(initialValue);

			if (onTextChange) {
				onTextChange(initialValue);
			}
		}
	}, [initialValue, onTextChange]);

	useEffect(() => {
		firstRender();
	}, []);

	useEffect(() => {
		console.log(updateValue);
	}, [updateValue]);

	return (
		<RoundyInputBody
			style={sh}
			value={v}
			onChangeText={onChangeText}
			autoCorrect={autoCorrect}
			pointerEvents={disabled ? 'none' : 'auto'}
			placeholder={placeholder}
			placeholderTextColor={theme.textFadeLight}
			multiline={extend}
			numberOfLines={3}
			extendBoxStyle={extend}
		/>
	);
};

const RoundyInputBody = styled.TextInput<{ extendBoxStyle?: boolean }>`
	border-radius: 5px;
	padding: ${({ extendBoxStyle }) => (extendBoxStyle ? '5px 10px' : '10px 10px')};
	padding: 5px 10px;
	color: ${({ theme }) => theme.text};
	border: solid 1.2px ${({ theme }) => theme.textFadeLight}20;
	background-color: ${({ theme }) => theme.backgroundDarker};
	font-size: 14px;
	height: ${({ extendBoxStyle }) => (extendBoxStyle ? '80' : '40')}px;
	${({ extendBoxStyle }) => (extendBoxStyle ? 'line-height: 21;' : '')}
`;

interface RoundyButtonProps {
	text: string;
	disabled?: boolean;
	onPress?: () => void;
}

export const RoundyButton: React.FC<RoundyButtonProps> = ({ text, disabled, onPress }) => {
	return (
		<RoundyButtonBody
			onPress={onPress}
			style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.75 : 1 }]}
			disabled={disabled}>
			<Text center weight="700" size={14}>
				{text}
			</Text>
		</RoundyButtonBody>
	);
};

const RoundyButtonBody = styled.Pressable`
	background-color: ${({ theme }) => theme.primary2};
	border-radius: 6px;
	height: 40px;
	justify-content: center;
`;
