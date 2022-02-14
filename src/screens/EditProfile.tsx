import core, { AppAlert, request } from '@core';
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

	const [HasChanged, SetHasChanged] = useState(false);

	const [Location, SetLocation] = useState('');
	const [Bio, SetBio] = useState('');

	const [Username, SetUsername] = useState('');
	const [Available, SetAvailable] = useState(false);
	const [Loaded, SetLoaded] = useState(false);
	const [ErrorMessage, SetErrorMessage] = useState('');

	const saveInformation = useCallback(async () => {
		if (!profile) return;

		let newData: { username: string; bio: string; location: string } = {};

		if (Username.toLocaleLowerCase() !== profile?.username?.toLocaleLowerCase()) {
			newData.username = Username;
		}

		if (Location !== (profile.location || '')) {
			newData.location = Location;
		}

		if (Bio !== (profile.bio || '')) {
			newData.bio = Bio;
		}

		const res = await request('patch', '/profile', { data: newData });
		if (res.data) {
			AppAlert(true, 'Successfull', 'Profile has been updated');
			nav.goBack();
		} else {
			SetErrorMessage(res.message);
		}
	}, [Username, nav, profile, Location, Bio]);

	const usernameCheck = async (username: string) => {
		if (!profile) return;

		if (username.toLocaleLowerCase() === profile?.username?.toLocaleLowerCase()) {
			SetErrorMessage('');
			SetAvailable(false);
			SetLoaded(true);
			return;
		}

		SetErrorMessage('');
		const res = await request<boolean>('post', '/profile/username/check', { data: { username } });

		if (res.data === false) {
			SetErrorMessage(res.message);
			SetAvailable(false);
		} else {
			SetAvailable(true);
		}
		SetLoaded(true);
		// if (!a.data) SetErrorMessage(a?.message || '');
		// setLoaded(true);
		// setAvailable(a?.data);
	};

	useEffect(() => {
		SetLoaded(false);
		clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			usernameCheck(Username);
		}, 500);
	}, [Username]);

	useEffect(() => {
		if (!profile) return;
		SetUsername(profile.username || '');
		SetLocation(profile.location || '');
		SetBio(profile.bio || '');
	}, [profile]);

	useEffect(() => {
		SetHasChanged(false);
		if ((profile.username || '') !== Username) {
			SetHasChanged(true);
		}
		if ((profile.location || '') !== Location) {
			SetHasChanged(true);
		}
		if ((profile.bio || '') !== Bio) {
			SetHasChanged(true);
		}
	}, [Username, Location, Bio, Available, profile]);

	return (
		<Block safe flex={1}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={70}>
				<ModalHeader title="Edit Profile" />
				<Spacer size={25} />
				<Text size={14} color="#D53F3F" paddingLeft={10} paddingBottom={10}>
					{ErrorMessage}
				</Text>
				<Text size={14} color={colors.white60} paddingLeft={10} weight="600">
					Username
				</Text>
				<CustomEditInput
					placeholder="username"
					placeholderTextColor={colors.white20}
					value={Username}
					onChangeText={v => {
						SetUsername(v);
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor:
							Username === ''
								? '#D53F3F'
								: Username.toLowerCase() === profile?.username.toLowerCase()
								? colors.white40
								: !Loaded
								? 'gray'
								: Available
								? '#62CB4E'
								: '#D53F3F',
					}}
				/>

				<Spacer size={20} />

				<Text size={14} color={colors.white60} paddingLeft={10} weight="600">
					Location
				</Text>

				<CustomEditInput
					placeholder="Location"
					placeholderTextColor={colors.white20}
					value={Location}
					onChangeText={v => {
						SetLocation(v);
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor: (profile.location || '') == Location ? colors.white40 : '#62CB4E',
					}}
				/>

				<Spacer size={20} />
				<Text size={14} color={colors.white60} paddingLeft={10} weight="600">
					Bio
				</Text>
				<CustomEditInput
					placeholder="About yourself"
					placeholderTextColor={colors.white20}
					value={Bio}
					onChangeText={v => {
						SetBio(v);
					}}
					autoCapitalize="none"
					autoCorrect={false}
					autoCompleteType="off"
					style={{
						borderBottomColor: (profile.bio || '') == Bio ? colors.white40 : '#62CB4E',
					}}
				/>

				<Fill />
				<Block flex={0} paddingHorizontal={10}>
					<Button text={'Save'} onPress={() => saveInformation()} disabled={HasChanged === false} style={{ marginHorizontal: 20 }} />
				</Block>
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
