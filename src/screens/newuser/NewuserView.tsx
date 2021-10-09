import core, { request } from '@core';
import { Fill, IconButton, RegularInput, Row, SidePadding, Spacer, Text, WideButton } from '@parts';
import { usePulse } from '@pulsejs/react';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Linking, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
		<KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} behavior="height" keyboardVerticalOffset={50}>
			<TouchableWithoutFeedback style={{ flex: 1 }} containerStyle={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<SidePadding>
					<Spacer size={20} />
					<Text size={28} weight="bold" color={theme.primary}>
						Welcome to YourStatus
					</Text>
					<Spacer size={5} />
					<Text color={theme.textFade} size={14}>
						Thank you for using the beta version of this app
					</Text>

					<Spacer size={15} />
					<FloatingBox>
						<Text color="#FF6767" weight="semi-bold" size={16}>
							This app is still in beta
						</Text>
						<Spacer size={10} />
						<Text size={14} weight="semi-bold" color={theme.textFade}>
							For future updates follow @yourstatusapp on Twitter
						</Text>
						<Spacer size={30} />
						<Row>
							<IconButton name="twitter" color="#64bdf1" backgroundColor={theme.step2} size={25} onPress={() => Linking.openURL('https://twitter.com/yourstatusapp')} />
							<Spacer size={10} />
							<IconButton name="discord" color="#404FED" size={25} backgroundColor={theme.step2} onPress={() => Linking.openURL('https://discord.gg/wCFdkbAdPA')} />
						</Row>
					</FloatingBox>

					<Spacer size={40} />

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

					{/* <Spacer size={10} /> */}
					<Fill />
					<WideButton text="Updates and continue" disabled={!Username} onPress={() => saveInformation()} />
					<Spacer size={25} />
				</SidePadding>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
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
	border: solid 2px #ffa4a4;
	/* background-color: #ffe6e6; */
	background-color: ${({ theme }) => theme.step0};
`;
