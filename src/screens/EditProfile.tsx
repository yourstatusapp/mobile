import core, { AppAlert, request } from '@core';
import { Block, Button, Fill, ModalHeader, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

let timeout: NodeJS.Timeout;

export const EditProfile = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const profile = usePulse(core.profile.profile);

	const [HasChanged, SetHasChanged] = useState(false);

	const [Location, SetLocation] = useState('');
	const [Bio, SetBio] = useState('');

	const [Username, SetUsername] = useState('');
	const [Available, SetAvailable] = useState(false);
	const [Loaded, SetLoaded] = useState(false);
	const [ErrorMessage, SetErrorMessage] = useState('');
	const [UsernameLoading, SetUsernameLoading] = useState(false);
	const [UsernameValid, SetUsernameValid] = useState(false);
	const [UsernameErrMsg, SetUsernameErrMsg] = useState('');

	const saveInformation = useCallback(async () => {
		if (!profile) return;

		let newData: { username: string; bio: string; location: string } = {};
		// check which keys has been changed and will be used to be updated

		if (UsernameValid) {
			if (Username !== (profile?.username || '')) {
				newData.username = Username;
			}
		}

		if (Location !== (profile?.location || '')) {
			newData.location = Location;
		}

		if (Bio !== (profile?.bio || '')) {
			newData.bio = Bio;
		}

		const res = await request('patch', '/profile', { data: newData });
		if (res.data) {
			AppAlert(true, 'Successfull', 'Profile has been updated');
			nav.goBack();
		} else {
			SetErrorMessage(res.message);
		}
	}, [Username, nav, profile, Location, Bio, UsernameValid]);

	const usernameCheck = async (usernameInput: string) => {
		SetUsernameValid(false);
		SetUsernameErrMsg('');
		SetUsernameLoading(true);

		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(async () => {
			const res = await request<{ valid: boolean }>('post', '/profile/username/check', { data: { username: usernameInput } });
			SetUsernameLoading(false);
			if (res.data) {
				SetUsernameValid(res.data?.valid);
				if (!res.data?.valid) SetUsernameErrMsg(res.message);
			}
		}, 1000);
	};

	useEffect(() => {
		usernameCheck(Username);
	}, [Username]);

	useEffect(() => {
		if (!profile) return;
		SetUsername(profile?.username || '');
		SetLocation(profile?.location || '');
		SetBio(profile?.bio || '');
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
		<Block safe flex={1} color={colors.black}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={70}>
				<ModalHeader title="Edit Profile" />
				<Spacer size={25} />
				<Text size={14} color="#D53F3F" paddingLeft={10} paddingBottom={10}>
					{ErrorMessage}
				</Text>
				<Text size={14} color={colors.white60} paddingLeft={10} weight="600">
					Username
				</Text>
				<Block flex={0} vCenter style={{ position: 'relative' }}>
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
							borderBottomColor: UsernameLoading
								? colors.white40
								: (profile.username || '') === Username
								? colors.white40
								: UsernameValid
								? '#62CB4E'
								: '#FF6161',
						}}
					/>
					{(profile.username || '') != Username && UsernameLoading && (
						<ActivityIndicator color={colors.white60} style={{ position: 'absolute', right: 20, paddingBottom: 20 }} />
					)}
				</Block>
				{!!UsernameErrMsg && (
					<Text color="#FF6161" size={12} marginTop={5} marginLeft={20}>
						{UsernameErrMsg}
					</Text>
				)}

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
