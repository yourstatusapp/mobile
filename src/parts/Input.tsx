import * as React from 'react';
import { Text } from '@parts';
import { TextInputIOSProps, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@hooks';

interface InputProps {
	value?: string;
	placeholder?: string;
	onChange?: (v: string) => void;
	disabled?: boolean;
	textContentType?: TextInputIOSProps['textContentType'];
	autoFocus?: boolean;

	style?: ViewStyle;
	className?: string;
}

export const Input: React.FC<
	InputProps & {
		outerStyle?: ViewStyle;
	}
> = ({ onChange, placeholder, value, style, disabled, textContentType, autoFocus, outerStyle }) => {
	const { theme } = useTheme();
	return (
		<InputBox style={outerStyle}>
			{!!placeholder && (
				<PlaceholderBox>
					<Text size={13} medium color={theme.text}>
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
				// @ts-ignore
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
	background-color: ${({ theme }) => theme.background};
	padding: 2px 5px;
	border-radius: 4px;
	z-index: 10;
`;

const InputBody = styled.TextInput<{ disabled: boolean }>`
	height: 50px;
	padding: 0px 20px;
	color: ${({ theme }) => theme.text};
	z-index: 9;
	border-radius: 100px;
	border: solid 1px ${({ theme }) => theme.darker1};
`;
