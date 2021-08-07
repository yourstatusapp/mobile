import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled, { useTheme } from 'styled-components/native';
import core from '../../core';
import { request } from '../../core/utils';
import { Fill, Icon, Row, Spacer, Text } from '../../parts';
import { IconButton, WideButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';
import { useLinking } from '../../utils/Linking';

export const Auth: React.FC = () => {
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const nav = useNavigation();
	const theme = useTheme();
	const inputStyle = {
		backgroundColor: theme.step1,
		color: theme.text,
		height: 55,
		minHeight: 55,
		maxHeight: 55,
		flex: 1,
		paddingHorizontal: 20,
		borderRadius: 14,
	};

	const inputOptions: any = {
		placeholder: 'Password',
		autoCapitalize: 'none',
		placeholderTextColor: theme.step4,
		autoCorrect: false,
		autoCompleteType: 'off',
	};

	const login = async () => {
		const a = await request<{ account: any; profile: any }>('post', '/auth', {
			data: {
				email: Email,
				password: Password,
			},
		});

		core.account.state.ACCOUNT.set(a.account);
		core.profile.state.PROFILE.set(a.profile);
		// core.profile.collection.collect([a.profile], 'mine');
		nav.navigate('App');
	};

	const loginWithEmail = async () => {
		await request('post', '/auth/magic', {
			data: {
				email: Email,
			},
		});
	};

	const TermsAndServiceStyle: ViewStyle = { flexWrap: 'wrap', justifyContent: 'center' };

	// initial call for linking
	useLinking();

	return (
		<AuthBody>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="position" keyboardVerticalOffset={-230}>
				<Text center size={12} color="lightgray">
					version: beta.1
				</Text>
				<Spacer size={50 * 2} />
				<LogoPlaceholder />
				<Spacer size={30 * 6} />
				<Input {...inputOptions} style={inputStyle} value={Email} onChangeText={(v) => setEmail(v)} placeholder="Email" />
				<Spacer size={20} />
				<Divider />
				<Spacer size={20} />
				<WideButton text="Magic Link me" textColor={theme.text} backgroundColor={theme.step2} onPress={() => loginWithEmail()} />
				<Spacer size={10} />

				<Spacer size={10} />
				<Row style={TermsAndServiceStyle}>
					<Text center color="#9B9B9B" weight="medium" size={14}>
						When signing into the app, You agree with the
					</Text>
					<Text color={theme.primary} weight="semi-bold" size={14}>
						Terms & Service
					</Text>
					<Spacer size={4} />
					<Text color="#9B9B9B" weight="medium" size={14}>
						and
					</Text>
					<Spacer size={4} />
					<Text color={theme.primary} weight="semi-bold" size={14}>
						Privacy Policy
					</Text>
				</Row>
				<Fill />
			</KeyboardAvoidingView>
		</AuthBody>
	);
};

const AuthBody = styled.View`
	flex: 1;
	padding: 20px;
	padding-top: 50px;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
`;

const Divider = styled.View`
	width: 80%;
	height: 7px;
	border-radius: 10px;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.step1};
`;

const LogoPlaceholder = () => {
	const theme = useTheme();
	return (
		<View>
			<Row center>
				<Text size={45} weight="bold" color={theme.primary}>
					Your
				</Text>
				<Spacer size={3} />
				<Text size={45} weight="bold">
					Status
				</Text>
			</Row>
			<Row center>
				<Text size={20} weight="medium" color="#8F8F8F">
					Connect with your
				</Text>
				<Spacer size={3} />
				<Text size={20} weight="bold" color={theme.primary}>
					Friends
				</Text>
			</Row>
		</View>
	);
};
