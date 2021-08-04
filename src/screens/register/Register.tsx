import { Fill, Input, Spacer, TabbarContentContainer, Text, WideButton } from '@parts';
import * as React from 'react';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { request } from '../../core/utils';

export const Register: React.FC = () => {
	const theme = useTheme();
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');

	const inputStyle = {
		backgroundColor: theme.step1,
		color: theme.text,
		height: 55,
		maxHeight: 55,
		flex: 1,
		paddingHorizontal: 20,
		borderRadius: 14,
	};

	const inputOptions: any = {
		autoCapitalize: 'none',
		placeholderTextColor: theme.step4,
		autoCorrect: false,
		autoCompleteType: 'off',
	};

	const register = async () => {
		const a = await request('post', '/account/create', { data: { email: Email, password: Password } });
		console.log(a);
	};

	return (
		<TabbarContentContainer>
			<Text center size={12} color="lightgray">
				version: beta.1
			</Text>
			<Text weight="bold" size={28}>
				Create Account
			</Text>
			<Spacer size={30 * 2} />
			<HeadingText>Email</HeadingText>
			<Input {...inputOptions} style={inputStyle} onChangeText={setEmail} />
			<Spacer size={30} />
			<HeadingText>Password</HeadingText>
			<Input {...inputOptions} style={inputStyle} onChangeText={setPassword} />
			<Spacer size={10} />
			<WideButton text="Magic Link" backgroundColor={theme.step1} textColor={theme.textFade} />
			<Fill />
			<WideButton text="Create Account" onPress={() => register()} />
			<Spacer size={30} />
		</TabbarContentContainer>
	);
};

const HeadingText = styled(Text).attrs({ size: 18, weight: 'bold' })`
	margin-bottom: 8px;
	padding-left: 18px;
	color: ${({ theme }) => theme.text};
`;
