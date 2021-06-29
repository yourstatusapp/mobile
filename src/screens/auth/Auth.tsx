import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import styled, { useTheme } from 'styled-components/native';
import core from '../../core';
import { request } from '../../core/utils';
import { Fill, Row, Spacer, Text } from '../../parts';
import { IconButton } from '../../parts/Buttons';
import { Input } from '../../parts/Input';

export const Auth: React.FC = () => {
	const theme = useTheme();
	const inputStyle = {
		placeholder: 'password',
		placeholderTextColor: '#6B6B6B',
		selectionColor: '#C74242',
	};

	const Login = async () => {
		const a = await request('post', 'auth', {
			email: 'admin@twanluttik.com',
			password: 'thebestof2021',
		}); // @ts-ignore
		console.log(a.data);
		// @ts-ignore
		core.account.state.ACCOUNT.set(a.data);

		// await axios({
		// 	method: 'post',
		// 	data: {
		// 		email: 'admin@twanluttik.com',
		// 		password: 'thebestof2021',
		// 	},
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	url: 'http://localhost:8080/auth',
		// })
		// 	.then((v) => {
		// 		// @ts-ignore
		// 		core.account.state.ACCOUNT.set(v.data.data);
		// 	})
		// 	.catch((v) => console.log(v));

		// console.log(a);
	};
	//

	return (
		<AuthBody>
			<Spacer size={50 * 2} />
			<Text center size={24}>
				LOGO_PLACEHOLDER
			</Text>
			<Spacer size={50 * 6} />
			<Input {...inputStyle} placeholder="Email" />
			<Spacer size={10} />
			<Row>
				<Input {...inputStyle} placeholder="Password" shrink />
				<Spacer size={10} />
				<IconButton onPress={() => Login()} name="arrow-big" size={58} color={theme.background} style={{ backgroundColor: theme.primary }} />
			</Row>
			<Fill />
		</AuthBody>
	);
};

const AuthBody = styled.View`
	flex: 1;
	color: white;
	padding: 20px;
	padding-top: 50px;
	background-color: #0d0d0d;
`;
