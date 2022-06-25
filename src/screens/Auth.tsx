import { useTheme } from 'styled-components/native';
import React, { useCallback, useState } from 'react';
import { Block, Button, Fill, Icon, IconButton, Input, Spacer, Status, Text } from '@parts';
import core, { AppAlert, request } from '@core';
import {
	ActivityIndicator,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from 'react-native';
import { usePulse } from '@pulsejs/react';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import { useClipboard } from '@react-native-clipboard/clipboard';
import { useNavigation } from '@hooks';

let timeout: NodeJS.Timeout;

export const Auth: React.FC = () => {
	const nav = useNavigation();
	const theme = useTheme();
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

	const login = useCallback(
		async (usernameInput: string) => {
			SetLoading(true);
			SetError('');
			const res = await request<boolean & { new_account: boolean; suggested_username: string }>(
				'post',
				'/auth/magic',
				{
					data: {
						email: Email?.trimStart()?.trimEnd(),
						verify_new_account: NewAccount,
						username: usernameInput,
					},
				},
			);

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
		},
		[Email, NewAccount],
	);

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
		console.log(a);

		if (!a) {
			AppAlert(false, 'no link has been detected');
			return;
		}

		if (a?.includes('magic?code=')) {
			nav.navigate(
				'magic' as never,
				{
					code: a?.split('code=')[1]?.split('&')[0],
					new_account: !!a?.includes('new_account'),
				} as never,
			);
		}
	}, [ClipboardData, nav]);

	const usernameCheck = useCallback((v: string) => {
		SetUsernameLoading(true);
		SetUsernameValid(false);
		SetUsernameErrMsg('');
		usernameChecking(v);
	}, []);

	const theme_name = usePulse(core.ui.current_theme);
	const isDarkMode = usePulse(core.ui.isDarkMode);

	const toggleTheme = () => {
		core.ui.current_theme.set(theme_name === 'light' ? 'dark' : 'light');
	};

	return (
		<Block color={theme.background}>
			<LinearGradient
				pointerEvents="none"
				colors={[theme.primary + '30', isDarkMode ? '#00000000' : '#ffffff00']}
				style={{ position: 'absolute', top: 0, zIndex: 52, width: '100%', height: 350 }}
			/>
			<KeyboardAvoidingView
				style={{ flex: 1, justifyContent: 'center' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={-(Dimensions.get('window').height / 4)}>
				<Block flex={0} style={{ zIndex: 220, position: 'absolute' }} paddingHorizontal={20}>
					<Fill />
					<Status
						disableTap
						status={{
							data: { message: 'Just about out and chill 😎' },
							type: 0,
							taps: 12,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{ right: 33, top: -95, position: 'absolute', transform: [{ rotate: '8deg' }] }}
					/>
					<Status
						disableTap
						status={{
							data: { message: 'Covid Over Party 🎉' },
							type: 2,
							taps: 12,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{ left: 33, top: -160, position: 'absolute', transform: [{ rotate: '2deg' }] }}
					/>
					<Status
						disableTap
						status={{
							data: { message: 'YourStatus' },
							type: 1,
							taps: 42,
							taped: false,
							id: '',
							account_id: '',
						}}
						style={{ left: 25, top: -55, position: 'absolute', transform: [{ rotate: '-4deg' }] }}
					/>
					<Block flex={0} press onPress={() => SetShowBuildNumber(!ShowBuildNumber)}>
						<Text center weight="800" size={45} color={theme.text}>
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
						<Block
							flex={0}
							vCenter
							style={{ position: 'relative' }}
							marginBottom={5}
							marginTop={15}>
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
							{UsernameLoading && (
								<ActivityIndicator
									color={theme.textFade}
									style={{ position: 'absolute', right: 20, paddingTop: 10 }}
								/>
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
								onPress={() => SetNewAccount(false)}
							/>
						)}
						<Button
							text={NewAccount ? 'Create new account' : 'Login'}
							color="white"
							onPress={() => login(Username)}
							disabled={
								NewAccount ? UsernameValid === false || Email === '' : Email === '' || Loading
							}
							style={{ flex: 1, backgroundColor: theme.primary2 }}
						/>
					</Block>

					<Block row vCenter flex={0} marginTop={13} press onPress={toggleTheme}>
						<Icon
							name={'sparkle'}
							size={14}
							color={'#5e37ca9e'}
							style={{ paddingRight: 5, paddingBottom: 5 }}
						/>
						<Text center color={theme.textFade} weight="500" size={12}>
							We make use of magic links
						</Text>
					</Block>
					{/* <Spacer size={20} /> */}

					{loggedin && (
						<TouchableOpacity
							style={{ alignSelf: 'center' }}
							activeOpacity={0.6}
							onPress={() => nav.navigate('tabs' as never)}>
							<Text center weight="500" size={14} color="white">
								reload
							</Text>
						</TouchableOpacity>
					)}

					<Spacer size={20} />
					{ShowBuildNumber && (
						<Button text="Paste clipboard" onPress={magicLinkLogin} style={{ marginBottom: 5 }} />
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
