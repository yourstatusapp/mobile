import core, { AppAlert, request } from '@core';
import { Block, Button, Fill, IconButton, ModalHeader, Spacer, Text, TextButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { EditUsername } from './parts/EditUsername';

let timeout: NodeJS.Timeout;

export const EditProfile = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const profile = usePulse(core.profile.profile);

	const [objectmodified, setObjectmodified] = useState({ username: false, location: false, bio: false });

	// USERNAME LOGIC
	const [username, setUsername] = useState('');
	const [usernameLoading, setUsernameLoading] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [usernameErrMsg, setUsernameErrMsg] = useState('');

	const CheckUsernameAvailibty = React.useCallback(
		(usernameInput: string) => {
			// check if the object has been modified
			if (objectmodified.username === false) return;

			setUsernameValid(false);
			setUsernameErrMsg('');
			setUsernameLoading(true);

			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(async () => {
				// check for the same username
				if (username.toLowerCase() === profile.username.toLowerCase()) {
					setUsernameErrMsg('');

					setObjectmodified(prevState => {
						let a = Object.assign({}, prevState);
						a.username = false;
						return a;
					});
					return;
				}

				const res = await request<{ valid: boolean }>('post', '/profile/username/check', { data: { username: usernameInput } });
				setUsernameLoading(false);
				if (res.data) {
					setUsernameValid(res.data?.valid);
					if (!res.data?.valid) setUsernameErrMsg(res.message);
				}
			}, 1000);
		},
		[objectmodified.username, profile.username, username],
	);

	useEffect(() => {
		CheckUsernameAvailibty(username);
	}, [username]);

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const saveInformation = useCallback(async () => {
		if (!profile) return;

		setLoading(true);
		const res = await request('patch', '/profile', { data: { username: username } });
		setLoading(false);

		if (res.data) {
			AppAlert(true, 'Successfull', 'Profile has been updated');
			core.profile.profile.patch({ username: username });
			nav.goBack();
		} else {
			setErrorMessage(res.message);
		}
	}, [nav, profile, username]);

	// const [HasChanged, SetHasChanged] = useState(false);

	// const [Location, SetLocation] = useState('');
	// const [Bio, SetBio] = useState('');

	// const [Available, SetAvailable] = useState(false);
	// const [Loaded, SetLoaded] = useState(false);

	// useEffect(() => {
	// 	if (!profile) return;
	// 	SetUsername(profile?.username || '');
	// 	SetLocation(profile?.location || '');
	// 	SetBio(profile?.bio || '');
	// }, [profile]);

	// useEffect(() => {
	// 	SetHasChanged(false);
	// 	if ((profile.username || '') !== Username) {
	// 		SetHasChanged(true);
	// 	}
	// 	if ((profile.location || '') !== Location) {
	// 		SetHasChanged(true);
	// 	}
	// 	if ((profile.bio || '') !== Bio) {
	// 		SetHasChanged(true);
	// 	}
	// }, [Username, Location, Bio, Available, profile]);

	useEffect(() => {
		setUsername(profile.username);
	}, []);

	return (
		<Block flex={1} color={theme.background}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={70}>
				<ModalHeader title="Edit Profile" />
				<Spacer size={25} />

				{/* USERNAME */}

				<Block flex={0} vCenter>
					<CustomEditInput
						placeholder="username"
						placeholderTextColor={theme.textFade}
						value={username}
						onChangeText={v => {
							setObjectmodified(prevState => {
								let a = Object.assign({}, prevState);
								a.username = true;
								return a;
							});
							setUsername(v);
						}}
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType="off"
						style={{
							borderBottomColor: usernameLoading
								? theme.darker1
								: (profile.username || '') === username
								? theme.darker1
								: usernameValid
								? '#62CB4E'
								: '#FF6161',
						}}
					/>
					{(profile.username || '') != username && usernameLoading && (
						<ActivityIndicator color={theme.textFadeLight} style={{ position: 'absolute', right: 20, paddingBottom: 20 }} />
					)}
					{!!usernameErrMsg && (
						<Text color="#FF6161" size={12} marginTop={5} marginLeft={20}>
							{usernameErrMsg}
						</Text>
					)}
				</Block>
				<Text>{JSON.stringify(objectmodified)}</Text>

				{/* LOCATION */}
				{/* <ModalHeader title="Edit Profile" />
				<Spacer size={25} />
				<Text size={14} color="#D53F3F" paddingLeft={10} paddingBottom={10}>
					{ErrorMessage}
				</Text>
				<Text size={14} color={theme.text} paddingLeft={10} weight="600">
					Username
				</Text>

				<Block flex={0} vCenter>
					<CustomEditInput
						placeholder="username"
						placeholderTextColor={theme.textFade}
						value={Username}
						onChangeText={v => {
							SetUsername(v);
						}}
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType="off"
						style={{
							borderBottomColor: UsernameLoading
								? theme.darker1
								: (profile.username || '') === Username
								? theme.darker1
								: UsernameValid
								? '#62CB4E'
								: '#FF6161',
						}}
					/>
					{(profile.username || '') != Username && UsernameLoading && (
						<ActivityIndicator color={theme.textFadeLight} style={{ position: 'absolute', right: 20, paddingBottom: 20 }} />
					)}
				</Block> */}

				{/* <Spacer size={20} />

				<Text size={14} color={theme.text} paddingLeft={10} weight="600">
					Location
				</Text> */}

				{/* <CustomEditInput
					placeholder="Location"
					placeholderTextColor={theme.textFadeLight}
					value={Location}
					onChangeText={v => {
						SetLocation(v);
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor: (profile.location || '') == Location ? theme.darker1 : '#62CB4E',
					}}
				/> */}

				{/* <Spacer size={20} /> */}
				{/* <Text size={14} color={theme.textFade} paddingLeft={10} weight="600">
					Bio
				</Text>
				<CustomEditInput
					placeholder="About yourself"
					placeholderTextColor={theme.textFadeLight}
					value={Bio}
					onChangeText={v => {
						SetBio(v);
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor: (profile.bio || '') == Bio ? theme.darker1 : '#62CB4E',
					}}
				/> */}

				<Fill />
				<Button text="Save" disabled={loading} onPress={() => saveInformation()} />
			</KeyboardAvoidingView>
		</Block>
	);
};

const CustomEditInput = styled.TextInput.attrs({ autoCapitalize: 'none', autoCorrect: false, autoCompleType: 'off' })`
	color: white;
	height: 29px;
	padding-left: 10px;
	/* padding: 10px; */
	border-bottom-color: ${({ theme }) => theme.textFadeLight};
	border-bottom-width: 1px;
	margin-bottom: 10px;
	/* border-bottom */
`;
