import * as React from 'react';
import { Text } from '@parts';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface InputProps {
	value?: string;
	placeholder?: string;
	onChange?: (v: string) => void;
	disabled?: boolean;
	textContentType?: 'email' | 'none';

	style?: ViewStyle;
	className?: string;
}

export const Input: React.FC<InputProps> = ({ onChange, placeholder, value, style, disabled, textContentType }) => {
	return (
		<InputBox>
			{placeholder && (
				<PlaceholderBox>
					<Text size={14} weight="500" color="#b8b8b8">
						{placeholder}
					</Text>
				</PlaceholderBox>
			)}
			<InputBody
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
	background-color: #0a0a18;
	padding: 2px 5px;
	border-radius: 4px;
	z-index: 10;
`;

const InputBody = styled.TextInput<{ disabled: boolean }>`
	height: 50px;
	padding: 0px 20px;
	color: white;
	z-index: 9;
	border-radius: 100px;
	border: solid 1px #292929;
`;
