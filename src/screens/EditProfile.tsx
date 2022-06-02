import core, { AppAlert, request } from '@core';
import {
	Block,
	BottomModalSheet,
	Button,
	Fill,
	IconButton,
	ModalHeader,
	Spacer,
	Text,
} from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { TabbarHeader } from '../parts/components/TabbarHeader';
import styled, { useTheme } from 'styled-components/native';
import { EditUsername } from './parts/EditUsername';

let timeout: NodeJS.Timeout;

export const EditProfile = () => {
	const nav = useNavigation();
	const theme = useTheme();
	const profile = usePulse(core.profile.profile);

	const [objectmodified, setObjectmodified] = useState({
		username: {
			changed: false,
			newValue: '',
		},
		location: {
			changed: false,
			newValue: '',
		},
		bio: {
			changed: false,
			newValue: '',
		},
	});

	// USERNAME LOGIC
	// const [username, setUsername] = useState('');
	const [usernameLoading, setUsernameLoading] = useState(false);
	const [usernameValid, setUsernameValid] = useState(false);
	const [usernameErrMsg, setUsernameErrMsg] = useState('');

	// const CheckUsernameAvailibty = React.useCallback(
	// 	(usernameInput: string) => {
	// 		// check if the object has been modified
	// 		if (objectmodified.username.changed === false) return;

	// 		setUsernameValid(false);
	// 		setUsernameErrMsg('');
	// 		setUsernameLoading(true);

	// 		if (timeout) clearTimeout(timeout);

	// 		timeout = setTimeout(async () => {
	// 			// check for the same username
	// 			if (objectmodified.username.newValue.toLowerCase() === profile.username.toLowerCase()) {
	// 				setUsernameErrMsg('');

	// 				setObjectmodified(prevState => {
	// 					let a = Object.assign({}, prevState);
	// 					a.username.changed = false;
	// 					return a;
	// 				});
	// 				return;
	// 			}

	// 			const res = await request<{ valid: boolean }>('post', '/profile/username/check', {
	// 				data: { username: usernameInput },
	// 			});
	// 			setUsernameLoading(false);
	// 			if (res.data) {
	// 				setUsernameValid(res.data?.valid);
	// 				if (!res.data?.valid) setUsernameErrMsg(res.message);
	// 			}
	// 		}, 1000);
	// 	},
	// 	[objectmodified.username, profile.username],
	// );

	useEffect(() => {}, []);

	return (
		<Block flex={1} color={theme.background}>
			<TabbarHeader color={theme.backgroundDark} backButton />

			<Text marginTop={10}>EDIT PROFILE</Text>
		</Block>
	);
};
