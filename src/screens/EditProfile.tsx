import core, { request } from '@core';
import { Block, RoundyButton, RoundyInput, Spacer, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import React, { useCallback, useEffect, useState } from 'react';

import { TabbarHeader } from '../parts/components/TabbarHeader';
import { useTheme } from 'styled-components/native';
import dayjs from 'dayjs';

export const EditProfile = () => {
	const theme = useTheme();
	const profile = usePulse(core.profile.profile);
	const [validationError, setValidationError] = useState(false);
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [bio, setBio] = useState('');
	const [usrNameValid, setUsrNameValid] = useState<{ state: boolean; message: string }>({
		state: false,
		message: '',
	});

	const userNameCheck = useCallback(async (v: string) => {
		console.log('incoming parameter => ', v);

		const res = await request<{ valid: boolean }>('post', '/profile/username/check', {
			data: { username: v },
		});

		if (res.data) {
			setValidationError(res.data.valid);
			setUsrNameValid({ state: res.data.valid, message: res.message });
		}

		console.log(res);
	}, []);

	const onUsernameFinishedTyping = useCallback(() => {
		console.log('onUsernameFinishedTyping,  ' + username);
		userNameCheck(username);
	}, [username, userNameCheck]);

	useEffect(() => {
		console.log(`USERNAME STATE: ${username}`);
	}, [username]);

	const saveInformation = useCallback(async () => {
		const res = await request('patch', '/profile/', { data: {} });
		if (res.data) {
		}
	}, []);

	return (
		<Block flex={1} color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} backButton centerText="Edit Profile" />
			<Block paddingHorizontal={10} marginTop={15}>
				<Text marginBottom={8} bold paddingLeft={10}>
					Username
				</Text>
				<RoundyInput
					initialValue={profile.username}
					onTextChange={setUsername}
					autoCorrect={false}
					placeholder="Username"
					onFinishTyping={onUsernameFinishedTyping}
				/>

				<Text>valid status: {JSON.stringify(usrNameValid)}</Text>
				<Text>username: {JSON.stringify(username)}</Text>

				<Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
					Location
				</Text>

				<RoundyInput
					initialValue={profile.location}
					onTextChange={setLocation}
					autoCorrect={false}
					placeholder="Location"
				/>

				<Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
					Bio
				</Text>

				<RoundyInput
					initialValue={profile.bio}
					onTextChange={setBio}
					autoCorrect={false}
					placeholder="Bio"
					extend
				/>

				<Spacer size={40} />

				<RoundyButton text="Save" onPress={saveInformation} disabled={true} />

				{/* <Text marginBottom={8} bold paddingLeft={10} marginTop={20}>
					Birthday
				</Text>

				<RoundyInput
					initialValue={
						profile.date_of_birth ? dayjs(profile.date_of_birth).format('YYYY MM DDTHH') : ''
					}
					onTextChange={setBio}
					autoCorrect={false}
					placeholder="Bio"
					// updateValue={}
				/> */}
			</Block>
		</Block>
	);
};
