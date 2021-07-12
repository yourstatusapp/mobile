import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import core from '../../core';
import { request } from '../../core/utils';
import { Fill, Row, Spacer, Text } from '../../parts';
import { IconButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';

export const Auth: React.FC = () => {
	const [Email, setEmail] = useState('admin@twanluttik.com');
	const [Password, setPassword] = useState('thebestof2021');
	const nav = useNavigation();

	const theme = useTheme();
	const inputStyle = {
		placeholder: 'password',
		placeholderTextColor: '#6B6B6B',
		selectionColor: theme.primary,
		backgroundColor: theme.navBar,
		color: theme.text,
		flex: 1,
	};

	const inputOptions: any = {
		autoCapitalize: 'none',
		autoCorrect: false,
		autoCompleteType: 'off',
	};

	const Login = async () => {
		const a = await request('post', 'auth', {
			email: 'admin@twanluttik.com',
			password: 'thebestof2021',
		});
		// @ts-ignore
		core.account.state.ACCOUNT.set(a.data.account);
		// nav.navigate('messages');
	};

	return (
		<AuthBody>
			<Spacer size={50 * 2} />
			<LogoPlaceholder />
			<Spacer size={50 * 6} />
			<Input {...inputOptions} style={inputStyle} value={Email} onChangeText={(v) => setEmail(v)} placeholder="Email" />
			<Spacer size={10} />
			<Row>
				<Input {...inputOptions} style={inputStyle} value={Password} onChangeText={(v) => setPassword(v)} placeholder="Password" />
				<Spacer size={10} />
				<IconButton onPress={() => Login()} name="arrow-big" size={58} color={theme.background} style={{ backgroundColor: theme.primary }} />
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
			<Row>
				<Text style={{ color: theme.primary }}>Your</Text>
				<Text>Status</Text>
			</Row>
			<Row>
				<Text>Connect with your</Text>
				<Text style={{ color: theme.primary }}>Friends</Text>
			</Row>
		</View>
	);
};
