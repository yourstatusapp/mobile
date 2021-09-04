import core, { request } from '@core';
import { Fill, IconButton, RegularInput, Row, SidePadding, Spacer, Text, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Linking } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface NewuserProps {}

let timeoutID: any;

export const NewuserView: React.FC<NewuserProps> = (props) => {
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

					<Spacer size={15} />
					<FloatingBox>
						<Text color="#FF6767" weight="bold" size={14}>
							This is not a final version of the app, parts of the app will change over time and optimized over time.
						</Text>
						<Spacer size={10} />
						<Text color="black">For future updates follow @yourstatusapp on Twitter</Text>
						<Spacer size={30} />
						<Row>
							<IconButton name="twitter" color="#64bdf1" backgroundColor={theme.background} size={45} onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')} />
							<Spacer size={10} />
							<IconButton name="discord" color="#404FED" size={45} backgroundColor={theme.background} onPress={() => Linking.openURL('https://discord.gg/wCFdkbAdPA')} />
						</Row>
					</FloatingBox>

					<Fill />
					<WideButton text="Updates and continue" disabled={!Username} onPress={() => saveInformation()} />
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

const FloatingBox = styled.View`
	/* background-color: ${({ theme }) => theme.step0}; */
	padding: 15px;
	border-radius: 15px;
	border: solid 1px #ffa4a4;
	background-color: #ffe6e6;
`;
