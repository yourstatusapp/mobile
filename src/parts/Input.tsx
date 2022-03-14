import * as React from 'react';
import { Text } from '@parts';
import { ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface InputProps {
	value?: string;
	placeholder?: string;
	onChange?: (v: string) => void;
	disabled?: boolean;
	textContentType?: 'email' | 'none';
	autoFocus?: boolean;

	style?: ViewStyle;
	className?: string;
}

export const Input: React.FC<InputProps> = ({ onChange, placeholder, value, style, disabled, textContentType, autoFocus }) => {
	const theme = useTheme();
	return (
		<InputBox>
			{!!placeholder && (
				<PlaceholderBox>
					<Text size={13} weight="600" color={theme.text}>
						{placeholder}
					</Text>
				</PlaceholderBox>
			)}
			<InputBody
				autoFocus={autoFocus}
				style={style}
				value={value}
				onChangeText={onChange}
				disabled={disabled || false}
				autoCorrect={false}
				autoCompleteType="off"
				autoCapitalize="none"
				textContentType={textContentType}
			/>
		</InputBox>
	);
};

const InputBox = styled.View`
	position: relative;
	margin-top: 10px;
`;

const PlaceholderBox = styled.View`
	left: 25px;
	top: -10px;
	position: absolute;
	background-color: ${({ theme }) => theme.theme.background};
	padding: 2px 5px;
	border-radius: 4px;
	z-index: 10;
`;

const InputBody = styled.TextInput<{ disabled: boolean }>`
	height: 50px;
	padding: 0px 20px;
	color: ${({ theme }) => theme.theme.text};
	z-index: 9;
	border-radius: 100px;
	border: solid 1px ${({ theme }) => theme.theme.darker1};
`;
