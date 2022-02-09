import core, { request } from '@core';
import { Block, ModalHeader, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

let timeout_id: NodeJS.Timeout;

export const EditProfile = () => {
	const { colors } = useTheme();
	const [Username, SetUsername] = useState('');
	const [Bio, SetBio] = useState('');
	const profile = usePulse(core.profile.state.profile);

	const updateProfile = async () => {
		const res = await request('patch', '/profile', { data: {} });
	};

	const [NewUsrNameAvailable, SetNewUsrNameAvailable] = useState(false);
	const [ErrorMessage, SetErrorMessage] = useState('');
	const [NewUsrName, SetNewUsrName] = useState('');
	const [NewUsernameLoaded, SetNewUsernameLoaded] = useState(false);

	const checkUsernameAvailable = useCallback(async () => {
		SetErrorMessage('');
		SetNewUsrNameAvailable(false);
		SetNewUsernameLoaded(false);

		if (!Username) {
			SetErrorMessage('Use a valid username');
			SetNewUsernameLoaded(true);
			return;
		}
		const res = await request('get', '/profile/username/check', { data: { username: Username } });
		SetNewUsernameLoaded(true);
		if (res.data === false) {
			SetErrorMessage(res.message);
			// res.message explains reason
		} else if (res.data === true) {
			SetNewUsrNameAvailable(true);
		}
	}, [Username]);

	useEffect(() => {
		if (timeout_id) clearTimeout(timeout_id);
		timeout_id = setTimeout(() => {
			checkUsernameAvailable();
		}, 1000);
	}, [Username]);

	useEffect(() => {
		if (profile.account_id) {
			SetUsername(profile.username);
			SetBio(profile.bio);
		}
	}, []);

	return (
		<Block>
			<ModalHeader title="Edit Profile" />
			<Spacer size={25} />
			<Text size={12} color="red">
				{ErrorMessage}
			</Text>
			<CustomEditInput
				placeholder="username"
				placeholderTextColor={colors.white20}
				value={Username}
				onChangeText={v => SetUsername(v)}
				autoCapitalize="none"
				autoCorrect={false}
				autoCompleteType="off"
				style={{ borderBottomColor: !NewUsernameLoaded ? 'orange' : Username === profile.username ? 'gray' : NewUsrNameAvailable ? 'green' : 'orange' }}
			/>
			<CustomEditInput value={Bio} onChangeText={v => SetBio(v)} />
			<CustomEditInput value={profile.location} />
		</Block>
	);
};

const CustomEditInput = styled.TextInput.attrs({ autoCapitalize: 'none', autoCorrect: false, autoCompleType: 'off' })`
	color: white;
	padding: 10px;
	border-bottom-color: ${({ theme }) => theme.colors.white40};
	border-bottom-width: 1px;
	margin-bottom: 10px;
	/* border-bottom */
`;
