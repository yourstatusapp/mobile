import core, { request } from '@core';
import { Fill, RegularInput, Row, SidePadding, Spacer, Text, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface NewuserProps {}

let timeoutID: any;

export const Newuser: React.FC<NewuserProps> = (props) => {
	const nav = useNavigation();
	const theme = useTheme();
	const profile = usePulse(core.profile.state.PROFILE);
	const [Username, setUsername] = useState('');
	const [Available, setAvailable] = useState(false);
	const [Loaded, setLoaded] = useState(false);
	const [Location, setLocation] = useState('');

	const usernameCheck = async (username: string) => {
		if (username === '') {
			setLoaded(true);
			setAvailable(false);
			return;
		}

		const a = await request<boolean>('post', '/profile/username/check', { data: { username } });
		setLoaded(true);
		setAvailable(a);
	};

	const saveInformation = async () => {
		const a = await request('patch', '/profile', { data: { username: Username } });
		core.profile.state.PROFILE.patch({ username: Username });
		nav.goBack();
	};

	React.useEffect(() => {
		setLoaded(false);
		clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			usernameCheck(Username);
		}, 500);
	}, [Username]);

	return (
		<NewuserBody>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={40}>
				<SidePadding>
					<Spacer size={20} />
					<Text size={28} weight="bold" color={theme.primary}>
						Welcome to YourStatus
					</Text>
					<Spacer size={10} />
					<Text color={theme.textFade} weight="semi-bold">
						Thank you for using the beta version of this app
					</Text>

					<Spacer size={80} />
					<Text size={20} weight="semi-bold" style={{ paddingLeft: 8 }}>
						Username
					</Text>
					<Spacer size={10} />
					<InputCont>
						<UsernameField
							defaultValue={profile.username}
							onChangeText={setUsername}
							usernameValue={Username}
							loaded={Loaded}
							error={!Available}
							autoCompleteType="off"
							autoCorrect={false}
							autoCapitalize="none"
						/>
						{!Loaded && <ActivityIndicator style={{ position: 'absolute', right: 20 }} />}
					</InputCont>

					<Fill />
					<WideButton text="Save" onPress={() => saveInformation()} />
					<Spacer size={30} />
				</SidePadding>
			</KeyboardAvoidingView>
		</NewuserBody>
	);
};

const NewuserBody = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.background};
`;

const InputCont = styled(Row)`
	position: relative;
`;

const UsernameField = styled(RegularInput)<{ error: boolean; loaded: boolean; usernameValue: string }>`
	border: solid 2px ${({ theme, error, loaded, usernameValue }) => (usernameValue ? (loaded ? (error ? '#FF4141' : '#8acd68') : theme.step1) : theme.step1)};
`;
