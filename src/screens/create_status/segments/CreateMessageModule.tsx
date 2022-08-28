import React, { useEffect, useState } from 'react';
import { Block } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import { CreateStatusType, MessageStatus, StatusTypes, ValidateStatusReturn } from '@core';
import { IModuleProps } from '.';

export const CreateMessageModule: React.FC<IModuleProps> = ({ validateStatus, onDataChange }) => {
	const { theme } = useTheme();
	const [textInputValue, setTextInputValue] = useState('');

	useEffect(() => {
		onDataChange({ statusText: textInputValue, data: { type: 'MESSAGE' } });
	}, [textInputValue]);

	return (
		<Block>
			<TextInput
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder={'Put here your message!'}
				placeholderTextColor={theme.textFadeLight}
				style={{ fontSize: 16, color: theme.text }}
				value={textInputValue}
				defaultValue={textInputValue}
				onChangeText={setTextInputValue}
			/>
		</Block>
	);
};
