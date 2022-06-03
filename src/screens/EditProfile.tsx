import core, { request } from '@core';
import { Block, RoundyInput, Text } from '@parts';
import { usePulse } from '@pulsejs/react';
import React, { useCallback, useState } from 'react';

import { TabbarHeader } from '../parts/components/TabbarHeader';
import { useTheme } from 'styled-components/native';

export const EditProfile = () => {
	const theme = useTheme();
	const profile = usePulse(core.profile.profile);

	const [usrNameValid, setUsrNameValid] = useState<{ state: boolean; message: string }>({
		state: false,
		message: '',
	});
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [bio, setBio] = useState('');

	const userNameCheck = useCallback(async (v: string) => {
		console.log('new Username', v);

		const res = await request<{ valid: boolean }>('post', '/profile/username/check', {
			data: { username: v },
		});

		if (res.data) {
			setUsrNameValid({ state: res.data.valid, message: res.message });
		}
		console.log(res);
	}, []);

	const onUsernameFinishedTyping = useCallback(
		(text: string) => {
			userNameCheck(text);
		},
		[userNameCheck],
	);

	return (
		<Block flex={1} color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} backButton />
			<Block paddingHorizontal={10} marginTop={15}>
				<Text marginBottom={8} bold paddingLeft={10}>
					Username
				</Text>
				<RoundyInput
					initialValue={profile.username}
					onTextChange={setUsername}
					autoCorrect={false}
					placeholder="Username"
					onFinishTyping={v => {
						console.log('xxx -> ', v);
						onUsernameFinishedTyping(v);
					}}
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
			</Block>
		</Block>
	);
};
