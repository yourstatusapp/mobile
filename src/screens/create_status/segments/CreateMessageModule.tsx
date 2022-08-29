import React, { useCallback, useEffect, useState } from 'react';
import { Block } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import core from '@core';
import { IModuleProps } from '.';

let timeoutID: NodeJS.Timeout;
export const CreateMessageModule: React.FC<IModuleProps> = ({ validateStatus, forceUpdateStatusText }) => {
	const { theme } = useTheme();
	const [textInputValue, setTextInputValue] = useState('');

	const updateDataChange = useCallback(() => {
		validateStatus({
			statusText: textInputValue,
			data: {},
			type: 'MESSAGE',
		});
	}, [textInputValue]);

	useEffect(() => {
		if (forceUpdateStatusText) forceUpdateStatusText(textInputValue);
		core.newStatusDraft.set({ statusText: textInputValue, data: {}, type: 'MESSAGE' });

		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			if (!!textInputValue) updateDataChange();
		}, 1000);
	}, [textInputValue]);

	return (
		<Block>
			<TextInput
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder={'Put here your message!'}
				placeholderTextColor={theme.textFadeLight}
				style={{ fontSize: 16, color: theme.text, marginLeft: 10 }}
				value={textInputValue}
				defaultValue={textInputValue}
				onChangeText={setTextInputValue}
			/>
		</Block>
	);
};
