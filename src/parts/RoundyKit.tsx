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
}) => {
	const [v, setV] = useState('');
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
	const theme = useTheme();
	const sh = StyleSheet.flatten(style);

	const onChangeText = useCallback(
		(e: string) => {
			setV(e);
			if (!!onTextChange) {
				onTextChange(e);
			}

			// FutureSet
			if (onFinishTyping) {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				setTimeoutId(() =>
					setTimeout(() => {
						onFinishTyping(e);
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
