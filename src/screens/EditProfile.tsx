import core, { request } from '@core';
import { Block, Button, Fill, ModalHeader, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

let timeoutID: NodeJS.Timeout;

export const EditProfile = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const profile = usePulse(core.profile.state.profile);

	const [Username, setUsername] = useState('');
	const [Available, setAvailable] = useState(false);
	const [Loaded, setLoaded] = useState(false);
	const [ErrorMessage, SetErrorMessage] = useState('');

	const saveInformation = useCallback(async () => {
		const res = await request('patch', '/profile', { data: { username: Username } });
		if (res.data) {
			nav.goBack();
		} else {
			SetErrorMessage(res.message);
		}
	}, [Username, nav]);

	const usernameCheck = async (username: string) => {
		SetErrorMessage('');
		const res = await request<boolean>('post', '/profile/username/check', { data: { username } });

		if (res.data === false) {
			SetErrorMessage(res.message);
			setAvailable(false);
		} else {
			setAvailable(true);
		}
		setLoaded(true);
		// if (!a.data) SetErrorMessage(a?.message || '');
		// setLoaded(true);
		// setAvailable(a?.data);
	};

	useEffect(() => {
		setLoaded(false);
		clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			usernameCheck(Username);
		}, 500);
	}, [Username]);

	useEffect(() => {
		if (!profile) return;
		setUsername(profile.username);
	}, [profile]);

	return (
		<Block safe flex={1}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={70}>
				<ModalHeader title="Edit Profile" />
				<Spacer size={25} />
				<Text size={14} color="#D53F3F" paddingLeft={10} paddingBottom={10}>
					{ErrorMessage}
				</Text>
				<Text size={14} color={colors.white60} paddingLeft={10}>
					Username
				</Text>
				<CustomEditInput
					placeholder="username"
					placeholderTextColor={colors.white20}
					value={Username}
					onChangeText={v => {
						setUsername(v?.trimStart()?.trimEnd());
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor:
							Username === '' ? '#D53F3F' : Username === profile?.username ? colors.white40 : !Loaded ? 'gray' : Available ? 'green' : '#D53F3F',
					}}
				/>

				<Fill />
				<Button
					text={'Save'}
					onPress={() => saveInformation()}
					disabled={Username === profile.username || Username === '' || !Loaded || !Available}
					style={{ marginHorizontal: 20 }}
				/>
			</KeyboardAvoidingView>
		</Block>
	);
};

const CustomEditInput = styled.TextInput.attrs({ autoCapitalize: 'none', autoCorrect: false, autoCompleType: 'off' })`
	color: white;
	/* background-color: red; */
	height: 29px;
	padding-left: 10px;
	/* padding: 10px; */
	border-bottom-color: ${({ theme }) => theme.colors.white40};
	border-bottom-width: 1px;
	margin-bottom: 10px;
	/* border-bottom */
`;
