import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import core from '../../core';
import { Account } from '../../core/types';
import { request } from '../../core/utils';
import { Fill, Row, Spacer, Text } from '../../parts';
import { IconButton, WideButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';

export const Auth: React.FC = () => {
	const [Email, setEmail] = useState('twanluttik@gmail.com');
	const [Password, setPassword] = useState('thebestof2021');
	const nav = useNavigation();
	const theme = useTheme();
	const inputStyle = {
		// selectionColor: theme.primary,
		backgroundColor: '#E6E5E5',
		color: theme.text,
		height: 55,
		maxHeight: 55,
		flex: 1,
		// width: '100%',
		paddingHorizontal: 20,
		borderRadius: 14,
	};

	const inputOptions: any = {
		placeholder: 'Password',
		autoCapitalize: 'none',
		autoCorrect: false,
		autoCompleteType: 'off',
	};

	const login = async () => {
		const a = await request<{ account: any; profile: any }>('post', '/auth', {
			email: 'twanluttik@gmail.com',
			password: 'thebestof2021',
		});

		core.account.state.ACCOUNT.set(a.account);
		nav.navigate('App');
	};

	const loginWithEmail = async () => {
		await request('post', '/auth/magic', {
			email: Email,
		});
	};

	const TermsAndServiceStyle: ViewStyle = { flexWrap: 'wrap', justifyContent: 'center' };

	return (
		<AuthBody>
			<Spacer size={50 * 2} />
			<LogoPlaceholder />
			<Spacer size={30 * 6} />
			<Input {...inputOptions} style={inputStyle} value={Email} onChangeText={(v) => setEmail(v)} placeholder="Email" />
			<Spacer size={10} />
			<Row>
				<Input secureTextEntry {...inputOptions} style={inputStyle} value={Password} onChangeText={(v) => setPassword(v)} placeholder="Password" />
				<Spacer size={10} />
				<IconButton onPress={() => login()} name="arrow-big" size={26} color={theme.background} style={{ backgroundColor: theme.primary, height: 55, width: 55 }} />
			</Row>
			<Spacer size={30} />
			<WideButton text="Magic Link" onPress={() => loginWithEmail()} />
			<Spacer size={10} />
			<Row style={TermsAndServiceStyle}>
				<Text center color="#9B9B9B" weight="medium">
					When signing into the app, You agree with the
				</Text>
				<Text color={theme.primary} weight="semi-bold">
					Terms & Service
				</Text>
				<Spacer size={4} />
				<Text color="#9B9B9B" weight="medium">
					and
				</Text>
				<Spacer size={4} />
				<Text color={theme.primary} weight="semi-bold">
					Privacy Policy
				</Text>
			</Row>
			<Fill />
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
