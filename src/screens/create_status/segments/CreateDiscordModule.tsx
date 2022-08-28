import React, { useEffect, useState } from 'react';
import { Block } from '@parts';
import { TextInput } from 'react-native';
import { useTheme } from '@hooks';
import { IModuleProps } from '.';
import { StatusTypes } from '@core';

let timeoutID: NodeJS.Timeout;
export const CreateDiscordModule: React.FC<IModuleProps> = ({ onDataChange, validateStatus }) => {
	const { theme } = useTheme();
	const [textInputValue, setTextInputValue] = useState('');
	const [inviteCode, setInviteCode] = useState('');

	useEffect(() => {
		onDataChange({ statusText: textInputValue, data: { type: 'DISCORD_GUILD', inviteCode: inviteCode } });
	}, [textInputValue, inviteCode]);

	useEffect(() => {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			if (validateStatus) validateStatus(StatusTypes.DISCORD_GUILD, { inviteCode });
		}, 1000);
	}, [inviteCode]);

	return (
		<Block paddingHorizontal={10}>
			<TextInput
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
				placeholder="Place you're invite code"
				placeholderTextColor={theme.textFadeLight}
				style={{ fontSize: 16, color: theme.text }}
				value={inviteCode}
				defaultValue={inviteCode}
				onChangeText={v => {
					setInviteCode(v);
				}}
			/>
		</Block>
	);
};
