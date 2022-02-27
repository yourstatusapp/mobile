import { useTheme } from 'styled-components/native';
import React, { useState } from 'react';
import { Block, Button, Fill, Icon, IconButton, Input, Spacer, Status, Text } from '@parts';
import core, { AppAlert, request } from '@core';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePulse } from '@pulsejs/react';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import { useClipboard } from '@react-native-clipboard/clipboard';

let timeout: NodeJS.Timeout;

export const Auth: React.FC = () => {
	const nav = useNavigation();
	const { colors } = useTheme();
	const loggedin = usePulse(core.account.logged_in);
	const [Email, SetEmail] = useState('');
	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);
	const [NewAccount, SetNewAccount] = useState(false);
	const [ShowBuildNumber, SetShowBuildNumber] = useState(false);
	const [Username, SetUsername] = useState('');
	const [UsernameValid, SetUsernameValid] = useState(false);
	const [UsernameErrMsg, SetUsernameErrMsg] = useState('');
	const [UsernameLoading, SetUsernameLoading] = useState(false);

	const login = async (usernameInput: string) => {
		SetLoading(true);
		SetError('');
		const res = await request<boolean & { new_account: boolean; suggested_username: string }>('post', '/auth/magic', {
			data: {
				email: Email?.trimStart()?.trimEnd(),
				verify_new_account: NewAccount,
				username: usernameInput,
			},
		});

		if (res.data?.new_account) {
			SetNewAccount(true);
			SetUsername(res.data.suggested_username);
			usernameCheck(res.data.suggested_username);
		} else if (res.data === true) {
			SetEmail('');
			AppAlert(true, res.message);
			SetNewAccount(false);
		} else {
			SetEmail('');
			SetError(res?.message || '');
			AppAlert(false, 'Failed', res.message);
		}

		SetLoading(false);
	};

	const usernameChecking = async (usernameInput: string) => {
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

	const [ClipboardData, setString] = useClipboard();

	const magicLinkLogin = async () => {
		const a = ClipboardData;

		if (!a) {
			AppAlert(false, 'no link has been detected');
			return;
		}

		if (a?.includes('magic?code=')) {
			nav.navigate('magic' as never, { code: a?.split('code=')[1]?.split('&')[0], new_account: !!a?.includes('new_account') } as never);
		}
	};

	const usernameCheck = (v: string) => {
		SetUsernameLoading(true);
		SetUsernameValid(false);
		SetUsernameErrMsg('');
		usernameChecking(v);
	};

	return (
		<Block color="black">
			<LinearGradient pointerEvents="none" colors={['black', 'transparent']} style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 350 }} />
			<KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior="padding" keyboardVerticalOffset={-(Dimensions.get('window').height / 4)}>
				<Block flex={0} style={{ zIndex: 20 }} paddingHorizontal={20}>
					<Fill />
					<Status
						demo
						status={{ content: 'Just about out and chill 😎', type: 0, taps: 12, taped: false, id: '' }}
						style={{ right: 33, top: -100, position: 'absolute', transform: [{ rotate: '8deg' }] }}
					/>
					<Status
						demo
						status={{ content: 'Anyone wanna hangout?', type: 0, taps: 12, taped: false, id: '' }}
						style={{ left: 25, top: -60, position: 'absolute', transform: [{ rotate: '-5deg' }] }}
					/>
					<Block flex={0} press onPress={() => SetShowBuildNumber(!ShowBuildNumber)}>
						<Text center weight="800" size={45} color={colors.white}>
							YourStatus
						</Text>
					</Block>

					<Spacer size={20} />
					{!!Error && (
						<Text color="red" size={14} bold>
							{Error}
						</Text>
					)}
					<Spacer size={10} />
					<Input placeholder="Email" value={Email} onChange={SetEmail} textContentType={'email'} />

					{NewAccount && (
						<Block flex={0} vCenter style={{ position: 'relative' }} marginBottom={5} marginTop={15}>
							<Input
								placeholder="Username"
								value={Username}
								onChange={v => {
									SetUsername(v);
									usernameCheck(v);
								}}
								textContentType={'none'}
								style={{ borderColor: UsernameValid ? '#62CB4E' : !!UsernameErrMsg ? '#FF6161' : '#292929', opacity: UsernameLoading ? 0.5 : 1 }}
							/>
							{UsernameLoading && <ActivityIndicator color={colors.white60} style={{ position: 'absolute', right: 20, paddingTop: 10 }} />}
						</Block>
					)}
					{!!UsernameErrMsg && (
						<Text color="#FF6161" size={12} marginTop={5} marginLeft={20}>
							{UsernameErrMsg}
						</Text>
					)}
					<Spacer size={25} />
					<Block flex={0} row hCenter>
						{NewAccount && (
							<IconButton
								name="arrow-big"
								size={22}
								iconSize={17}
								color="black"
								backgroundColor="#e66565"
								style={{ transform: [{ rotate: '180deg' }], marginRight: 15 }}
								onPress={() => SetNewAccount(false)}
							/>
						)}
						<Button
							text={NewAccount ? 'Create new account' : 'Login'}
							onPress={() => login(Username)}
							disabled={NewAccount ? UsernameValid === false || Email === '' : Email === '' || Loading}
							style={{ flex: 1 }}
						/>
					</Block>

					<Block row vCenter flex={0} marginTop={13} press>
						<Icon name={'sparkle'} size={14} color={'#5e37ca9e'} style={{ paddingRight: 5, paddingBottom: 5 }} />
						<Text center color={colors.white60} weight="500" size={12}>
							We make use of magic links
						</Text>
					</Block>
					{/* <Spacer size={20} /> */}

					{loggedin && (
						<TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.6} onPress={() => nav.navigate('tabs' as never)}>
							<Text center weight="500" size={14} color="white">
								reload
							</Text>
						</TouchableOpacity>
					)}
					<Spacer size={20} />
					{ShowBuildNumber && <Button text="magic link pase" onPress={magicLinkLogin} />}
					{ShowBuildNumber && (
						<Text center color={colors.white40} weight="600">
							Build: {DeviceInfo?.getBuildNumber()}
						</Text>
					)}
				</Block>
			</KeyboardAvoidingView>
		</Block>
	);
};
