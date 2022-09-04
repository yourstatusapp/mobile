import React, { useCallback, useMemo, useState } from 'react';
import { Block, Button, Fill, GradiantShadow, Icon, IconButton, Input, Spacer, Status, Text } from '@parts';
import core, { AppAlert, request } from '@core';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { useAlert, useNavigation, useTheme } from '@hooks';
import { useSimple } from 'simple-core-state';

let timeout: NodeJS.Timeout;

export const Auth: React.FC = () => {
	const nav = useNavigation();
	const { theme, toggleTheme, isDarkMode } = useTheme();
	const { createAlert } = useAlert();
	const userData = useSimple(core.account);
	const [Email, SetEmail] = useState('');
	const [Error, SetError] = useState('');
	const [Loading, SetLoading] = useState(false);
	const [NewAccount, SetNewAccount] = useState(false);
	const [ShowBuildNumber, SetShowBuildNumber] = useState(false);
	const [Username, SetUsername] = useState('');
	const [UsernameValid, SetUsernameValid] = useState(false);
	const [UsernameErrMsg, SetUsernameErrMsg] = useState('');
	const [UsernameLoading, SetUsernameLoading] = useState(false);

	const usernameChecking = async (usernameInput: string) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(async () => {
			const res = await request<{ valid: boolean }>('post', '/profile/username/check', {
				data: { username: usernameInput },
			});
			SetUsernameLoading(false);
			if (res.data) {
				SetUsernameValid(res.data?.valid);
				if (!res.data?.valid) {
					SetUsernameErrMsg(res.message);
				}
			}
		}, 1000);
	};

	const [ClipboardData, setString] = useClipboard();

	const magicLinkLogin = React.useCallback(async () => {
		const a = ClipboardData;
		console.log('ClipboardData', a);

		if (!a) {
			AppAlert(false, 'no link has been detected');
			return;
		}

		if (a?.includes('magic?code=')) {
			nav.navigate('Magic', {
				code: a?.split('code=')[1]?.split('&')[0],
				new_account: !!a?.includes('new_account'),
			});
		}
	}, [ClipboardData, nav]);

	const usernameCheck = useCallback((v: string) => {
		SetUsernameLoading(true);
		SetUsernameValid(false);
		SetUsernameErrMsg('');
		usernameChecking(v);
	}, []);

	const [confirmationCodeSend, setConfirmationCodeSend] = useState(false);
	const [confirmationCode, setConfirmationCode] = useState('');

	const login = useCallback(async () => {
		SetLoading(true);
		SetError('');
		setConfirmationCodeSend(false);

		const res = await request<
			boolean & {
				new_account: boolean;
				suggested_username: string;
				confirmation_code_send?: boolean;
				login_from_new_account?: boolean;
			}
		>('post', '/auth/magic', {
			data: {
				email: Email?.trimStart()?.trimEnd(),
				verify_new_account: NewAccount,
				new_account_confirmation_code: confirmationCode,
				username: Username,
			},
		});

		if (res.data?.login_from_new_account) {
			console.log('LOGGING INTO ACCOUNT FROM NEW ACCOUNT CREATION');
			console.log(res.data);

			nav.reset({ index: 0, routes: [{ name: 'Tabs' }] });
			return;
		}

		if (res.data?.confirmation_code_send) {
			setConfirmationCodeSend(true);
		} else {
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
		}

		SetLoading(false);
	}, [Email, NewAccount, confirmationCode, Username, nav, usernameCheck]);

	const loginButtonDisabled = useMemo(() => {
		// Email is always needed
		if (Email === '') {
			return true;
		}

		// Check for Loading state
		if (Loading === true) {
			return true;
		}

		if (UsernameLoading === true) {
			return true;
		}

		// check if new account
		if (NewAccount) {
			if (UsernameValid === false) {
				return true;
			}

			if (confirmationCodeSend && confirmationCode === '') {
				return true;
			}
		}
	}, [Email, Loading, UsernameValid, confirmationCode, NewAccount, UsernameLoading, confirmationCodeSend]);

	return (
		<Block color={theme.background}>
			<LinearGradient
				pointerEvents="none"
				colors={[theme.primary + '30', isDarkMode ? '#00000000' : '#ffffff00']}
				style={{
					position: 'absolute',
					top: 0,
					zIndex: 52,
					width: '100%',
					height: 350,
				}}
			/>
			<KeyboardAvoidingView
				style={{ flex: 1, justifyContent: 'center' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={-(Dimensions.get('window').height / 4)}>
				<Block vCenter flex={1} paddingHorizontal={20}>
					<Status
						disableTap
						status={{
							data: { message: 'Just about out and chill 😎' },
							type: 1,
							taps: 12,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{
							right: 33,
							top: -95,
							position: 'absolute',
							transform: [{ rotate: '8deg' }],
						}}
					/>
					<Status
						disableTap
						status={{
							data: { message: 'Covid Over Party 🎉' },
							type: 3,
							taps: 12,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{
							left: 33,
							top: -160,
							position: 'absolute',
							transform: [{ rotate: '2deg' }],
						}}
					/>
					<Status
						disableTap
						status={{
							data: { message: 'YourStatus' },
							type: 2,
							taps: 42,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{
							left: 25,
							top: -55,
							position: 'absolute',
							transform: [{ rotate: '-4deg' }],
						}}
					/>
					<Block flex={0} press onPress={() => SetShowBuildNumber(!ShowBuildNumber)}>
						<Text center weight="800" size={45} color={theme.text}>
							YourStatus
						</Text>
					</Block>
					<Spacer size={20} />
					{!!Error && (
						<Text color="red" medium>
							{Error}
						</Text>
					)}
					<Spacer size={10} />
					<Input placeholder="Email" value={Email} onChange={SetEmail} textContentType={'emailAddress'} />
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
								style={{
									borderColor: UsernameValid ? '#62CB4E' : !!UsernameErrMsg ? '#FF6161' : '#292929',
									opacity: UsernameLoading ? 0.5 : 1,
								}}
							/>

							{confirmationCodeSend && (
								<Input
									placeholder="Confirmation Code"
									value={confirmationCode}
									onChange={v => {
										setConfirmationCode(v);
									}}
									textContentType={'none'}
									outerStyle={{
										marginTop: 30,
									}}
								/>
								// TODO: code error handling color border
							)}
							{UsernameLoading && (
								<ActivityIndicator color={theme.textFade} style={{ position: 'absolute', right: 20, paddingTop: 10 }} />
							)}
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
								name="plus"
								size={22}
								iconSize={14}
								color={theme.background}
								backgroundColor="#e66565"
								style={{ transform: [{ rotate: '45deg' }], marginRight: 10 }}
								onPress={() => {
									SetNewAccount(false);
									setConfirmationCodeSend(false);
									setConfirmationCode('');
								}}
							/>
						)}
						<Button
							text={NewAccount ? (confirmationCodeSend ? 'Create new account' : 'Get confirmation code') : 'Login'}
							color="white"
							onPress={login}
							disabled={loginButtonDisabled}
							style={{ flex: 1, backgroundColor: theme.primary2 }}
						/>
					</Block>
					<Block row vCenter flex={0} marginTop={13} press onPress={() => toggleTheme()}>
						<Icon name={'sparkle'} size={14} color={'#5e37ca9e'} style={{ paddingRight: 5, paddingBottom: 5 }} />
						<Text center color={theme.textFade} weight="500" size={12}>
							We make use of magic links
						</Text>
					</Block>
					{!!userData && (
						<TouchableOpacity
							style={{ alignSelf: 'center' }}
							activeOpacity={0.6}
							onPress={() => nav.reset({ index: 0, routes: [{ name: 'Tabs' }] })}>
							<Text center weight="500" size={14} color="white">
								reload
							</Text>
						</TouchableOpacity>
					)}
					<Spacer size={20} />
					{ShowBuildNumber && (
						<Button text="Paste clipboard" color={'white'} onPress={magicLinkLogin} style={{ marginBottom: 5 }} />
					)}
					{ShowBuildNumber && (
						<Text center color={theme.textFadeLight} medium>
							Build: {DeviceInfo?.getBuildNumber()}
						</Text>
					)}
				</Block>
			</KeyboardAvoidingView>
		</Block>
	);
};
